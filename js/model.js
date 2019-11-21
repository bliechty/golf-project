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

    isFinished(numberOfHoles, playerNum) {
        let check = true;
        for (let i = 0; i < numberOfHoles; i++) {
            if (this.totalScores[0] === undefined) {
                check = false;
                break;
            }
        }
        if (this.totalScores.length === numberOfHoles && check) {
            let par = Number($('#parTotal').html());
            let totalScore = this.getScores('total');
            if (par === totalScore) {
                $('.player-total-score').css('display', 'block');
                $('.player-total-score').html(`${this.name}'s score is on par`);
            } else if (totalScore > par) {
                $('.player-total-score').css('display', 'block');
                $('.player-total-score').html(`${this.name}'s score is ${totalScore - par} more than par`);
            } else {
                $('.player-total-score').css('display', 'block');
                $('.player-total-score').html(`${this.name}'s score is ${par - totalScore} less than par`);
            }
        }
    }
}