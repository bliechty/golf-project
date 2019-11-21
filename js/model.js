class PlayerCollection {
    constructor() {
        this.collection = [];
    }

    add(name) {
        this.collection.push(new Player(name));
    }

    duplicate(name) {
        return this.collection.some(player => player.name === name);
    }
}

class Player {
    constructor(name) {
        this.name = name;
        this.display = false;
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
            if (this.totalScores[i] === undefined) {
                check = false;
                break;
            }
        }
        if (this.totalScores.length === numberOfHoles && check) {
            let par = Number($('#parTotal').html());
            let totalScore = this.getScores('total');
            if (this.display === false) {
                if (par === totalScore) {
                    $('.player-total-score-container').append(`<div id='player${playerNum}total' class='player-total-score'>
                            ${this.name}'s score is on par
                        </div>`);
                } else if (totalScore > par) {
                    $('.player-total-score-container').append(`<div id='player${playerNum}total' class='player-total-score'>
                            ${this.name}'s score is ${totalScore - par} more than par
                        </div>`);
                } else {
                    $('.player-total-score-container').append(`<div id='player${playerNum}total' class='player-total-score'>
                            ${this.name}'s score is ${par - totalScore} less than par
                        </div>`);
                }
                this.display = true;
            } else {
                if (par === totalScore) {
                    $(`#player${playerNum}total`).html(`${this.name}'s score is on par`);
                } else if (totalScore > par) {
                    $(`#player${playerNum}total`).html(`${this.name}'s score is ${totalScore - par} more than par`);
                } else {
                    $(`#player${playerNum}total`).html(`${this.name}'s score is ${par - totalScore} less than par`);
                }
            }
        }
    }
}