import {ConfigFormView} from "./ConfigFormView"
import {Game} from "./Game"
import {GameView} from "./GameView"
import {Player} from "./Player"

function init() {
    const configFormView = new ConfigFormView()
    configFormView.attachGameCreationCallback(initGame)
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

    game.startPlaying()
    const gameView = new GameView(game)
    gameView.displayWinner(game)
}

export {init, initGame}
