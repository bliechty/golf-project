class PlayerCollection {
    constructor() {
        this.collection = [];
    }

    add(name) {
        this.collection.push(new Player(name));
    }
}

class Player {
    constructor(name) {
        this.name = name;
        this.inScores = [];
        this.outScores = [];
        this.totalScores = [];
    }

    getScores (type) {
        if (type === 'in') {
            return this.inScores.reduce((previous, current) => previous + current);
        } else if (type === 'out') {
            return this.outScores.reduce((previous, current) => previous + current);
        } else if (type === 'total') {
            return this.totalScores.reduce((previous, current) => previous + current);
        }
    }

    updateScores (playerNum, holeNum, score, numberOfHoles) {
        if (holeNum + 1 <= numberOfHoles / 2) {
            this.outScores[holeNum] = score;
            $(`#outscore${playerNum}`).html(this.getScores('out'));
        } else {
            this.inScores[holeNum] = score;
            $(`#inscore${playerNum}`).html(this.getScores('in'));
        }

        this.totalScores[holeNum] = score;
        $(`#totalscore${playerNum}`).html(this.getScores('total'));
    }
}