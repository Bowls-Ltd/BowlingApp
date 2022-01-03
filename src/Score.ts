class Score {
    private score: number;
    constructor() {
        this.score = 0;
    }
    public incrementScore() {
        this.score++;
    }
    public getScore() {
        return this.score;
    }
}

export {
    Score
}