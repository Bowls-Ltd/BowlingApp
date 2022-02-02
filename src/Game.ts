import {Player} from "./Player"
class Game {
    private Players : Array<Player>;
    private currentPlayerIdx : number;


    public constructor(size : number) {
        this.Players = new Array(size);

        this.currentPlayerIdx = 0;
    }

    public startPlaying() {
        this.Players[0].play();
    }


    public nextPlayer() {
        this.currentPlayerIdx = this.currentPlayerIdx + 1;
        if (this.currentPlayerIdx >= this.Players.length)
            this.currentPlayerIdx = 0;
        this.Players[this.currentPlayerIdx].play();
    }
}


export { Game }
