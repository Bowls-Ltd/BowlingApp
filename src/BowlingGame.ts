import { Player } from "./Player"

class BowlingGame
{
    private title : String;
    private players : Array<Player>;
    constructor()
    {
        this.title = "Partie de bowling";
        this.players = new Array();
        this.players.push(new Player("Toto"))
        this.players.push(new Player("Titi"))
    }
    public getTitle() : String {
        return this.title;
    }
    public getScore() : String {
        let score = "";
        this.players.forEach((player, index) => {
            score += "Player " + index + " \"" + player.getName() + "\" : " + player.getScoreValue() + "; " 
        });
        return score;
    }
    public setTitle(title : String) {
        if (title)
            this.title = title;
        else
            throw new Error('Le titre doit être différent non nul')
    }
    public scorePoints(playerIndex: number, score : number) {
        this.players[playerIndex].scorePoints(score);
    }

}

export {
    BowlingGame
}