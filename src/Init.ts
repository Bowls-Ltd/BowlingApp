import {Game} from "./Game"
import {GameView} from "./GameView"
import {Player} from "./Player"
import {ConfigFormView} from "./ConfigFormView"

function init() {
    const mainContainer = document.getElementById("main-container")
    const configFormView = new ConfigFormView(mainContainer)
    configFormView.attachGameCreationCallback(initGame)
}

function initGame(view: ConfigFormView, nbPlayers: number, nbPins: number) {
    let game
    try {
        game = new Game(nbPlayers, nbPins)
        view.destroy()
    }
    catch (e: any) {
        view.printError(e)
        return
    }

    game.startPlaying()
    const mainContainer = document.getElementById("main-container")
    const gameView = new GameView(mainContainer, game)
    gameView.displayWinner(game)
}

export {init, initGame}
