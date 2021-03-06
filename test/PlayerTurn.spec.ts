import { PlayerTurn } from "../src/PlayerTurn";

describe("Test class PlayerTurn", () => {

    describe("Test addPins() and pinsSum() with 10 pins", () => {

        // 1st to 9th turn
        test("8 pins down", () => {
            let o = new PlayerTurn(false, 10);

            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            expect(() => o.addPins(3)).not.toThrow();

            expect(o.pinsSum()).toBe(3);
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);

            expect(() => o.addPins(5)).not.toThrow();

            expect(o.pinsSum()).toBe(3+5);
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(true);

            expect(() => o.addPins(1)).toThrow('your turn is over');
        });


        test("1 strike", () => {
            let o = new PlayerTurn(false, 10);
            
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            expect(() => o.addPins(10)).not.toThrow();

            expect(o.pinsSum()).toBe(10);
            expect(o.isStrike()).toBe(true);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(true);
            expect(() => o.addPins(1)).toThrow('your turn is over');
        });

        test("1 spare", () => {
            let o = new PlayerTurn(false, 10);
            
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            expect(() => o.addPins(6)).not.toThrow();
            expect(o.pinsSum()).toBe(6);
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);

            expect(() => o.addPins(4)).not.toThrow();
            expect(o.pinsSum()).toBe(10);
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(true);
            expect(o.isOver()).toBe(true);
            expect(() => o.addPins(1)).toThrow('your turn is over');

        });


        test("0 and spare", () => {
            let o = new PlayerTurn(false, 10);
            
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            expect(() => o.addPins(0)).not.toThrow();
            expect(o.pinsSum()).toBe(0);
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);

            expect(() => o.addPins(10)).not.toThrow();
            expect(o.pinsSum()).toBe(10);
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(true);
            expect(o.isOver()).toBe(true);
            expect(() => o.addPins(1)).toThrow('your turn is over');
        });


        test("0 skittle down", () => {
            let o = new PlayerTurn(false, 10);

            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            expect(() => o.addPins(0)).not.toThrow();
            expect(o.pinsSum()).toBe(0);
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);

            expect(() => o.addPins(0)).not.toThrow();
            expect(o.pinsSum()).toBe(0);
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(true);
            expect(() => o.addPins(1)).toThrow('your turn is over');
        });

        test("more than 10 pins down", () => {
            let o = new PlayerTurn(false, 10);

            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            expect(() => o.addPins(6)).not.toThrow();
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(6);

            expect(() => o.addPins(7)).toThrow('total pins down cannot exceed 10');
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(6);

            expect(() => o.addPins(1)).not.toThrow();
            expect(o.pinsSum()).toBe(7);
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(true);
            expect(() => o.addPins(1)).toThrow('your turn is over');
        });


        // 10th turn
        test("spare and 1 try on 10th turn", () => {
            let o = new PlayerTurn(true, 10); // last turn

            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            expect(() => o.addPins(9)).not.toThrow();
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(9);

            expect(() => o.addPins(1)).not.toThrow();
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(true);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(10);

            expect(() => o.addPins(5)).not.toThrow();
            expect(o.pinsSum()).toBe(15);
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(true);
            expect(o.isOver()).toBe(true);
            expect(() => o.addPins(1)).toThrow('your turn is over');
        });


        test("spare and strike on 10th turn", () => {
            let o = new PlayerTurn(true, 10); // last turn

            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            expect(() => o.addPins(9)).not.toThrow();
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(9);

            expect(() => o.addPins(1)).not.toThrow();
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(true);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(10);

            expect(() => o.addPins(10)).not.toThrow();
            expect(o.pinsSum()).toBe(20);
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(true);
            expect(o.isOver()).toBe(true);
            expect(() => o.addPins(1)).toThrow('your turn is over');
        });

        test("3 strikes on 10th turn", () => {
            let o = new PlayerTurn(true, 10); // last turn

            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            expect(() => o.addPins(10)).not.toThrow();
            expect(o.isStrike()).toBe(true);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(10);

            expect(() => o.addPins(10)).not.toThrow();
            expect(o.isStrike()).toBe(true);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(20);

            expect(() => o.addPins(10)).not.toThrow();
            expect(o.pinsSum()).toBe(30);
            expect(o.isStrike()).toBe(true);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(true);
            expect(() => o.addPins(1)).toThrow('your turn is over');
        });



        test("first strike and 2 tries", () => {
            let o = new PlayerTurn(true, 10); // last turn

            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            expect(() => o.addPins(10)).not.toThrow();
            expect(o.isStrike()).toBe(true);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(10);

            expect(() => o.addPins(4)).not.toThrow();
            expect(o.isStrike()).toBe(true);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(14);

            expect(() => o.addPins(5)).not.toThrow();
            expect(o.pinsSum()).toBe(19);
            expect(o.isStrike()).toBe(true);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(true);
            expect(() => o.addPins(1)).toThrow('your turn is over');
        });



        test("2 strikes and 1 try on 10th turn", () => {
            let o = new PlayerTurn(true, 10); // last turn

            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            expect(() => o.addPins(10)).not.toThrow();
            expect(o.isStrike()).toBe(true);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(10);

            expect(() => o.addPins(10)).not.toThrow();
            expect(o.isStrike()).toBe(true);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(20);

            expect(() => o.addPins(2)).not.toThrow();
            expect(o.pinsSum()).toBe(22);
            expect(o.isStrike()).toBe(true);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(true);
            expect(() => o.addPins(1)).toThrow('your turn is over');
        });


        test("strike and spare on 10th turn", () => {
            let o = new PlayerTurn(true, 10); // last turn

            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            expect(() => o.addPins(10)).not.toThrow();
            expect(o.isStrike()).toBe(true);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(10);

            expect(() => o.addPins(8)).not.toThrow();
            expect(o.isStrike()).toBe(true);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(18);

            expect(() => o.addPins(2)).not.toThrow();
            expect(o.pinsSum()).toBe(20);
            expect(o.isStrike()).toBe(true);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(true);
            expect(() => o.addPins(1)).toThrow('your turn is over');
        });


        test("more than 10 pins down on 10th turn", () => {
            let o = new PlayerTurn(true, 10); // last turn

            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            expect(() => o.addPins(9)).not.toThrow();
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(9);

            expect(() => o.addPins(9)).toThrow('total pins down cannot exceed 10');
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(9);

            expect(() => o.addPins(0)).not.toThrow();
            expect(o.pinsSum()).toBe(9);
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(true);
            expect(() => o.addPins(1)).toThrow('your turn is over');
        });
 


        test("2 tries on 10th turn", () => {
            let o = new PlayerTurn(true, 10); // last turn

            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            expect(() => o.addPins(4)).not.toThrow();
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(4);

            expect(() => o.addPins(1)).not.toThrow();
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(true);
            expect(o.pinsSum()).toBe(5);
            
            expect(() => o.addPins(1)).toThrow('your turn is over');
        });


        test("(2) more than 10 pins down on 10th turn", () => {
            let o = new PlayerTurn(true, 10); // last turn

            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            expect(() => o.addPins(10)).not.toThrow();
            expect(o.isStrike()).toBe(true);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(10);

            expect(() => o.addPins(9)).not.toThrow();
            expect(o.isStrike()).toBe(true);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(19);

            expect(() => o.addPins(9)).toThrow('total pins down cannot exceed 10');
            expect(o.pinsSum()).toBe(19);
            expect(o.isStrike()).toBe(true);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);

            expect(() => o.addPins(0)).not.toThrow();
            expect(o.pinsSum()).toBe(19);
            expect(o.isStrike()).toBe(true);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(true);
            expect(() => o.addPins(1)).toThrow('your turn is over');
        });


        test("unexpected input", () => {
            let o = new PlayerTurn(false, 10);
           
           for(let t = 0; t<2 ;t++) { 
                let sum = 0;
                for(let i=0;i<3;i++) {
                    if (i==1) {
                        expect(() => o.addPins(1)).not.toThrow();
                        sum = sum + 1;
                    }

                    expect(o.pinsSum()).toBe(sum);

                    expect(() => o.addPins(-1)).toThrow('invalid input');
                    expect(o.pinsSum()).toBe(sum);


                    expect(() => o.addPins(3.14)).toThrow('invalid input');
                    expect(o.pinsSum()).toBe(sum);


                    expect(() => o.addPins(null)).toThrow('invalid input');
                    expect(o.pinsSum()).toBe(sum);


                    expect(() => o.addPins(undefined)).toThrow('invalid input');
                    expect(o.pinsSum()).toBe(sum);


                    expect(() => o.addPins(NaN)).toThrow('invalid input');
                    expect(o.pinsSum()).toBe(sum);

                    expect(() => o.addPins(11)).toThrow('invalid input');
                    expect(o.pinsSum()).toBe(sum);
                }
                o = new PlayerTurn(true, 10);
           }
        });

    });
    describe("Test addPins() and pinsSum() with 9 pins", () => {

        // 1st to 9th turn
        test("8 pins down", () => {
            let o = new PlayerTurn(false, 9);

            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            expect(() => o.addPins(3)).not.toThrow();

            expect(o.pinsSum()).toBe(3);
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);

            expect(() => o.addPins(5)).not.toThrow();

            expect(o.pinsSum()).toBe(3 + 5);
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(true);

            expect(() => o.addPins(1)).toThrow('your turn is over');
        });


        test("1 strike", () => {
            let o = new PlayerTurn(false, 9);
            
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            expect(() => o.addPins(9)).not.toThrow();

            expect(o.pinsSum()).toBe(9);
            expect(o.isStrike()).toBe(true);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(true);
            expect(() => o.addPins(1)).toThrow('your turn is over');
        });

        test("1 spare", () => {
            let o = new PlayerTurn(false, 9);
            
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            expect(() => o.addPins(6)).not.toThrow();
            expect(o.pinsSum()).toBe(6);
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);

            expect(() => o.addPins(3)).not.toThrow();
            expect(o.pinsSum()).toBe(9);
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(true);
            expect(o.isOver()).toBe(true);
            expect(() => o.addPins(1)).toThrow('your turn is over');

        });
        test("0 and spare", () => {
            let o = new PlayerTurn(false, 9);
            
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            expect(() => o.addPins(0)).not.toThrow();
            expect(o.pinsSum()).toBe(0);
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);

            expect(() => o.addPins(9)).not.toThrow();
            expect(o.pinsSum()).toBe(9);
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(true);
            expect(o.isOver()).toBe(true);
            expect(() => o.addPins(1)).toThrow('your turn is over');
        });


        test("more than 9 pins down", () => {
            let o = new PlayerTurn(false, 9);

            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            expect(() => o.addPins(6)).not.toThrow();
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(6);

            expect(() => o.addPins(7)).toThrow('total pins down cannot exceed 9');
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(6);

            expect(() => o.addPins(1)).not.toThrow();
            expect(o.pinsSum()).toBe(7);
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(true);
            expect(() => o.addPins(1)).toThrow('your turn is over');
        });


        // 10th turn
        test("spare and 1 try on 10th turn", () => {
            let o = new PlayerTurn(true, 9); // last turn

            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            expect(() => o.addPins(8)).not.toThrow();
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(8);

            expect(() => o.addPins(1)).not.toThrow();
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(true);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(9);

            expect(() => o.addPins(6)).not.toThrow();
            expect(o.pinsSum()).toBe(15);
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(true);
            expect(o.isOver()).toBe(true);
            expect(() => o.addPins(1)).toThrow('your turn is over');
        });


        test("spare and strike on 10th turn", () => {
            let o = new PlayerTurn(true, 9); // last turn

            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            expect(() => o.addPins(8)).not.toThrow();
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(8);

            expect(() => o.addPins(1)).not.toThrow();
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(true);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(9);

            expect(() => o.addPins(9)).not.toThrow();
            expect(o.pinsSum()).toBe(18);
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(true);
            expect(o.isOver()).toBe(true);
            expect(() => o.addPins(1)).toThrow('your turn is over');
        });

        test("3 strikes on 10th turn", () => {
            let o = new PlayerTurn(true, 9); // last turn

            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            expect(() => o.addPins(9)).not.toThrow();
            expect(o.isStrike()).toBe(true);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(9);

            expect(() => o.addPins(9)).not.toThrow();
            expect(o.isStrike()).toBe(true);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(18);

            expect(() => o.addPins(9)).not.toThrow();
            expect(o.pinsSum()).toBe(27);
            expect(o.isStrike()).toBe(true);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(true);
            expect(() => o.addPins(1)).toThrow('your turn is over');
        });

        test("first strike and 2 tries", () => {
            let o = new PlayerTurn(true, 9); // last turn

            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            expect(() => o.addPins(9)).not.toThrow();
            expect(o.isStrike()).toBe(true);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(9);

            expect(() => o.addPins(4)).not.toThrow();
            expect(o.isStrike()).toBe(true);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(13);

            expect(() => o.addPins(2)).not.toThrow();
            expect(o.pinsSum()).toBe(15);
            expect(o.isStrike()).toBe(true);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(true);
            expect(() => o.addPins(1)).toThrow('your turn is over');
        });



        test("2 strikes and 1 try on 10th turn", () => {
            let o = new PlayerTurn(true, 9); // last turn

            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            expect(() => o.addPins(9)).not.toThrow();
            expect(o.isStrike()).toBe(true);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(9);

            expect(() => o.addPins(9)).not.toThrow();
            expect(o.isStrike()).toBe(true);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(18);

            expect(() => o.addPins(2)).not.toThrow();
            expect(o.pinsSum()).toBe(20);
            expect(o.isStrike()).toBe(true);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(true);
            expect(() => o.addPins(1)).toThrow('your turn is over');
        });


        test("strike and spare on 10th turn", () => {
            let o = new PlayerTurn(true, 9); // last turn

            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            expect(() => o.addPins(9)).not.toThrow();
            expect(o.isStrike()).toBe(true);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(9);

            expect(() => o.addPins(8)).not.toThrow();
            expect(o.isStrike()).toBe(true);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(17);

            expect(() => o.addPins(1)).not.toThrow();
            expect(o.pinsSum()).toBe(18);
            expect(o.isStrike()).toBe(true);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(true);
            expect(() => o.addPins(1)).toThrow('your turn is over');
        });


        test("more than 9 pins down on 10th turn", () => {
            let o = new PlayerTurn(true, 9); // last turn

            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            expect(() => o.addPins(8)).not.toThrow();
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(8);

            expect(() => o.addPins(5)).toThrow('total pins down cannot exceed 9');
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(8);

            expect(() => o.addPins(0)).not.toThrow();
            expect(o.pinsSum()).toBe(8);
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(true);
            expect(() => o.addPins(1)).toThrow('your turn is over');
        });
 


        test("2 tries on 10th turn", () => {
            let o = new PlayerTurn(true, 9); // last turn

            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            expect(() => o.addPins(4)).not.toThrow();
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(4);

            expect(() => o.addPins(1)).not.toThrow();
            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(true);
            expect(o.pinsSum()).toBe(5);
            
            expect(() => o.addPins(1)).toThrow('your turn is over');
        });


        test("(2) more than 9 pins down on 10th turn", () => {
            let o = new PlayerTurn(true, 9); // last turn

            expect(o.isStrike()).toBe(false);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            expect(() => o.addPins(9)).not.toThrow();
            expect(o.isStrike()).toBe(true);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(9);

            expect(() => o.addPins(8)).not.toThrow();
            expect(o.isStrike()).toBe(true);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);
            expect(o.pinsSum()).toBe(17);

            expect(() => o.addPins(7)).toThrow('total pins down cannot exceed 9');
            expect(o.pinsSum()).toBe(17);
            expect(o.isStrike()).toBe(true);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(false);

            expect(() => o.addPins(0)).not.toThrow();
            expect(o.pinsSum()).toBe(17);
            expect(o.isStrike()).toBe(true);
            expect(o.isSpare()).toBe(false);
            expect(o.isOver()).toBe(true);
            expect(() => o.addPins(1)).toThrow('your turn is over');
        });
    });
});
