import {ConfigFormView} from "./ConfigFormView"
import {Game} from "./Game"
import {GameView} from "./GameView"
import {Player} from "./Player"

function init() {
    const mainContainer = document.getElementById("main-container")
    const configFormView = new ConfigFormView(mainContainer)
    configFormView.attachGameCreationCallback(initGame)
    configFormView.printError("Coucou")
}

function initGame(configFormView: ConfigFormView, nbPlayers: number, nbPins: number) {
    let game
    try {
        game = new Game(nbPlayers, nbPins)
        configFormView.destroy()
    }
    catch (e: any) {
        configFormView.printError(e)
        return
    }
    game.attachGameEndedCallback(function() { gameView.displayWinner(game.getWinners()) })
    game.startPlaying()
    const mainContainer = document.getElementById("main-container")
    const gameView = new GameView(mainContainer, game)
}

export {init, initGame}
