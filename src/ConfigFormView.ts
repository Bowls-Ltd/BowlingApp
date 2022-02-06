import {NumberSelector} from "./NumberSelector"

class ConfigFormView {
    private title: HTMLElement
    private configDiv: HTMLElement

    private playerNumberSelector: NumberSelector
    private pinNumberSelector: NumberSelector

    private buttonValidateDiv: HTMLElement
    private buttonValidateUp: HTMLImageElement
    private buttonValidateDown: HTMLImageElement

    private buttonValidate: HTMLElement
    private p: HTMLElement
    private errorBox: HTMLElement

    constructor(rootElement : HTMLElement) {
        this.title = document.createElement('div')
        this.title.id = 'game-title'
        this.title.classList.add('game-title')

        this.configDiv = document.createElement('div')
        this.configDiv.classList.add("pretty-container")
        this.configDiv.classList.add("config-form-view-div")
        this.configDiv.id = "config-form"

        this.buttonValidateDiv = document.createElement('div')
        this.buttonValidateDiv.id = 'validate-div'
        this.buttonValidateDiv.classList.add('config-form-view-div')
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
        this.playerNumberSelector = new NumberSelector(this.configDiv, 'Nombre de joueurs', 2, 1)
        this.pinNumberSelector = new NumberSelector(this.configDiv, 'Nombre de quilles', 10, 1, 100);
        this.titleUpdate(10);
        this.configDiv.appendChild(this.buttonValidateDiv)
        this.configDiv.appendChild(this.errorBox)

        rootElement.appendChild(this.configDiv)

        this.pinNumberSelector.attachNumberSelectedCallback((nb : number) => { this.titleUpdate(nb) });
    }

    // CBO easter egg
    private titleUpdate(nb : number) {
        if (nb > 10)  this.title.textContent = "TenPins (or more...)"
        else if (nb < 10 ) this.title.textContent = "TenPins (or less...)"
        else this.title.textContent = "TenPins";
    }

    public destroy() {
        this.configDiv.remove()
    }

    public attachGameCreationCallback(callback: GameCreationCallback) : void {
        this.buttonValidateDiv.addEventListener("click", () => {
            callback(this, this.playerNumberSelector.getSelectedValue(),
                     this.pinNumberSelector.getSelectedValue())
        })
    }

    public printError(msg: string) : void {
        this.errorBox.innerHTML = msg
        this.errorBox.style.visibility = "visible"
    }

    public getTitle() : string {
        return this.title.textContent;
    }
}

type GameCreationCallback = (view: ConfigFormView, nbPlayers: number, nbPins: number) => void

export {ConfigFormView}
