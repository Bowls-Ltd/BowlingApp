import {PlayerTurn} from "./PlayerTurn"

class Player {
    private turns: Array<PlayerTurn>;
    private name: string;
    private currentTurn : PlayerTurn;

    public constructor(name: string) {
        this.name = name;
        this.turns = Array<PlayerTurn>();
        this.currentTurn = null;
    }

    public makeTry(nb : number) {
        if (this.turns.length == 10) {
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
        this.currentTurn = new PlayerTurn(this.turns.length == 9);
    }


    public playTurn(): void {
        if (this.turns.length == 10) {
            throw new Error("cannot play more than 10 turns");
        }

        let turn = new PlayerTurn(this.turns.length == 9);
        let randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

        while (!turn.isOver()) {
            turn.addPins(randInt(1, turn['remainingPins'])); // TODO: add getter for PlayerTurn.remainingPins ?
        }

        this.turns.push(turn);
    }

    public getTurns(): Array<PlayerTurn> {
        return this.turns;
    }

    public computeAccumulatedScores(): Array<number> {
        let getShot = (turnIdx, shotIdx) => this.turns[turnIdx].getShots().at(shotIdx);
        let cumulatedScore = 0;

        return this.turns.map((turn, i) => {
            let score = turn.pinsSum();

            if (turn.isStrike()) {
                let [nextTurnIdx, nextShotIdx] = this.getNextShotIdx(i, 0);
                if (nextShotIdx != -1) { // next shot available
                    score += getShot(nextTurnIdx, nextShotIdx);

                    [nextTurnIdx, nextShotIdx] = this.getNextShotIdx(nextTurnIdx, nextShotIdx);
                    if (nextShotIdx != -1) { // next, next shot available
                        score += getShot(nextTurnIdx, nextShotIdx);
                    }
                }
            }

            if (this.turns[i].isSpare()) {
                let [nextTurnIdx, nextShotIdx] = this.getNextShotIdx(i, 1);
                if (nextShotIdx != -1) { // next shot available
                    score += getShot(nextTurnIdx, nextShotIdx);
                }
            }

            return cumulatedScore += score;
        });
    }

    private getNextShotIdx(turnIdx: number, shotIdx: number): Array<number> {
        if (shotIdx + 1 < this.turns[turnIdx].getShots().length) {
            return [turnIdx, shotIdx + 1];
        } else {
            if (turnIdx + 1 < this.turns.length && this.turns[turnIdx + 1].getShots().length > 0) {
                return [turnIdx + 1, 0];
            } else {
                return [-1, -1]; // out of range
            }
        }
    }
}

export {
    Player
}
