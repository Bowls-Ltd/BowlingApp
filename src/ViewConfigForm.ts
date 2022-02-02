import {PlayerView} from "./PlayerView"

class ViewConfigForm {
    private body: HTMLElement

    constructor() {
        this.body = document.body

        const nbPlayersLabel = document.createElement('h3')
        nbPlayersLabel.innerHTML = "Veuillez saisir le nombre de joueur :"
        const inputNbPlayers = document.createElement('input')
        const nbPlayersDiv = document.createElement('div')
        nbPlayersDiv.appendChild(nbPlayersLabel)
        nbPlayersDiv.appendChild(inputNbPlayers)
        this.body.appendChild(nbPlayersDiv)
    }
}

export {ViewConfigForm}