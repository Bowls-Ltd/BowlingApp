import {PlayerView} from "./PlayerView"
import {Player} from "./Player"

class LeaderBoardView {
    private mainContainer: HTMLTableElement;
    private playerViews: Array<PlayerView>

    public constructor(rootElement : HTMLElement, players : Array<Player>) {
        this.mainContainer = document.createElement("table");
        this.mainContainer.classList.add("leaderboard-view");

        this.playerViews = new Array<PlayerView>();
        players.forEach(player => {
            this.playerViews.push(new PlayerView(this.mainContainer, player))
        })
        
        rootElement.appendChild(this.mainContainer);
    }

    public update(players: Array<Player>) {
        for (let i = 0; i < players.length; i++) {
            this.playerViews[i].update(players[i])
        }
    }
}

export {
    LeaderBoardView
}