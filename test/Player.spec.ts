import {Player} from "../src/Player";
import {PlayerTurn} from "../src/PlayerTurn";


function turnsFromArray(turns      : Array<Array<number>>,
                        isLastTurn : Array<boolean> = null,
                        nbPins     : number         = 10)
                        : Array<PlayerTurn> 
{
    if (isLastTurn === null) {
        isLastTurn = turns.map(() => false);
        if (turns.length === 10)
            isLastTurn[9] = true;
    }
    return turns.map((turn: Array<number>, index: number) => {
        let playerTurn = new PlayerTurn(isLastTurn[index], nbPins);
        playerTurn['shots'] = turn;
        return playerTurn;
    });
}

describe("Test Player class", () => {
    describe("Player.playTurn() function", () => {
        test("Adds a turn to the Player's turn", () => {
            let player = new Player("Toto", 10);
            expect(player.getTurns().length).toStrictEqual(0);
            player.play();
            player.makeTry(4);
            player.makeTry(3);
            expect(player.getTurns().length).toStrictEqual(1);
        });
        test("Player tries to play 11 turns", () => {
            let player = new Player("Toto", 10);
            for (let i = 0; i < 10; i++) {
                player.play();
                player.makeTry(4);
                player.makeTry(3);
            }
            player.play();
            expect(() => player.makeTry(5)).toThrow("cannot play more than 10 turns");
        });
    });
    describe("Player.computeAccumulatedScores() function", () => {
        test("No turns played", () => {
            let player = new Player("Toto", 10);
            // player['turns'] = {};
            expect(player.computeAccumulatedScores()).toStrictEqual([]);
            expect(player.hasEnded()).toBe(false);
        });
        test("One turn with a spare (not enough shots for the spare)", () => {
            let player = new Player("Toto", 10);
            player['turns'] = turnsFromArray([[8, 2]]);
            expect(player.computeAccumulatedScores()).toStrictEqual([10]);
            expect(player.hasEnded()).toBe(false);
        });
        test("One turn with a strike (not enough shots for the strike)", () => {
            let player = new Player("Toto", 10);
            player['turns'] = turnsFromArray([[10]]);
            expect(player.computeAccumulatedScores()).toStrictEqual([10]);
            expect(player.hasEnded()).toBe(false);
        });
        test("Two turns with two strikes (not enough shots for the strikes)", () => {
            let player = new Player("Toto", 10);
            player['turns'] = turnsFromArray([[10], [10]]);
            expect(player.computeAccumulatedScores()).toStrictEqual([20, 30]);
            expect(player.hasEnded()).toBe(false);
        });
        test("Several turns with a spare", () => {
            let player = new Player("Toto", 10);
            player['turns'] = turnsFromArray([[5, 1], [8, 2], [4, 5]]);
            expect(player.computeAccumulatedScores()).toStrictEqual([6, 20, 29]);
            expect(player.hasEnded()).toBe(false);
        });
        test("Several turns with a strike", () => {
            let player = new Player("Toto", 10);
            player['turns'] = turnsFromArray([[10], [7, 2], [4, 5]]);
            expect(player.computeAccumulatedScores()).toStrictEqual([19, 28, 37]);
            expect(player.hasEnded()).toBe(false);
        });
        test("10th turn: spare then strike", () => {
            let player = new Player("Toto", 10);
            player['turns'] = turnsFromArray([[10], [9, 1], [5, 5], [7,2], [10], [10], [10], [9, 0], [8, 2], [9, 1, 10]]);
            expect(player.computeAccumulatedScores()).toStrictEqual([20, 35, 52, 61, 91, 120, 139, 148, 167, 187]);
            expect(player.hasEnded()).toBe(true);
        });
        test("10th turn: strike then nothing", () => {
            let player = new Player("Toto", 10);
            player['turns'] = turnsFromArray([[10], [9, 1], [5, 5], [7,2], [10], [10], [10], [9, 0], [8, 2], [10, 2, 6]]);
            expect(player.computeAccumulatedScores()).toStrictEqual([20, 35, 52, 61, 91, 120, 139, 148, 168, 186]);
            expect(player.hasEnded()).toBe(true);
        });
        test("10th turn: strike then spare", () => {
            let player = new Player("Toto", 10);
            player['turns'] = turnsFromArray([[10], [9, 1], [5, 5], [7,2], [10], [10], [10], [9, 0], [8, 2], [10, 7, 3]]);
            expect(player.computeAccumulatedScores()).toStrictEqual([20, 35, 52, 61, 91, 120, 139, 148, 168, 188]);
            expect(player.hasEnded()).toBe(true);
        });
        test("10th turn: strike then strike then nothing", () => {
            let player = new Player("Toto", 10);
            player['turns'] = turnsFromArray([[10], [9, 1], [5, 5], [7,2], [10], [10], [10], [9, 0], [8, 2], [10, 10, 1]]);
            expect(player.computeAccumulatedScores()).toStrictEqual([20, 35, 52, 61, 91, 120, 139, 148, 168, 189]);
            expect(player.hasEnded()).toBe(true);
        });
        test("10th turn: strike then strike then strike", () => {
            let player = new Player("Toto", 10);
            player['turns'] = turnsFromArray([[10], [9, 1], [5, 5], [7,2], [10], [10], [10], [9, 0], [8, 2], [10, 10, 10]]);
            expect(player.computeAccumulatedScores()).toStrictEqual([20, 35, 52, 61, 91, 120, 139, 148, 168, 198]);
            expect(player.hasEnded()).toBe(true);
        });
        test("9th turn: strike = 2 next rolls (and not entire 10th frame)", () => {
            let player = new Player("Toto", 10);
            player['turns'] = turnsFromArray([[10], [9, 1], [5, 5], [7,2], [10], [10], [10], [9, 0], [10], [10, 10, 10]]);
            expect(player.computeAccumulatedScores()).toStrictEqual([20, 35, 52, 61, 91, 120, 139, 148, 178, 208]);
            expect(player.hasEnded()).toBe(true);
        });
    });
    describe("Player.getNextShotIdx() function", () => {
        test("Turns empty", () => {
            let player = new Player("Toto", 10);
            player['turns'] = turnsFromArray([[]]);
            expect(player['getNextShotIdx'](0, 0)).toStrictEqual(null);
        });
        test("No next shot", () => {
            let player = new Player("Toto", 10);
            player['turns'] = turnsFromArray([[0, 0]]);
            expect(player['getNextShotIdx'](0, 1)).toStrictEqual(null);
        });
        test("Valid next shot (same turn)", () => {
            let player = new Player("Toto", 10);
            player['turns'] = turnsFromArray([[0, 0], [0, 0]]);
            expect(player['getNextShotIdx'](0, 0)).toStrictEqual([0, 1]);
        });
        test("Valid next shot (next turn)", () => {
            let player = new Player("Toto", 10);
            player['turns'] = turnsFromArray([[0, 0], [0, 0]]);
            expect(player['getNextShotIdx'](0, 1)).toStrictEqual([1, 0]);
        });
    });
});
