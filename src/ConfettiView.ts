class ConfettiView {
    private confettiDiv: HTMLElement
    private confettis: Array<HTMLElement>

    constructor(rootElement : HTMLElement) {

        this.confettiDiv = document.createElement('div')
        this.confettiDiv.classList.add("confetti-view-container");
        this.confettiDiv.classList.add("hidden");
        this.confettis = new Array<HTMLElement>()

        for (let index = 0; index < 10; index++) {
            const confetti = document.createElement('div')
            confetti.classList.add("confetti-view-confetti")
            this.confettis.push(confetti)
            this.confettiDiv.appendChild(confetti)
        }

        rootElement.appendChild(this.confettiDiv)
    }

    public destroy() {
        this.confettiDiv.remove()
    }

    public toggle() {
        this.confettiDiv.classList.toggle("hidden")
    }
}

export {ConfettiView}
