import { Game } from "./Game"
import { Player } from "./Player"

interface GameRecord {
    date: string
    nbPins: number
    players: Array<{ name: string, score: number }>
}

const STORAGE_KEY = "tenpins-history"
const MAX_RECORDS = 20

class MyBowlingView {
    private container: HTMLElement
    private currentScoreDiv: HTMLElement
    private historyDiv: HTMLElement
    private currentGame: Game | null

    public constructor(rootElement: HTMLElement) {
        this.currentGame = null

        this.container = document.createElement('div')
        this.container.classList.add('pretty-container')
        this.container.classList.add('my-bowling-view-div')

        const title = document.createElement('div')
        title.classList.add('game-title')
        title.textContent = "마이볼링"

        const currentScoreTitle = document.createElement('div')
        currentScoreTitle.classList.add('my-bowling-section-title')
        currentScoreTitle.textContent = "현재 점수"

        this.currentScoreDiv = document.createElement('div')
        this.currentScoreDiv.classList.add('my-bowling-current-score')

        const historyTitle = document.createElement('div')
        historyTitle.classList.add('my-bowling-section-title')
        historyTitle.textContent = "최근 기록"

        this.historyDiv = document.createElement('div')
        this.historyDiv.classList.add('my-bowling-history')

        this.container.appendChild(title)
        this.container.appendChild(currentScoreTitle)
        this.container.appendChild(this.currentScoreDiv)
        this.container.appendChild(historyTitle)
        this.container.appendChild(this.historyDiv)

        rootElement.appendChild(this.container)

        this.renderCurrentScore()
        this.renderHistory()
    }

    public setCurrentGame(game: Game | null): void {
        this.currentGame = game
        this.renderCurrentScore()
    }

    public updateCurrentScore(): void {
        this.renderCurrentScore()
    }

    public refresh(): void {
        this.renderCurrentScore()
        this.renderHistory()
    }

    public saveRecord(players: Array<Player>, nbPins: number): void {
        const record: GameRecord = {
            date: new Date().toLocaleString(),
            nbPins: nbPins,
            players: players.map(p => {
                const scores = p.computeAccumulatedScores()
                return { name: p.getName(), score: scores.length > 0 ? scores[scores.length - 1] : 0 }
            })
        }

        const history = this.loadHistory()
        history.unshift(record)
        while (history.length > MAX_RECORDS)
            history.pop()
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history))

        this.renderHistory()
    }

    private loadHistory(): Array<GameRecord> {
        try {
            const raw = localStorage.getItem(STORAGE_KEY)
            return raw ? JSON.parse(raw) : []
        }
        catch (e) {
            return []
        }
    }

    private renderCurrentScore(): void {
        this.currentScoreDiv.innerHTML = ""

        if (this.currentGame === null) {
            const empty = document.createElement('p')
            empty.textContent = "진행 중인 게임이 없습니다"
            this.currentScoreDiv.appendChild(empty)
            return
        }

        const list = document.createElement('ul')
        for (const player of this.currentGame.getPlayers()) {
            const scores = player.computeAccumulatedScores()
            const score = scores.length > 0 ? scores[scores.length - 1] : 0
            const li = document.createElement('li')
            li.textContent = player.getName() + " : " + score
            list.appendChild(li)
        }
        this.currentScoreDiv.appendChild(list)
    }

    private renderHistory(): void {
        this.historyDiv.innerHTML = ""

        const history = this.loadHistory()
        if (history.length === 0) {
            const empty = document.createElement('p')
            empty.textContent = "기록이 없습니다"
            this.historyDiv.appendChild(empty)
            return
        }

        const list = document.createElement('ul')
        for (const record of history) {
            const li = document.createElement('li')
            const scoresText = record.players.map(p => p.name + " " + p.score).join(', ')
            li.textContent = record.date + " - " + scoresText
            list.appendChild(li)
        }
        this.historyDiv.appendChild(list)
    }
}

export { MyBowlingView }
