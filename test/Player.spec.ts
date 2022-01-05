import { Player } from "../src/Player";

describe("Test Player class", () => {
    describe("Player.playTurn() function", () => {
        test("Adds a turn to the Player's turn", () => {
            let player = new Player("Toto");
            expect(player.getTurns().length).toBe(0);
            player.playTurn();
            expect(player.getTurns().length).toBe(1);
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
            // player.getTurns() = {};
            expect(player.computeAccumulatedScores()).toBe([]);
        });
        test("One turn with a spare (not enough shots for the spare)", () => {
            let player = new Player("Toto");
            player.getTurns() = {{8,2}};
            expect(player.computeAccumulatedScores()).toBe([10]);
        });
        test("One turn with a strike (not enough shots for the strike)", () => {
            let player = new Player("Toto");
            player.getTurns() = {{10}};
            expect(player.computeAccumulatedScores()).toBe([10]);
        });
        test("Two turns with two strikes (not enough shots for the strikes)", () => {
            let player = new Player("Toto");
            player.getTurns() = {{10}, {10}};
            expect(player.computeAccumulatedScores()).toBe([20, 10]);
        });
        test("Several turns with a spare", () => {
            let player = new Player("Toto");
            player.getTurns() = {{5,1}, {8,2}, {4,5}};
            expect(player.computeAccumulatedScores()).toBe([6, 20, 29]);
        });
        test("Several turns with a strike", () => {
            let player = new Player("Toto");
            player.getTurns() = {{10}, {7,2}, {4,5}};
            expect(player.computeAccumulatedScores()).toBe([6, 20, 29]);
        });
    });
    describe("Player.getNextShotIdx() function", () => {
        test("Turns empty", () => {
            let player = new Player("Toto");
            player.getTurns() = {};
            expect(player.getNextShotIdx(0, 0)).toBe([-1, -1]);
            player.getTurns() = {{0,0}, {0,0}, {0,0}};

        });
        test("No next shot", () => {
            let player = new Player("Toto");
            player.getTurns() = {{0,0}};
            expect(player.getNextShotIdx(0, 1)).toBe([-1, -1]);
        });
        test("Valid next shot (same turn)", () => {
            let player = new Player("Toto");
            player.getTurns() = {{0,0}, {0,0}};
            expect(player.getNextShotIdx(0, 0)).toBe([0, 1]);
        });
        test("Valid next shot (next turn)", () => {
            let player = new Player("Toto");
            player.getTurns() = {{0,0}, {0,0}};
            expect(player.getNextShotIdx(0, 1)).toBe([1, 0]);
        });
    });
});
