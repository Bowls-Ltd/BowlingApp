import { ConfigFormView } from "./ConfigFormView"
import { Game } from "./Game"
import { GameView } from "./GameView"
import { Player } from "./Player"
import { ConfettiView } from "./ConfettiView"
import { MyBowlingView } from "./MyBowlingView"
import { BottomNavView } from "./BottomNavView"

function init() {
    const mainContainer = document.getElementById("main-container")

    const myBowlingContainer = document.createElement('div')
    myBowlingContainer.id = 'my-bowling-container'
    myBowlingContainer.classList.add('centered-div')
    myBowlingContainer.classList.add('main-container')
    myBowlingContainer.classList.add('hidden')
    mainContainer.parentElement.insertBefore(myBowlingContainer, mainContainer.nextSibling)

    const myBowlingView = new MyBowlingView(myBowlingContainer)

    const bottomNav = new BottomNavView(document.body)
    bottomNav.attachTabChangeCallback((tab: string) => {
        if (tab === 'my-bowling') {
            mainContainer.classList.add('hidden')
            myBowlingContainer.classList.remove('hidden')
            myBowlingView.refresh()
        }
        else {
            mainContainer.classList.remove('hidden')
            myBowlingContainer.classList.add('hidden')
        }
    })

    const configFormView = new ConfigFormView(mainContainer)
    configFormView.attachGameCreationCallback((view: ConfigFormView, nbPlayers: number, nbPins: number) => {
        initGame(view, nbPlayers, nbPins, myBowlingView)
    })
}

function initGame(configFormView: ConfigFormView, nbPlayers: number, nbPins: number, myBowlingView: MyBowlingView) {
    let game
    try {
        game = new Game(nbPlayers, nbPins)
        configFormView.destroy()
    }
    catch (e: any) {
        configFormView.printError(e)
        return
    }



    const mainContainer = document.getElementById("main-container")
    const gameView = new GameView(mainContainer, game, configFormView.getTitle())
    myBowlingView.setCurrentGame(game)


    // Input handler callback and game logic
    gameView.getRollInput().attachRollInputCallback(function (nbPins: number) {

        try {
            let currentPlayer: Player = game.getCurrentPlayer();
            gameView.getRollInput().hideError()
            currentPlayer.makeTry(nbPins);
            if (!currentPlayer.isPlaying())
                game.nextPlayer(); // updating current player

            gameView.update(game.getCurrentPlayer().getRemainingPins(), game.getPlayers()); //geting the new current player
            myBowlingView.updateCurrentScore();
            if (game.hasEnded())
            {
                gameView.displayWinner(game.getWinners());
                myBowlingView.saveRecord(game.getPlayers(), game.getPins());
                partyTime();
            }
        }
        catch (e: any) {
            gameView.getRollInput().printError(e)
        }
    });

    game.startPlaying()
    gameView.update(game.getCurrentPlayer().getRemainingPins(), game.getPlayers())
}

function partyTime() {
    const confettiView = new ConfettiView(document.body)
    confettiView.toggle()
}


export { init, initGame }
