import { Score } from "./Score"

class Player {
    private _name: String;
    private _score: Score;

    constructor(name: String) {
        this.setName(name);
        this._score = new Score()
    }

    public getName(): String {
        return this._name;
    }
    public setName(value: String) {
        this._name = value;
    }
    
    public scorePoints(scoredPoints: number) {
        for (let i = 0; i < scoredPoints ; i++)
            this._score.incrementScore();
    }
    public getScoreValue(): number {
        return this._score.getScore();
    }
}

export {
    Player
}