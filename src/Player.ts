import {PlayerTurn} from "./PlayerTurn"

class Player {
    private turns: Array<PlayerTurn>;
    private name: string;
    private currentTurn : PlayerTurn;
    private nbPins : number;

    public constructor(name: string, nbPins : number) {
        this.name = name;
        this.nbPins = nbPins;
        this.turns = Array<PlayerTurn>();
        this.currentTurn = null;
    }

    public getMaxPins() : number {
        return this.nbPins;
    }


    public getName() : string {
        return this.name;
    }

    public makeTry(nb : number) {
        if (this.turns.length === 10) {
            throw new Error("cannot play more than 10 turns");
        }
        if (this.currentTurn === null) {
            throw new Error("ERROR");
        }
        
        this.currentTurn.addPins(nb);

        if (this.currentTurn.isOver()) {
            this.turns.push(this.currentTurn);
            this.currentTurn = null;
        }
    }

    public isPlaying() : boolean {
        return !(this.currentTurn === null);
    }

    public play() {
        this.currentTurn = new PlayerTurn(this.turns.length === 9, this.nbPins);
    }

    public getTurns(): Array<PlayerTurn> {
        if(this.currentTurn === null)
            return this.turns;
        else
        {
            let copy : Array<PlayerTurn> = [...this.turns]
            copy.push(this.currentTurn)
            return copy;
        }
    }

    public hasEnded() : boolean {
        return (this.turns.length === 10 && this.turns[9].isOver())
    }

    public getRemainingPins() : number {
        if (this.currentTurn === null) 
            return this.nbPins;
        else
            return this.currentTurn.getRemainingPins();
    }

    public computeAccumulatedScores(): Array<number> {
        let getShot = (turnIdx, shotIdx) => this.turns[turnIdx].getShots().at(shotIdx);
        let cumulatedScore = 0;
        let nextIndexes: Array<number> | null;
        let nextTurnIdx: number, nextShotIdx: number;

        return this.turns.map((turn, i) => {
            let score = turn.pinsSum();

            if (i < 9) {
                if (turn.isStrike()) {
                    nextIndexes = this.getNextShotIdx(i, 0); // can be null
                    if (nextIndexes !== null) { // next shot available
                        [nextTurnIdx, nextShotIdx] = nextIndexes; // destructuring only if not null
                        score += getShot(nextTurnIdx, nextShotIdx);

                        nextIndexes = this.getNextShotIdx(nextTurnIdx, nextShotIdx); // can be null
                        if (nextIndexes !== null) { // next, next shot available
                            [nextTurnIdx, nextShotIdx] = nextIndexes; // destructuring only if not null
                            score += getShot(nextTurnIdx, nextShotIdx);
                        }
                    }
                }

                if (this.turns[i].isSpare()) {
                    nextIndexes = this.getNextShotIdx(i, 1); // can be null
                    if (nextIndexes !== null) { // next shot available
                        [nextTurnIdx, nextShotIdx] = nextIndexes; // destructuring only if not null
                        score += getShot(nextTurnIdx, nextShotIdx);
                    }
                }
            }

            return cumulatedScore += score;
        });
    }

    private getNextShotIdx(turnIdx: number, shotIdx: number): Array<number> | null {
        if (shotIdx + 1 < this.turns[turnIdx].getShots().length) {
            return [turnIdx, shotIdx + 1];
        } else {
            if (turnIdx + 1 < this.turns.length && this.turns[turnIdx + 1].getShots().length > 0) {
                return [turnIdx + 1, 0];
            } else {
                return null; // out of range
            }
        }
    }
}

export {
    Player
}
