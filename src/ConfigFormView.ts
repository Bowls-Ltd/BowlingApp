import {title} from "./Title"

class ConfigFormView {
    private title: HTMLElement
    private configDiv: HTMLElement
    private nbPlayersTitle: HTMLElement
    private inputNbPlayers: HTMLInputElement
    private nbPinsTitle: HTMLElement
    private inputNbPins: HTMLInputElement
    private buttonValidate: HTMLElement
    private p: HTMLElement
    private errorBox: HTMLElement

    constructor(rootElement : HTMLElement) {

        this.configDiv = document.createElement('div')
        this.configDiv.classList.add("pretty-container");
        this.configDiv.classList.add("config-form-view-div");
        this.configDiv.id = "config-form"

        this.title = document.createElement('div')
        this.title.id = 'config-game-title'
        this.title.classList.add('game-title')
        this.title.innerHTML = title

        this.nbPlayersTitle = document.createElement('div')
        this.nbPlayersTitle.classList.add("config-form-view-title");
        this.nbPlayersTitle.innerHTML = "Veuillez saisir le nombre de joueur :"
        this.nbPlayersTitle.id = "nb-players-title"

        this.inputNbPlayers = document.createElement('input')
        this.inputNbPlayers.id = "nb-players-input"

        this.nbPinsTitle = document.createElement('div')
        this.nbPinsTitle.classList.add("config-form-view-title");
        this.nbPinsTitle.innerHTML = "Veuillez saisir le nombre de quilles :"
        this.nbPinsTitle.id = "nb-pins-title"

        this.inputNbPins = document.createElement('input')
        this.inputNbPins.id = "nb-pins-input"

        this.p = document.createElement('div')
        this.buttonValidate = document.createElement('button')
        this.buttonValidate.id = "validate-button"
        this.buttonValidate.innerHTML = "Valider"

        this.errorBox = document.createElement('div')
        this.errorBox.id = "config-error-box"
        this.errorBox.style.background = "red"
        this.errorBox.style.color = "white"
        this.errorBox.style.visibility = "hidden"

        this.p.appendChild(this.buttonValidate)
        this.configDiv.appendChild(this.title)
        this.configDiv.appendChild(this.nbPlayersTitle)
        this.configDiv.appendChild(this.inputNbPlayers)
        this.configDiv.appendChild(this.nbPinsTitle)
        this.configDiv.appendChild(this.inputNbPins)
        this.configDiv.appendChild(this.p)
        this.configDiv.appendChild(this.errorBox)
        rootElement.appendChild(this.configDiv)
    }

    public destroy() {
        this.configDiv.remove()
    }

    public attachGameCreationCallback(callback: GameCreationCallback) : void {
        this.buttonValidate.addEventListener("click", () => {
            callback(this, parseInt(this.inputNbPlayers.value), parseInt(this.inputNbPins.value))
        })
    }

    public printError(msg: string) : void {
        this.errorBox.innerHTML = msg
        this.errorBox.style.visibility = "visible"
    }
}

type GameCreationCallback = (view: ConfigFormView, nbPlayers: number, nbPins: number) => void

export {ConfigFormView}
