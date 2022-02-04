import {HtmlOptions} from "istanbul-reports";
import {PlayerTurn} from "./PlayerTurn"
import {Player} from "./Player"

class PlayerView {
    private mainContainer     : HTMLElement;
    private playerInfoElement : HTMLElement;
    private historyContainer  : HTMLElement;
    private turnsContainer    : HTMLElement;
    private scoresContainer   : HTMLElement;

    public constructor(rootElement : HTMLElement, player : Player) {
        this.mainContainer = document.createElement("div");
        this.mainContainer.classList.add("player-view");

        this.playerInfoElement = document.createElement("div");
        this.playerInfoElement.classList.add("player-view-info");
        this.playerInfoElement.innerHTML = player.getName();

        this.historyContainer = document.createElement("div");
        this.historyContainer.classList.add("player-view-history");

        this.turnsContainer = document.createElement("div");
        this.turnsContainer.classList.add("player-view-turns");
        
        this.scoresContainer = document.createElement("div");
        this.scoresContainer.classList.add("player-view-scores");

        this.historyContainer.appendChild(this.turnsContainer);
        this.historyContainer.appendChild(this.scoresContainer);

        this.mainContainer.appendChild(this.playerInfoElement);
        this.mainContainer.appendChild(this.historyContainer);
        
        rootElement.appendChild(this.mainContainer);
    }

    public update(turns : Array<PlayerTurn>, accumulatedScore : Array<number>) {
        let str : string = "| ";
        for (let s of accumulatedScore) {
            str = str + s + " | ";
        }
        this.scoresContainer.textContent = str;

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
        this.turnsContainer.textContent = str;
    }
}

export {
    PlayerView
}
