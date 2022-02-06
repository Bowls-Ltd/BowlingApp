import { HtmlOptions } from "istanbul-reports";
import { PlayerTurn } from "./PlayerTurn"
import { Player } from "./Player"

class PlayerView {
    private firstRow: HTMLTableRowElement;
    private secondRow: HTMLTableRowElement;
    private firstRowCells  : Array<HTMLTableCellElement>;
    private secondRowCells : Array<HTMLTableCellElement>;
    private playerNameCell : HTMLTableCellElement;
    private maxPins : number;


    public constructor(rootElement: HTMLTableElement, player: Player) {
        this.maxPins = player.getMaxPins();
        this.firstRow = rootElement.insertRow(-1);
        this.secondRow = rootElement.insertRow(-1);
        this.firstRowCells = new Array<HTMLTableCellElement>()
        this.secondRowCells = new Array<HTMLTableCellElement>()

        for (let i = 0; i < 23; i++) {
            let td = this.firstRow.insertCell()
            if (i == 0 || i == 22)
                td.rowSpan = 2
            if (i==0)
            {
                td.textContent = player.getName();
                this.playerNameCell = td;
                if (player.isPlaying()) {
                    this.playerNameCell.className = "active-player";
                }
                else {
                    this.playerNameCell.className = "waiting-player";
                }
            }
            else
                this.firstRowCells.push(td)
        }

        for (let i = 0; i < 10; i++) {
            let td = this.secondRow.insertCell()
            if (i == 9)
                td.colSpan = 3
            else
                td.colSpan = 2
            this.secondRowCells.push(td)
        }
        rootElement.appendChild(this.firstRow);
        rootElement.appendChild(this.secondRow)
    }

    public update(p: Player) {
        if (p.isPlaying()) {
            this.playerNameCell.className = "active-player";
        }
        else {
            this.playerNameCell.className = "waiting-player";
        }

        let score: Array<number> = p.computeAccumulatedScores();
        let bestScore : number = 0;
        for (let i in score) {
            if (score[i] > bestScore)
                bestScore = score[i]
            this.secondRowCells[i].textContent = String(score[i]);
        }
        this.firstRowCells[this.firstRowCells.length-1].textContent = String(bestScore)

        let turn: Array<PlayerTurn> = p.getTurns();
        for (let i = 0; i < turn.length; ++i) {
            let Ind : number = i * 2;
            this.firstRowCells[Ind].className = "";
            this.firstRowCells[Ind+1].className = "";
            let shots: Array<number> = turn[i].getShots();
            if (i === 9) {
                this.firstRowCells[Ind+2].className = "";
                for (let y = 0; y < shots.length; ++y) {
                    if (shots[y] === this.maxPins) this.firstRowCells[Ind + y].textContent = "X";
                    else if (y > 0 && shots[y] !== 0 && shots[y - 1] + shots[y] === this.maxPins) this.firstRowCells[Ind + y].textContent = "/";
                    else if (shots[y] === 0) this.firstRowCells[Ind + y].textContent = "-";
                    else this.firstRowCells[Ind + y].textContent = String(shots[y]);
                }
            }
            else {
                if (turn[i].isStrike()) {
                    this.firstRowCells[Ind].textContent = "X";
                }
                else {
                    for (let y = 0; y < shots.length; y++) {
                        if (shots[y] == 0) this.firstRowCells[Ind + y].textContent = "-";
                        else this.firstRowCells[Ind + y].textContent = String(shots[y])

                        if (turn[i].isSpare()) {
                            this.firstRowCells[Ind + y + 1].textContent = "/"
                            break;
                        }
                    }
                }
            }
        }
        if (p.isPlaying())
        {
            let ind = turn.length -1
            this.firstRowCells[2*ind + turn[ind].getShots().length].className = "next-cell"
        }
    }

    public winnerDisplay() {
        this.firstRow.classList.add("winner");
        this.secondRow.classList.add("winner");
        this.playerNameCell.className = "winner";
    }
}

export {
    PlayerView
}
