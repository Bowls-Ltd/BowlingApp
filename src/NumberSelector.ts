class NumberSelector {
    private mainDiv: HTMLElement
    private titleDiv: HTMLElement
    private selectorDiv: HTMLElement 
    private buttonPlusDiv: HTMLElement
    private imgButtonPlusUp: HTMLImageElement
    private imgButtonPlusDown: HTMLImageElement
    private numberDiv: HTMLElement 
    private buttonMinusDiv: HTMLElement
    private imgButtonMinusUp: HTMLImageElement
    private imgButtonMinusDown: HTMLImageElement
    private errorBox: HTMLElement

    private currentValue: number
    private upperBound: number
    private lowerBound: number

    private NumberSelectedCallbacks : Array<NumberSelectorCallback>;

    constructor(rootElement: HTMLElement, title: string,
                defaultValue: number, lowerBound: number, upperBound: number = 10) {
        this.currentValue = defaultValue
        this.lowerBound = lowerBound
        this.upperBound = upperBound

        this.mainDiv = document.createElement('div')
        this.mainDiv.id = 'selector-main-div'

        this.titleDiv = document.createElement('div')
        this.titleDiv.classList.add('number-selector-title')
        this.titleDiv.innerHTML = title

        this.selectorDiv = document.createElement('div')
        this.selectorDiv.classList.add('number-selector-div')

        this.buttonMinusDiv = document.createElement('div')
        this.buttonMinusDiv.id = 'selector-minus-div'

        this.imgButtonMinusUp = document.createElement('img')
        this.imgButtonMinusUp.classList.add('number-selector-img')
        this.imgButtonMinusUp.classList.add('button-up')
        this.imgButtonMinusUp.src = './images/button_minus_up.png'

        this.imgButtonMinusDown = document.createElement('img')
        this.imgButtonMinusDown.classList.add('number-selector-img')
        this.imgButtonMinusDown.classList.add('button-down')
        this.imgButtonMinusDown.src = './images/button_minus_down.png'

        this.numberDiv = document.createElement('div')
        this.numberDiv.classList.add('number-selector-number')
        this.numberDiv.innerHTML = this.currentValue.toString()

        this.buttonPlusDiv = document.createElement('div')
        this.buttonPlusDiv.id = 'selector-plus-div'

        this.imgButtonPlusUp = document.createElement('img')
        this.imgButtonPlusUp.classList.add('number-selector-img')
        this.imgButtonPlusUp.classList.add('button-up')
        this.imgButtonPlusUp.src = './images/button_plus_up.png'

        this.imgButtonPlusDown = document.createElement('img')
        this.imgButtonPlusDown.classList.add('number-selector-img')
        this.imgButtonPlusDown.classList.add('button-down')
        this.imgButtonPlusDown.src = './images/button_plus_down.png'

        this.errorBox = document.createElement('div')
        this.errorBox.style.background = 'red'
        this.errorBox.style.color = 'white'
        this.errorBox.style.visibility = 'hidden'

        this.buttonMinusDiv.appendChild(this.imgButtonMinusUp)
        this.buttonMinusDiv.appendChild(this.imgButtonMinusDown)
        this.buttonPlusDiv.appendChild(this.imgButtonPlusUp)
        this.buttonPlusDiv.appendChild(this.imgButtonPlusDown)

        this.selectorDiv.appendChild(this.buttonMinusDiv)
        this.selectorDiv.appendChild(this.numberDiv)
        this.selectorDiv.appendChild(this.buttonPlusDiv)

        this.mainDiv.appendChild(this.titleDiv)
        this.mainDiv.appendChild(this.selectorDiv)
        this.mainDiv.appendChild(this.errorBox)

        rootElement.appendChild(this.mainDiv)

        this.buttonMinusDiv.addEventListener('click', () => { this.decrementValue() })
        this.buttonPlusDiv.addEventListener('click', () =>  { this.incrementValue() })

        this.NumberSelectedCallbacks = new Array<NumberSelectorCallback>();
    }

    public incrementValue(): void {
        if (this.currentValue < this.upperBound) {
            this.currentValue++
            this.numberDiv.innerHTML = this.currentValue.toString()
            this.notify(this.currentValue);
        }
    }

    public decrementValue(): void {
        if (this.lowerBound < this.currentValue) {
            this.currentValue--
            this.numberDiv.innerHTML = this.currentValue.toString()
            this.notify(this.currentValue);
        }
    }

    public getSelectedValue(): number {
        return this.currentValue
    }

    public printError(errorMsg: string) : void {
        this.errorBox.innerHTML = errorMsg
        this.errorBox.style.visibility = 'visible'
    }

    public update(upperBound : number) {
        this.upperBound = upperBound;
        this.currentValue = 0;
        this.numberDiv.innerHTML = this.currentValue.toString()
    }

    public attachNumberSelectedCallback(callback : NumberSelectorCallback) {
        this.NumberSelectedCallbacks.push(callback);
    }

    private notify(nb: number) {
        for(let c of this.NumberSelectedCallbacks)
            c(nb);
    }
}

type NumberSelectorCallback = (selectedNumber: number) => void

export {NumberSelector}
