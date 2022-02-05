class ViewConfigForm {
    private body: HTMLElement
    private configDiv: HTMLElement
    private nbPlayersTitle: HTMLElement
    private inputNbPlayers: HTMLInputElement
    private nbPinsTitle: HTMLElement
    private inputNbPins: HTMLInputElement
    private buttonValidate: HTMLElement
    private p: HTMLElement
    private errorBox: HTMLElement

    constructor() {
        this.body = document.body

        this.configDiv = document.createElement('div')
        this.configDiv.id = "config-form"

        this.nbPlayersTitle = document.createElement('h3')
        this.nbPlayersTitle.innerHTML = "Veuillez saisir le nombre de joueur :"
        this.nbPlayersTitle.id = "nb-players-title"

        this.inputNbPlayers = document.createElement('input')
        this.inputNbPlayers.id = "nb-players-input"

        this.nbPinsTitle = document.createElement('h3')
        this.nbPinsTitle.innerHTML = "Veuillez saisir le nombre de quilles :"
        this.nbPinsTitle.id = "nb-pins-title"

        this.inputNbPins = document.createElement('input')
        this.inputNbPins.id = "nb-pins-input"

        this.p = document.createElement('p')
        this.buttonValidate = document.createElement('button')
        this.buttonValidate.id = "validate-button"
        this.buttonValidate.innerHTML = "Valider"

        this.errorBox = document.createElement('p')
        this.errorBox.id = "config-error-box"
        this.errorBox.style.background = "red"
        this.errorBox.style.color = "white"
        this.errorBox.style.visibility = "hidden"

        this.p.appendChild(this.buttonValidate)
        this.configDiv.appendChild(this.nbPlayersTitle)
        this.configDiv.appendChild(this.inputNbPlayers)
        this.configDiv.appendChild(this.nbPinsTitle)
        this.configDiv.appendChild(this.inputNbPins)
        this.configDiv.appendChild(this.p)
        this.configDiv.appendChild(this.errorBox)
        this.body.appendChild(this.configDiv)
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

type GameCreationCallback = (view: ViewConfigForm, nbPlayers: number, nbPins: number) => void

export {ViewConfigForm}
