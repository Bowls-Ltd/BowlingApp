import {Game} from "./Game"
import {GameView} from "./GameView"
import {Player} from "./Player"
import {ViewConfigForm} from "./ViewConfigForm"

function init() {
    const viewConfigForm = new ViewConfigForm()
    viewConfigForm.attachGameCreationCallback(initGame)
}

function initGame(view: ViewConfigForm, nbPlayers: number, nbPins: number) {
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
    const gameView = new GameView(game)
    gameView.displayWinner(game)
}

export {init, initGame}
