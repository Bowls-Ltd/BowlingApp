import { PlayerTurn } from "../src/PlayerTurn";

describe.skip("Test class PlayerTurn", () => {

    describe("Test addPins() and pinsSum()", () => {

        // 1st to 9th turn
        test("8 pins down", () => {
            let o = PlayerTurn(false);

            expect(o.IsStrike()).toBe(false);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            o.addPins(3);

            expect(o.pinsSum()).toBe(3);
            expect(o.IsStrike()).toBe(false);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(false);

            o.addPins(5);

            expect(o.pinsSum()).toBe(3+5);
            expect(o.IsStrike()).toBe(false);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(true);

            expect(() => o.addPins(1)).toThrow('cannot play more than twice');
        });


        test("1 strike", () => {
            let o = PlayerTurn(false);
            
            expect(o.IsStrike()).toBe(false);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            o.addPins(10);

            expect(o.pinsSum()).toBe(10);
            expect(o.IsStrike()).toBe(true);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(true);
            expect(() => o.addPins(1)).toThrow('cannot play more than twice');
        });

        test("1 spare", () => {
            let o = PlayerTurn(false);
            
            expect(o.IsStrike()).toBe(false);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            o.addPins(6);
            expect(o.pinsSum()).toBe(6);
            expect(o.IsStrike()).toBe(false);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(false);

            o.addPins(4);
            expect(o.pinsSum()).toBe(10);
            expect(o.IsStrike()).toBe(false);
            expect(o.IsSpare()).toBe(true);
            expect(o.IsOver()).toBe(true);
            expect(() => o.addPins(1)).toThrow('cannot play more than twice');

        });


        test("0 and spare", () => {
            let o = PlayerTurn(false);
            
            expect(o.IsStrike()).toBe(false);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            o.addPins(0);
            expect(o.pinsSum()).toBe(0);
            expect(o.IsStrike()).toBe(false);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(false);

            o.addPins(10);
            expect(o.pinsSum()).toBe(10);
            expect(o.IsStrike()).toBe(false);
            expect(o.IsSpare()).toBe(true);
            expect(o.IsOver()).toBe(true);
            expect(() => o.addPins(1)).toThrow('cannot play more than twice');
        });


        test("0 skittle down", () => {
            let o = PlayerTurn(false);

            expect(o.IsStrike()).toBe(false);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            o.addPins(0);
            expect(o.pinsSum()).toBe(0);
            expect(o.IsStrike()).toBe(false);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(false);

            o.addPins(0);
            expect(o.pinsSum()).toBe(0);
            expect(o.IsStrike()).toBe(false);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(true);
            expect(() => o.addPins(1)).toThrow('cannot play more than twice');
        });

        test("more than 10 pins down", () => {
            let o = PlayerTurn(false);

            expect(o.IsStrike()).toBe(false);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            o.addPins(6);
            expect(o.IsStrike()).toBe(false);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(false);
            expect(o.pinsSum()).toBe(6);

            expect(() => o.addPins(7)).toThrow('total pins down cannot exceed 10');
            expect(o.IsStrike()).toBe(false);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(false);
            expect(o.pinsSum()).toBe(6);

            o.addPins(1);
            expect(o.pinsSum()).toBe(7);
            expect(o.IsStrike()).toBe(false);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(true);
            expect(() => o.addPins(1)).toThrow('cannot play more than twice');
        });


        // 10th turn
        test("spare and 1 try on 10th turn", () => {
            let o = PlayerTurn(true); // last turn

            expect(o.IsStrike()).toBe(false);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            o.addPins(9);
            expect(o.IsStrike()).toBe(false);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(false);
            expect(o.pinsSum()).toBe(9);

            o.addPins(1);
            expect(o.IsStrike()).toBe(false);
            expect(o.IsSpare()).toBe(true);
            expect(o.IsOver()).toBe(false);
            expect(o.pinsSum()).toBe(10);

            o.addPins(5);
            expect(o.pinsSum()).toBe(15);
            expect(o.IsStrike()).toBe(false);
            expect(o.IsSpare()).toBe(true);
            expect(o.IsOver()).toBe(true);
            expect(() => o.addPins(1)).toThrow('cannot play more than thrice');
        });


        test("spare and strike on 10th turn", () => {
            let o = PlayerTurn(true); // last turn

            expect(o.IsStrike()).toBe(false);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            o.addPins(9);
            expect(o.IsStrike()).toBe(false);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(false);
            expect(o.pinsSum()).toBe(9);

            o.addPins(1);
            expect(o.IsStrike()).toBe(false);
            expect(o.IsSpare()).toBe(true);
            expect(o.IsOver()).toBe(false);
            expect(o.pinsSum()).toBe(10);

            o.addPins(10);
            expect(o.pinsSum()).toBe(20);
            expect(o.IsStrike()).toBe(false);
            expect(o.IsSpare()).toBe(true);
            expect(o.IsOver()).toBe(true);
            expect(() => o.addPins(1)).toThrow('cannot play more than thrice');
        });

        test("3 strikes on 10th turn", () => {
            let o = PlayerTurn(true); // last turn

            expect(o.IsStrike()).toBe(false);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            o.addPins(10);
            expect(o.IsStrike()).toBe(true);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(false);
            expect(o.pinsSum()).toBe(10);

            o.addPins(10);
            expect(o.IsStrike()).toBe(true);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(false);
            expect(o.pinsSum()).toBe(20);

            o.addPins(10);
            expect(o.pinsSum()).toBe(30);
            expect(o.IsStrike()).toBe(true);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(true);
            expect(() => o.addPins(1)).toThrow('cannot play more than thrice');
        });



        test("first strike and 2 tries", () => {
            let o = PlayerTurn(true); // last turn

            expect(o.IsStrike()).toBe(false);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            o.addPins(10);
            expect(o.IsStrike()).toBe(true);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(false);
            expect(o.pinsSum()).toBe(10);

            o.addPins(4);
            expect(o.IsStrike()).toBe(true);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(false);
            expect(o.pinsSum()).toBe(14);

            o.addPins(5);
            expect(o.pinsSum()).toBe(19);
            expect(o.IsStrike()).toBe(true);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(true);
            expect(() => o.addPins(1)).toThrow('cannot play more than thrice');
        });



        test("2 strikes and 1 try on 10th turn", () => {
            let o = PlayerTurn(true); // last turn

            expect(o.IsStrike()).toBe(false);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            o.addPins(10);
            expect(o.IsStrike()).toBe(true);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(false);
            expect(o.pinsSum()).toBe(10);

            o.addPins(10);
            expect(o.IsStrike()).toBe(true);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(false);
            expect(o.pinsSum()).toBe(20);

            o.addPins(2);
            expect(o.pinsSum()).toBe(22);
            expect(o.IsStrike()).toBe(true);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(true);
            expect(() => o.addPins(1)).toThrow('cannot play more than thrice');
        });


        test("strike and spare on 10th turn", () => {
            let o = PlayerTurn(true); // last turn

            expect(o.IsStrike()).toBe(false);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            o.addPins(10);
            expect(o.IsStrike()).toBe(true);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(false);
            expect(o.pinsSum()).toBe(10);

            o.addPins(8);
            expect(o.IsStrike()).toBe(true);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(false);
            expect(o.pinsSum()).toBe(18);

            o.addPins(2);
            expect(o.pinsSum()).toBe(20);
            expect(o.IsStrike()).toBe(true);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(true);
            expect(() => o.addPins(1)).toThrow('cannot play more than thrice');
        });


        test("more than 10 pins down on 10th turn", () => {
            let o = PlayerTurn(true); // last turn

            expect(o.IsStrike()).toBe(false);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            o.addPins(9);
            expect(o.IsStrike()).toBe(false);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(false);
            expect(o.pinsSum()).toBe(9);

            expect(() => o.addPins(9)).toThrow('total pins down cannot exceed 10');
            expect(o.IsStrike()).toBe(false);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(false);
            expect(o.pinsSum()).toBe(9);

            o.addPins(0);
            expect(o.pinsSum()).toBe(9);
            expect(o.IsStrike()).toBe(false);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(true);
            expect(() => o.addPins(1)).toThrow('cannot play more than thrice');
        });
 



        test("2 tries on 10th turn", () => {
            let o = PlayerTurn(true); // last turn

            expect(o.IsStrike()).toBe(false);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            o.addPins(4);
            expect(o.IsStrike()).toBe(false);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(false);
            expect(o.pinsSum()).toBe(4);

            o.addPins(1);
            expect(o.IsStrike()).toBe(false);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(true);
            expect(o.pinsSum()).toBe(5);
            
            expect(() => o.addPins(1)).toThrow('cannot play more than twice');
        });


        test("(2) more than 10 pins down on 10th turn", () => {
            let o = PlayerTurn(true); // last turn

            expect(o.IsStrike()).toBe(false);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(false);
            expect(o.pinsSum()).toBe(0);

            o.addPins(10);
            expect(o.IsStrike()).toBe(true);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(false);
            expect(o.pinsSum()).toBe(10);

            o.addPins(9);
            expect(o.IsStrike()).toBe(true);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(false);
            expect(o.pinsSum()).toBe(19);

            expect(() => o.addPins(9)).toThrow('total pins down cannot exceed 10');
            expect(o.pinsSum()).toBe(19);
            expect(o.IsStrike()).toBe(true);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(false);

            o.addPins(0);
            expect(o.pinsSum()).toBe(19);
            expect(o.IsStrike()).toBe(true);
            expect(o.IsSpare()).toBe(false);
            expect(o.IsOver()).toBe(true);
            expect(() => o.addPins(1)).toThrow('cannot play more than twice');
        });


        test("unexpected input", () => {
            let o = PlayerTurn(false);
           
           for(let t = 0; t<2 ;t++) { 
                let sum = 0;
                for(let i=0;i<3;i++) {
                    if (i==1) {
                        o.addPins(1);
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
                o = PlayerTurn(true);
           }
        });

    });

});
