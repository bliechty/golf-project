class PlayerCollection {
    constructor() {
        this.collection = [];
    }

    add(name) {
        this.collection.push(new Player(name));
    }

    changeName(name, index) {
        this.collection[index].name = name;
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
}