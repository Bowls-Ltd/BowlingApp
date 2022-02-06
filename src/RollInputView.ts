import {NumberSelector} from "./NumberSelector"

class RollInputView {
    private rollView:      HTMLElement
    private pinSelector: NumberSelector
    private validateText: HTMLElement
    private buttonValidateDiv: HTMLElement
    private buttonValidateUp: HTMLImageElement
    private buttonValidateDown: HTMLImageElement
    private pinError:      HTMLElement

    constructor(rootElement: HTMLElement, nbPins: number) {
        this.rollView = document.createElement('div');
        this.rollView.id = "roll-view";

        this.pinSelector = new NumberSelector(this.rollView, '', 0, 0, nbPins)
        
        this.buttonValidateDiv = document.createElement('div')
        this.buttonValidateDiv.id = 'validate-div'
        this.buttonValidateDiv.classList.add('rollinput-view-div')
        this.buttonValidateDiv.classList.add('centered-div')

        this.validateText = document.createElement('div')
        this.validateText.classList.add('rollinput-view-text')
        this.validateText.innerHTML = 'Valider'

        this.buttonValidateUp = document.createElement('img')
        this.buttonValidateUp.classList.add('rollinput-view-img')
        this.buttonValidateUp.classList.add('button-up')
        this.buttonValidateUp.src = './images/button_validate_up.png'

        this.buttonValidateDown = document.createElement('img')
        this.buttonValidateDown.classList.add('rollinput-view-img')
        this.buttonValidateDown.classList.add('button-down')
        this.buttonValidateDown.src = './images/button_validate_down.png'

        this.buttonValidateDiv.appendChild(this.validateText)
        this.buttonValidateDiv.appendChild(this.buttonValidateUp)
        this.buttonValidateDiv.appendChild(this.buttonValidateDown)

        this.pinError = document.createElement('p')
        this.pinError.id = "pin-error"
        this.pinError.style.background = "red"
        this.pinError.style.color = "white"
        this.pinError.style.visibility = "hidden"

        this.rollView.appendChild(this.buttonValidateDiv);
        this.rollView.appendChild(this.pinError);

        rootElement.appendChild(this.rollView);
    }

    public attachRollInputCallback(callback: RollInputCallback) : void {
        this.buttonValidateDiv.addEventListener("click", () => {
            callback(this.pinSelector.getSelectedValue());
        })
    }

    public printError(msg: string) : void {
        this.pinError.innerHTML = msg
        this.pinError.style.visibility = "visible"
    }

    public hideError(): void {
        this.pinError.style.visibility = "hidden"
        this.pinError.innerHTML = "" 
    }
}

type RollInputCallback = (pinCount: number) => void

export { RollInputView }
