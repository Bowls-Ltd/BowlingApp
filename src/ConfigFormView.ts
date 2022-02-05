import {title} from "./Title"

class ConfigFormView {
    private title: HTMLElement
    private configDiv: HTMLElement

    private playerDiv: HTMLElement
    private nbPlayersTitle: HTMLElement
    private imgPlayerPlusUp: HTMLImageElement
    private imgPlayerPlusDown: HTMLImageElement
    private inputNbPlayers: HTMLElement
    private imgPlayerMinusUp: HTMLImageElement
    private imgPlayerMinusDown: HTMLImageElement

    private pinDiv: HTMLElement
    private nbPinsTitle: HTMLElement
    private imgPinPlusUp: HTMLImageElement
    private imgPinPlusDown: HTMLImageElement
    private inputNbPins: HTMLElement
    private imgPinMinusUp: HTMLImageElement
    private imgPinMinusDown: HTMLImageElement

    private buttonValidateDiv: HTMLElement
    private buttonValidateUp: HTMLImageElement
    private buttonValidateDown: HTMLImageElement

    private buttonValidate: HTMLElement
    private p: HTMLElement
    private errorBox: HTMLElement

    constructor(rootElement : HTMLElement) {
        this.configDiv = document.createElement('div')
        this.configDiv.classList.add("pretty-container")
        this.configDiv.classList.add("config-form-view-div")
        this.configDiv.id = "config-form"

        this.title = document.createElement('div')
        this.title.id = 'config-game-title'
        this.title.classList.add('game-title')
        this.title.innerHTML = title

        this.nbPlayersTitle = document.createElement('div')
        this.nbPlayersTitle.classList.add("config-form-view-title")
        this.nbPlayersTitle.innerHTML = 'Nombre de joueurs'
        this.nbPlayersTitle.id = "nb-players-title"

        this.playerDiv = document.createElement('div')
        this.playerDiv.id = 'player-div'
        this.playerDiv.classList.add('config-form-div')

        this.imgPlayerMinusUp = document.createElement('img')
        this.imgPlayerMinusUp.classList.add('config-form-img-minus')
        this.imgPlayerMinusUp.classList.add('button-up')
        this.imgPlayerMinusUp.src = './images/button_minus_up.png'

        this.imgPlayerMinusDown = document.createElement('img')
        this.imgPlayerMinusDown.classList.add('config-form-img-minus')
        this.imgPlayerMinusDown.classList.add('button-down')
        this.imgPlayerMinusDown.src = './images/button_minus_down.png'

        this.inputNbPlayers = document.createElement('div')
        this.inputNbPlayers.id = "nb-players-input"
        this.inputNbPlayers.classList.add('config-form-number')
        this.inputNbPlayers.innerHTML = '2'

        this.imgPlayerPlusUp = document.createElement('img')
        this.imgPlayerPlusUp.classList.add('config-form-img-plus')
        this.imgPlayerPlusUp.classList.add('button-up')
        this.imgPlayerPlusUp.src = './images/button_plus_up.png'

        this.imgPlayerPlusDown = document.createElement('img')
        this.imgPlayerPlusDown.classList.add('config-form-img-plus')
        this.imgPlayerPlusDown.classList.add('button-down')
        this.imgPlayerPlusDown.src = './images/button_plus_down.png'

        this.playerDiv.appendChild(this.imgPlayerMinusUp)
        this.playerDiv.appendChild(this.imgPlayerMinusDown)
        this.playerDiv.appendChild(this.inputNbPlayers)
        this.playerDiv.appendChild(this.imgPlayerPlusUp)
        this.playerDiv.appendChild(this.imgPlayerPlusDown)

        this.pinDiv = document.createElement('div')
        this.pinDiv.classList.add('config-form-div')
        this.pinDiv.id = 'pin-div'

        this.nbPinsTitle = document.createElement('div')
        this.nbPinsTitle.classList.add('config-form-view-title')
        this.nbPinsTitle.innerHTML = 'Nombre de quilles'
        this.nbPinsTitle.id = 'nb-pins-title'

        this.imgPinMinusUp = document.createElement('img')
        this.imgPinMinusUp.classList.add('config-form-img-minus')
        this.imgPinMinusUp.classList.add('button-up')
        this.imgPinMinusUp.src = './images/button_minus_up.png'

        this.imgPinMinusDown = document.createElement('img')
        this.imgPinMinusDown.classList.add('config-form-img-minus')
        this.imgPinMinusDown.classList.add('button-down')
        this.imgPinMinusDown.src = './images/button_minus_down.png'

        this.inputNbPins = document.createElement('div')
        this.inputNbPins.id = "nb-pins-input"
        this.inputNbPins.classList.add('config-form-number')
        this.inputNbPins.innerHTML = '10'

        this.imgPinPlusUp = document.createElement('img')
        this.imgPinPlusUp.classList.add('config-form-img-plus')
        this.imgPinPlusUp.classList.add('button-up')
        this.imgPinPlusUp.src = './images/button_plus_up.png'

        this.imgPinPlusDown = document.createElement('img')
        this.imgPinPlusDown.classList.add('config-form-img-plus')
        this.imgPinPlusDown.classList.add('button-down')
        this.imgPinPlusDown.src = './images/button_plus_down.png'

        this.pinDiv.appendChild(this.imgPinMinusUp)
        this.pinDiv.appendChild(this.imgPinMinusDown)
        this.pinDiv.appendChild(this.inputNbPins)
        this.pinDiv.appendChild(this.imgPinPlusUp)
        this.pinDiv.appendChild(this.imgPinPlusDown)

        this.buttonValidateDiv = document.createElement('div')
        this.buttonValidateDiv.id = 'validate-div'
        this.buttonValidateDiv.classList.add('config-form-div')
        this.buttonValidateDiv.classList.add('centered-div')

        this.buttonValidateUp = document.createElement('img')
        this.buttonValidateUp.classList.add('config-form-img-validate')
        this.buttonValidateUp.classList.add('button-up')
        this.buttonValidateUp.src = './images/button_validate_up.png'

        this.buttonValidateDown = document.createElement('img')
        this.buttonValidateDown.classList.add('config-form-img-validate')
        this.buttonValidateDown.classList.add('button-down')
        this.buttonValidateDown.src = './images/button_validate_down.png'

        this.buttonValidateDiv.appendChild(this.buttonValidateUp)
        this.buttonValidateDiv.appendChild(this.buttonValidateDown)

        this.errorBox = document.createElement('div')
        this.errorBox.id = 'config-error-box'
        this.errorBox.style.background = 'red'
        this.errorBox.style.color = 'white'
        this.errorBox.style.visibility = 'hidden'

        this.configDiv.appendChild(this.title)
        this.configDiv.appendChild(this.nbPlayersTitle)
        this.configDiv.appendChild(this.playerDiv)
        this.configDiv.appendChild(this.nbPinsTitle)
        this.configDiv.appendChild(this.pinDiv)
        this.configDiv.appendChild(this.buttonValidateDiv)
        this.configDiv.appendChild(this.errorBox)
        rootElement.appendChild(this.configDiv)
    }

    public destroy() {
        this.configDiv.remove()
    }

    public attachGameCreationCallback(callback: GameCreationCallback) : void {
        this.buttonValidateDiv.addEventListener("click", () => {
            callback(this, parseInt(this.inputNbPlayers.innerHTML),
                     parseInt(this.inputNbPins.innerHTML))
        })
    }

    public printError(msg: string) : void {
        this.errorBox.innerHTML = msg
        this.errorBox.style.visibility = "visible"
    }
}

type GameCreationCallback = (view: ConfigFormView, nbPlayers: number, nbPins: number) => void

export {ConfigFormView}
