import {Player} from "../src/Player";
import {PlayerTurn} from "../src/PlayerTurn";


function turnsFromArray(turns: Array<Array<number>>): Array<PlayerTurn> {
    let playerTurns: Array<PlayerTurn> = Array<PlayerTurn>(turns.length);
    for (let i = 0; i < turns.length; i++) {
        playerTurns[i] = new PlayerTurn(false);
        playerTurns[i]['shots'] = turns[i];
    }
    return playerTurns;
}

describe("Test Player class", () => {
    describe.skip("Player.playTurn() function", () => {
        test("Adds a turn to the Player's turn", () => {
            let player = new Player("Toto");
            expect(player.getTurns().length).toStrictEqual(0);
            player.playTurn();
            expect(player.getTurns().length).toStrictEqual(1);
        });
        test("Player tries to play 11 turns", () => {
            let player = new Player("Toto");
            for (let i = 0; i < 10; i++)
                player.playTurn();
            expect(() => player.playTurn()).toThrow("cannot play more than 10 turns");
        });
    });
    describe("Player.computeAccumulatedScores() function", () => {
        test("No turns played", () => {
            let player = new Player("Toto");
            // player['turns'] = {};
            expect(player.computeAccumulatedScores()).toStrictEqual([]);
        });
        test("One turn with a spare (not enough shots for the spare)", () => {
            let player = new Player("Toto");
            player['turns'] = turnsFromArray([[8, 2]]);
            expect(player.computeAccumulatedScores()).toStrictEqual([10]);
        });
        test("One turn with a strike (not enough shots for the strike)", () => {
            let player = new Player("Toto");
            player['turns'] = turnsFromArray([[10]]);
            expect(player.computeAccumulatedScores()).toStrictEqual([10]);
        });
        test("Two turns with two strikes (not enough shots for the strikes)", () => {
            let player = new Player("Toto");
            player['turns'] = turnsFromArray([[10], [10]]);
            expect(player.computeAccumulatedScores()).toStrictEqual([20, 30]);
        });
        test("Several turns with a spare", () => {
            let player = new Player("Toto");
            player['turns'] = turnsFromArray([[5, 1], [8, 2], [4, 5]]);
            expect(player.computeAccumulatedScores()).toStrictEqual([6, 20, 29]);
        });
        test("Several turns with a strike", () => {
            let player = new Player("Toto");
            player['turns'] = turnsFromArray([[10], [7, 2], [4, 5]]);
            expect(player.computeAccumulatedScores()).toStrictEqual([19, 28, 37]);
        });
    });
    describe("Player.getNextShotIdx() function", () => {
        test("Turns empty", () => {
            let player = new Player("Toto");
            player['turns'] = turnsFromArray([[]]);
            expect(player['getNextShotIdx'](0, 0)).toStrictEqual([-1, -1]);
            // player['turns'] = turnsFromArray([[0,0], [0,0], [0,0]]);
        });
        test("No next shot", () => {
            let player = new Player("Toto");
            player['turns'] = turnsFromArray([[0, 0]]);
            expect(player['getNextShotIdx'](0, 1)).toStrictEqual([-1, -1]);
        });
        test("Valid next shot (same turn)", () => {
            let player = new Player("Toto");
            player['turns'] = turnsFromArray([[0, 0], [0, 0]]);
            expect(player['getNextShotIdx'](0, 0)).toStrictEqual([0, 1]);
        });
        test("Valid next shot (next turn)", () => {
            let player = new Player("Toto");
            player['turns'] = turnsFromArray([[0, 0], [0, 0]]);
            expect(player['getNextShotIdx'](0, 1)).toStrictEqual([1, 0]);
        });
    });
});
