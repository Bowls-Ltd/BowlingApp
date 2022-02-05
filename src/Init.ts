import { ConfigFormView } from "./ConfigFormView"
import { Game } from "./Game"
import { GameView } from "./GameView"
import { Player } from "./Player"
import {ConfettiView} from "./ConfettiView"

function init() {
    const mainContainer = document.getElementById("main-container")
    const configFormView = new ConfigFormView(mainContainer)
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

    // End callback
    game.attachGameEndedCallback(function () { gameView.displayWinner(game.getWinners()); partyTime(); })

    game.startPlaying()
    const mainContainer = document.getElementById("main-container")
    const gameView = new GameView(mainContainer, game)

    // Input handler callback and game logic
    gameView.getRollInput().attachRollInputCallback(function (nbPins: number) {
        try {
            let currentPlayer : Player = game.getCurrentPlayer();
            gameView.getRollInput().hideError()
            currentPlayer.makeTry(nbPins);
            if (!currentPlayer.isPlaying())
                game.nextPlayer();
            gameView.update(game.getCurrentPlayer(), game.getPlayers()); //geting the new current player
        }
        catch (e: any) {
            gameView.getRollInput().printError(e)
        }
    });
}

function partyTime() {
    const confettiView = new ConfettiView(document.body)
    confettiView.toggle()
}

export { init, initGame }
