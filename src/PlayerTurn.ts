class PlayerTurn {

    private shots: Array<number>
    private isLastTurn: boolean
    private remainingPins: number

    constructor(isLastTurn : boolean) {
        this.shots = new Array<number>()
        this.isLastTurn = isLastTurn
        this.remainingPins = 10
    }

    addPins(pinsNb: number): void {
        if (pinsNb < 0 || pinsNb > 10)
            throw new Error("invalid input")
        if ( ! Number.isInteger(pinsNb))
            throw new Error("invalid input")
        if (pinsNb === null || pinsNb === undefined)
            throw new Error("invalid input")
        if ( ! this.isLastTurn && this.shots.length === 2)
            throw new Error("cannot play more than twice")
        if ( ! this.isLastTurn && this.isStrike())
            throw new Error("cannot play more than twice")
        if (this.isLastTurn && this.shots.length === 2 && !this.isStrike() && !this.isSpare())
            throw new Error("cannot play more than twice")
        if (this.isLastTurn && this.shots.length === 3)
            throw new Error("cannot play more than thrice")
        if (pinsNb > this.remainingPins)
            throw new Error("total pins down cannot exceed 10")

        this.shots.push(pinsNb)

        if(this.isLastTurn) {
            if(this.isStrike() && this.shots.length === 1)
                this.remainingPins = 10
            else if(this.shots.length === 2) {
                if(this.isStrike() && this.shots[1] === 10)
                    this.remainingPins = 10
                else if(this.isSpare())
                    this.remainingPins = 10
                else
                    this.remainingPins -= pinsNb 
            } else
                this.remainingPins -= pinsNb   
        } else {
            this.remainingPins -= pinsNb       
        }
    }

    getShots() {
        return this.shots
    }

    pinsSum(): number {
        let sum = 0
        this.shots.forEach((shot) => {
            sum += shot
        })
        return sum
    }

    isOver(): boolean {
        if (this.shots.length == 0) {
            return false
        } else if (this.shots.length == 1) {
            if (this.isLastTurn) {
                return false
            } else {
                if(this.isStrike()) {
                    return true
                } else {
                    return false
                }
            }
        } else if (this.shots.length == 2) {
            if (this.isLastTurn) {
                if (this.isStrike()) {
                    return false
                } else if(this.isSpare()) {
                    return false
                } else {
                    return true
                }
            } else {
                return true
            }
        } else {
            return true
        }
    }

    isStrike(): boolean {
        if (this.shots.length >= 1)
            return this.shots[0] === 10
        else return false
    }

    isSpare(): boolean {
        if (this.shots.length >= 2 && this.shots[0] + this.shots[1] === 10)
            return true
        else
            return false
    }
}

export { PlayerTurn }