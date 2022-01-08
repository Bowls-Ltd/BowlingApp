import {Player} from "./Player"
import {PlayerView} from "./PlayerView"

class Game {
    private Players : Array<Player>;
    private PlayersView: Array<PlayerView>;
    private currentPlayerIdx : number;


    public constructor(size : number) {
        this.Players = new Array(size);
        this.PlayersView = new Array(size);
        //TODO dynamicaly generating the DOM

        for (let i = 0; i < size; i++) {
            let UITurn : HTMLElement = document.getElementById("player_" + (i+1) + "_turn");
            let UIScore : HTMLElement = document.getElementById("player_" + (i+1) + "_score");
            this.Players[i] = new Player("Player " + (i+1));
            this.PlayersView[i] = new PlayerView(UITurn, UIScore);
        }

        this.currentPlayerIdx = 0;

        let button : HTMLElement = document.getElementById("submit_button");
        let input : HTMLInputElement = <HTMLInputElement>document.getElementById("input_text");

        button.addEventListener("click", (event) => {
            let currentPlayer = this.Players[this.currentPlayerIdx];
            let currentPlayerView = this.PlayersView[this.currentPlayerIdx];
            
            if (currentPlayer.isPlaying()) {
                try {
                    currentPlayer.makeTry(this.readScore(input.value));

                    input.value = "";

                    currentPlayerView.update(currentPlayer.getTurns(), currentPlayer.computeAccumulatedScores());
                    if (!currentPlayer.isPlaying())
                        this.nextPlayer();
                }
                catch(error) {
                    console.error(error);
                }
            }
        });

    }

    public startPlaying() {
        this.Players[0].play();
    }


    public nextPlayer() {
        this.currentPlayerIdx = this.currentPlayerIdx + 1;
        if (this.currentPlayerIdx >= this.Players.length)
            this.currentPlayerIdx = 0;
        //TODO stop playing when the game is finish
        this.Players[this.currentPlayerIdx].play();
    }


    public readScore(input: string) : number {
        // TODO : check if input is a string

        let nb : number = parseInt(input);
        if (nb === NaN) {
            throw new Error("invalid input");
        }
        if (nb < 0 || nb > 10) {
            throw new Error("invalid input");
        }
        return nb;
    }

}


export { Game }
