import { Game } from "../src/Game";


describe("Test Game class", () => {
    describe("Game constructor", () => {
        test("Game(NaN, 5)", () => {
            expect(() => { new Game(NaN, 5); }).toThrow("Invalid parameter : nbPlayers must be a number");
        });
        test("Game(5, NaN)", () => {
            expect(() => { new Game(5, NaN); }).toThrow("Invalid parameter : nbPins must be a number");
        });
        test("Game(NaN, NaN)", () => {
            expect(() => { new Game(NaN, NaN); }).toThrow("Invalid parameter : nbPlayers must be a number");
        });
        test("Game(-1, 5)", () => {
            expect(() => { new Game(-1, 5); }).toThrow("Invalid parameter : nbPlayers must be positive");
        });
        test("Game(5, -1)", () => {
            expect(() => { new Game(5, -1); }).toThrow("Invalid parameter : nbPins must be positive");
        });
        test("Game(-1, -1)", () => {
            expect(() => { new Game(-1, -1); }).toThrow("Invalid parameter : nbPlayers must be positive");
        });
    });
});