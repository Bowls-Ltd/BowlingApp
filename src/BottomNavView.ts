type TabChangeCallback = (tab: string) => void

class BottomNavView {
    private nav: HTMLElement
    private gameButton: HTMLElement
    private myBowlingButton: HTMLElement
    private callback: TabChangeCallback | null

    public constructor(rootElement: HTMLElement) {
        this.callback = null

        this.nav = document.createElement('div')
        this.nav.id = 'bottom-nav'
        this.nav.classList.add('bottom-nav')

        this.gameButton = document.createElement('div')
        this.gameButton.classList.add('bottom-nav-item')
        this.gameButton.classList.add('active')
        this.gameButton.textContent = "게임"

        this.myBowlingButton = document.createElement('div')
        this.myBowlingButton.classList.add('bottom-nav-item')
        this.myBowlingButton.textContent = "마이볼링"

        this.nav.appendChild(this.gameButton)
        this.nav.appendChild(this.myBowlingButton)

        rootElement.appendChild(this.nav)

        this.gameButton.addEventListener('click', () => this.selectTab('game'))
        this.myBowlingButton.addEventListener('click', () => this.selectTab('my-bowling'))
    }

    private selectTab(tab: string): void {
        this.gameButton.classList.toggle('active', tab === 'game')
        this.myBowlingButton.classList.toggle('active', tab === 'my-bowling')
        if (this.callback !== null)
            this.callback(tab)
    }

    public attachTabChangeCallback(callback: TabChangeCallback): void {
        this.callback = callback
    }
}

export { BottomNavView }
