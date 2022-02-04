class RollInputView {
    private body:       HTMLElement
    private rollView:   HTMLElement
    private pinInput:   HTMLInputElement
    private pinLabel:   HTMLLabelElement
    private pinSubmit:  HTMLElement
    private pinError:   HTMLElement

    constructor() {
        this.body = document.body

        this.rollView = document.createElement('div');
        this.rollView.id = "roll-view";

        this.pinLabel = document.createElement('label');
        this.pinLabel.id = "pin-label";
        this.pinLabel.setAttribute('for', 'pin-input');
        this.pinLabel.innerHTML = "Pin count:";

        this.pinInput = document.createElement('input');
        this.pinInput.id = "pin-input";
        this.pinInput.type = 'number';
        this.pinInput.min = '1';

        this.pinSubmit = document.createElement('button');
        this.pinSubmit.id = "pin-submit";
        this.pinSubmit.innerHTML = "Submit";

        this.pinError = document.createElement('p')
        this.pinError.id = "pin-error"
        this.pinError.style.background = "red"
        this.pinError.style.color = "white"
        this.pinError.style.visibility = "hidden"

        this.rollView.appendChild(this.pinLabel);
        this.rollView.appendChild(this.pinInput);
        this.rollView.appendChild(this.pinSubmit);
        this.rollView.appendChild(this.pinError);

        this.body.appendChild(this.rollView);
    }

    public destroy() {
        this.rollView.remove()
    }

    public attachRollInputCallback(callback: RollInputCallback) : void {
        this.pinSubmit.addEventListener("click", () => {
            callback(parseInt(this.pinInput.value));
        })
    }

    public printError(msg: string) : void {
        this.pinError.innerHTML = msg
        this.pinError.style.visibility = "visible"
    }
}

type RollInputCallback = (pinCount: number) => void

export { RollInputView }
