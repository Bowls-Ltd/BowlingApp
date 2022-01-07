import {PlayerTurn} from "./PlayerTurn"

class Player {
    private turns: Array<PlayerTurn>;
    private name: string;
    private score: Array<number>;

    public constructor(name: string) {
        this.name = name;
        this.turns = Array<PlayerTurn>();
        this.score = Array<number>();
    }

    public playTurn(): void {
        throw new Error("Not implemented...");
    }

    public getTurns(): Array<PlayerTurn> {
        return this.turns;
    }

    public computeAccumulatedScores(): Array<number> {
        this.score = Array<number>(this.turns.length);
        for (let i = 0; i < this.turns.length; i++) {
            this.computeScore(i);
        }
        return this.score;
    }

    private computeScore(i: number) {
        this.score[i] = this.turns[i].pinsSum();
        if (i > 0) {
            this.score[i] += this.score[i - 1];
        }

        if (this.turns[i].isStrike()) {
            let [nextTurnIdx, nextShotIdx] = this.getNextShotIdx(i, 0);
            if (nextShotIdx != -1) { // next shot available
                this.score[i] += this.turns[nextTurnIdx].getShots()[nextShotIdx];

                [nextTurnIdx, nextShotIdx] = this.getNextShotIdx(nextTurnIdx, nextShotIdx);
                if (nextShotIdx != -1) { // next, next shot available
                    this.score[i] += this.turns[nextTurnIdx].getShots()[nextShotIdx];
                }
            }
        }

        if (this.turns[i].isSpare()) {
            let [nextTurnIdx, nextShotIdx] = this.getNextShotIdx(i, 1);
            if (nextShotIdx != -1) { // next shot available
                this.score[i] += this.turns[nextTurnIdx].getShots()[nextShotIdx];
            }
        }
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
