class PlayerTurn {

    private shots : Array<number>;
    private isLastTurn : boolean;
    private remainingPins : number;
    private totalPins : number;

    constructor(isLastTurn : boolean, nbPins : number) {
        this.shots = new Array<number>();
        this.isLastTurn = isLastTurn;
        this.totalPins = nbPins;
        this.remainingPins = nbPins;
    }

    public addPins(pinsNb: number): void {
        if (!Number.isInteger(pinsNb))
            throw new Error("invalid input");
        if (pinsNb < 0 || pinsNb > this.totalPins)
            throw new Error("invalid input");
        if (this.isOver())
            throw new Error("your turn is over");
        if (pinsNb > this.remainingPins)
            throw new Error("total pins down cannot exceed " + this.totalPins);

        this.shots.push(pinsNb)
        this.remainingPins -= pinsNb       

        if(this.isLastTurn) {
            if(this.isStrike() && this.shots.length === 1)
                this.remainingPins = this.totalPins;
            else if(this.shots.length === 2) {
                if(this.isStrike() && this.shots[1] === this.totalPins)
                    this.remainingPins = this.totalPins;
                else if(this.isSpare())
                    this.remainingPins = this.totalPins;
            }
        }
                
    }

    public getShots() {
        return this.shots;
    }

    public pinsSum(): number {
        let sum = 0;
        this.shots.forEach((shot) => {
            sum += shot;
        })
        return sum;
    }

    public isOver(): boolean {
        if (this.isLastTurn)
            return this.shots.length === 3 || (this.shots.length === 2 && !this.isSpare() && !this.isStrike());
        else
            return this.shots.length === 2 || this.isStrike();
    }

    public isStrike(): boolean {
        return this.shots.length >= 1 && this.shots[0] === this.totalPins;
    }

    public isSpare(): boolean {
        return (this.shots.length >= 2 && this.shots[0] + this.shots[1] === this.totalPins);
    }

    public getRemainingPins() : number {
        return this.remainingPins;
    }
}

export { PlayerTurn }
