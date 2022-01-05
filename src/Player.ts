import { PlayerTurn } from "./PlayerTurn"

class Player {
    private turns : Array<PlayerTurn>;
    private name : string;
    constructor(name : string) { this.name = name; }
    public playTurn() : void {}
    public computeAccumulatedScores() : Array<number> { return null; }
    public getTurns() : Array<PlayerTurn> { return this.turns; }
}

export {
    Player
}