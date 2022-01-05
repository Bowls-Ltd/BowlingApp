import {PlayerTurn} from "./PlayerTurn"

class Player {
    private turns: Array<PlayerTurn>;
    private name: string;
    private score: Array<number>;

    constructor(name: string) {
        this.name = name;
    }

    public playTurn(): void {
        throw new Error("Not implemented...");
    }

    public computeAccumulatedScores(): Array<number> {
        for (let i = 0; i < this.turns.length; i++) {
            this.computeScore(i);
        }
        return this.score;
    }

    private computeScore(i: number) {
        this.score[i] = this.turns[i].skittlesSum();

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
            if (turnIdx + 1 < this.turns.length) {
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
