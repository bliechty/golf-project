class PlayerScores {
    constructor() {
        this.inScores = [];
        this.outScores = [];
        this.totalScores = [];
    }

    getScores (name) {
        if (name === 'in') {
            return this.inScores.reduce((previous, current) => previous + current);
        } else if (name === 'out') {
            return this.outScores.reduce((previous, current) => previous + current);
        } else if (name === 'total') {
            return this.totalScores.reduce((previous, current) => previous + current);
        }
    }
}