//import {PlayerTurn} from "./PlayerTurn"
//import {Player} from "./Player"
//import {PlayerView} from "./PlayerView"
//import {PlayerController} from "./PlayerController"
import {Game} from "./Game"

// we have to wait for the html to be fully loaded
document.addEventListener('DOMContentLoaded', (event) => {
    
    let size : number = 2;
    let game : Game = new Game(size);
    game.startPlaying();

})
