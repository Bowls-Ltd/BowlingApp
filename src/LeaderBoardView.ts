import {PlayerView} from "./PlayerView"
import {Player} from "./Player"

class LeaderBoardView {
    private mainContainer: HTMLTableElement;
    private playerViews: Map<Player, PlayerView>

    public constructor(rootElement : HTMLElement, players : Array<Player>) {
        this.mainContainer = document.createElement("table");
        this.mainContainer.classList.add("leaderboard-view");

        this.playerViews = new Map<Player, PlayerView>();
        
        players.forEach(player => {
            this.playerViews.set(player, new PlayerView(this.mainContainer, player))
        })
        
        rootElement.appendChild(this.mainContainer);
    }

    public update() {
        for (let entry of Array.from(this.playerViews.entries())) {
            let player = entry[0];
            let view = entry[1];
            view.update(player);
        }
    }

    public displayWinners(winners : Array<Player>) : void {
        for (let p of winners) {
            this.playerViews.get(p).winnerDisplay();
        }
    }
}

export {
    LeaderBoardView
}