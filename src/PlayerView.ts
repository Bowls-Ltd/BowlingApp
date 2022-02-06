import { HtmlOptions } from "istanbul-reports";
import { PlayerTurn } from "./PlayerTurn"
import { Player } from "./Player"

class PlayerView {
    private firstRow: HTMLTableRowElement;
    private secondRow: HTMLTableRowElement;
    private firstRowCells  : Array<HTMLTableCellElement>;
    private secondRowCells : Array<HTMLTableCellElement>;


    public constructor(rootElement: HTMLTableElement, player: Player) {
        this.firstRow = rootElement.insertRow(-1);
        this.secondRow = rootElement.insertRow(-1);
        this.firstRowCells = new Array<HTMLTableCellElement>()
        this.secondRowCells = new Array<HTMLTableCellElement>()

        for (let i = 0; i < 23; i++) {
            let td = this.firstRow.insertCell()
            if (i == 0 || i == 22)
                td.rowSpan = 2
            if (i==0)
                td.textContent = player.getName();
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
        console.log("add")
    }

    public update(p: Player) {
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
            let shots: Array<number> = turn[i].getShots();
            if (i == 9) {
                for (let y = 0; y < shots.length; ++y) {
                    if (shots[y] == 10) this.firstRowCells[Ind + y].textContent = "X";
                    else if (y > 0 && shots[y] != 0 && shots[y - 1] + shots[y] === 0) this.firstRowCells[Ind + y].textContent = "/";
                    else this.firstRowCells[Ind + y].textContent = String(shots[y]);
                }
            }
            else {
                if (turn[i].isStrike()) {
                    this.firstRowCells[Ind].textContent = "X";
                }
                else {
                    for (let y = 0; y < shots.length; y++) {
                        this.firstRowCells[Ind + y].textContent = String(shots[y])
                        if (turn[i].isSpare()) {
                            this.firstRowCells[Ind + y + 1].textContent = "/"
                            break;
                        }
                    }
                }
            }
        }
    }
}

export {
    PlayerView
}
