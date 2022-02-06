import {Game} from './Game'
import {Player} from './Player'
import {PlayerView} from './PlayerView'
import {RollInputView} from './RollInputView'
import {LeaderBoardView} from './LeaderBoardView'

class GameView {
    private gameDiv:         HTMLElement
    private title:           HTMLElement
    private inputDiv:        HTMLElement
    private rollInput:       RollInputView
    private playerDiv:       HTMLElement
    private leaderBoardView: LeaderBoardView;
    private resultDiv:       HTMLElement
    private winner:          HTMLElement

    constructor(rootElement: HTMLElement, game: Game, title : string) {
        this.gameDiv = document.createElement('div')
        this.gameDiv.classList.add("pretty-container");
        this.gameDiv.classList.add("game-view-div");
        this.gameDiv.id = 'game-div'

        this.title = document.createElement('div')
        this.title.id = 'game-title'
        this.title.classList.add('game-title')
        this.title.innerHTML = title

        this.inputDiv = document.createElement('div')
        this.inputDiv.id = 'input-div'
        this.rollInput = new RollInputView(this.inputDiv, game.getPins())

        this.playerDiv = document.createElement('div')
        this.playerDiv.id = 'player-div'

        this.leaderBoardView = new LeaderBoardView(this.playerDiv, game.getPlayers())

        this.winner = document.createElement('p')
        this.winner.id = "config-error-box"
        this.winner.style.background = "green"
        this.winner.style.color = "white"
        this.winner.style.visibility = "hidden"

        this.gameDiv.appendChild(this.title)
        this.gameDiv.appendChild(this.inputDiv)
        this.gameDiv.appendChild(this.playerDiv)
        this.gameDiv.appendChild(this.winner)
        rootElement.appendChild(this.gameDiv)
    }

    public update(currPlayer : Player, players : Array<Player>) : void {
        this.leaderBoardView.update(players);
        this.rollInput.update(currPlayer.getRemainingPins());
    }

    public getRollInput() : RollInputView {
        return this.rollInput;
    }

    public displayWinner(winners : Array<Player>) : void {
        if(winners.length === 1)
        {
            this.winner.innerHTML = winners[0].getName() + " a gagné la partie"
            this.winner.style.visibility = "visible"
        }
        else if (winners.length > 1)
        {
            this.winner.innerHTML = winners[0].getName()
            for(let i = 1; i < winners.length; i = i + 1)
                this.winner.innerHTML += ", " + winners[i].getName() 
            this.winner.innerHTML += " ont gagné la partie"
            this.winner.style.visibility = "visible"
        }
        this.leaderBoardView.displayWinners(winners);

    }
}

export {GameView}
