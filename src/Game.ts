import {Player} from "./Player"
class Game {
    private Players : Array<Player>;
    private nbPins: number;
    private currentPlayerIdx : number;


    public constructor(nbPlayers : number, nbPins: number) {
        if (Number.isNaN(nbPlayers))
            throw new Error("Invalid parameter : nbPlayers must be a number");
        if (nbPlayers <= 0)
            throw new Error("Invalid parameter : nbPlayers must be positive");

        if (Number.isNaN(nbPins))
            throw new Error("Invalid parameter : nbPins must be a number");
        if (nbPins <= 0)
            throw new Error("Invalid parameter : nbPins must be positive");

        this.Players = new Array<Player>();
        for (let index = 0; index < nbPlayers; index++) {
            this.Players.push(new Player("Joueur " + new String(index + 1)))
        }
        this.nbPins = nbPins;

        this.currentPlayerIdx = 0;
    }

    public startPlaying() {
        this.Players[0].play();
    }

    public getPlayers(): Array<Player> {
        return this.Players
    }

    public getCurrentPlayer(): Player {
        return this.Players[this.currentPlayerIdx]
    }

    public getWinner(): Player {
        return new Player("Jean-Michel")
    }

    public nextPlayer() {
        this.currentPlayerIdx = this.currentPlayerIdx + 1;
        if (this.currentPlayerIdx >= this.Players.length)
            this.currentPlayerIdx = 0;
        this.Players[this.currentPlayerIdx].play();
    }
}


export { Game }
