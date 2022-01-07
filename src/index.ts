import {PlayerTurn} from "./PlayerTurn"
import {Player} from "./Player"
import {PlayerView} from "./PlayerView"

// we have to wait for the html to be fully loaded
document.addEventListener('DOMContentLoaded', (event) => {

  let size : number = 2;
  let Players : Array<Player> = new Array(size);
  let PlayersView : Array<PlayerView> = new Array(size);

  for (let i = 0; i < Players.length; i++) {

    Players[i] = new Player("Player "+ (i+1));

    let UITurn : HTMLElement = document.getElementById("player_" + (i+1) + "_turn");
    let UIScore : HTMLElement = document.getElementById("player_" + (i+1) + "_score");
    PlayersView[i] = new PlayerView(UITurn, UIScore);
  }

  for(let i = 0; i < 10; i++) {
    for(let j = 0; j < Players.length; j++) {
        Players[j].playTurn();
        PlayersView[j].update(Players[j].getTurns(), Players[j].computeAccumulatedScores());
    }
  }
})
