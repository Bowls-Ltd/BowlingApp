import {PlayerTurn} from "./PlayerTurn"

class PlayerView {
    private UInodeTurn: HTMLElement;
    private UInodeScore: HTMLElement;

    public constructor(UITurn: HTMLElement, UIScore) {
      this.UInodeTurn = UITurn;
      this.UInodeScore = UIScore;
    }

    public update(turns : Array<PlayerTurn>, accumulatedScore : Array<number>) {
        let str : string = "| ";
        for (let s of accumulatedScore) {
            str = str + s + " | ";
        }
        this.UInodeScore.textContent = str;

        str = "| ";

        for (let t of turns) {
            let shots : Array<number> = t.getShots();
            if(t.isStrike()) {
                str = str + "X ";
            }
            else {
                for(let s of shots) {
                    str = str + s + " ";
                    if(t.isSpare()) {
                        str = str + "/";
                        break;
                    }
                }
            }
            str = str + " | ";
        }
        this.UInodeTurn.textContent = str;
    }
}

export {
    PlayerView
}
