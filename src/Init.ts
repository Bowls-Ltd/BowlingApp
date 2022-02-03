import {Game} from "./Game"
import {ViewConfigForm} from "./ViewConfigForm"

function init() {
    const viewConfigForm = new ViewConfigForm()
    viewConfigForm.attachGameCreationCallback(initGame)
}

function initGame(view: ViewConfigForm, nbPlayers: number, nbPins: number) {
    try {
        const game = new Game(nbPlayers, nbPins)
        view.destroy()
    }
    catch (e: any) {
        view.printError(e)
    }
}

export {init, initGame}
