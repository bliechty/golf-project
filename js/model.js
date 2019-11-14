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
        if (holeNum <= numberOfHoles / 2) {
            this.outScores[holeNum] = Number(score);
            $(`#outscore${playerNum + 1}`).html(this.getScores('out'));
        } else {
            this.inScores[holeNum] = Number(score);
            $(`#inscore${playerNum + 1}`).html(this.getScores('in'));
        }

        this.totalScores[holeNum] = Number(score);
        $(`#totalscore${playerNum + 1}`).html(this.getScores('total'));
    }
}