import {PlayerView} from "./PlayerView"

class ViewConfigForm {
    private body: HTMLElement

    constructor() {
        this.body = document.body

        const nbPlayersLabel = document.createElement('h3')
        nbPlayersLabel.innerHTML = "Veuillez saisir le nombre de joueur :"
        nbPlayersLabel.id = "nb-players-title"
        const inputNbPlayers = document.createElement('input')
        inputNbPlayers.id = "nb-players-input"
        const nbPlayersDiv = document.createElement('div')
        nbPlayersDiv.id = "nb-players-form"
        const p = document.createElement('p')
        const buttonValidate = document.createElement('button')
        buttonValidate.id = "nb-players-button"
        p.appendChild(buttonValidate)
        buttonValidate.innerHTML = "Valider"
        nbPlayersDiv.appendChild(nbPlayersLabel)
        nbPlayersDiv.appendChild(inputNbPlayers)
        nbPlayersDiv.appendChild(p)
        this.body.appendChild(nbPlayersDiv)
    }
}

export {ViewConfigForm}