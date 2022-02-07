import { Game } from "../src/Game";
import { Player } from "../src/Player";


function callback() { console.log("callback"); }

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
        test("Game(3, 10)", () => {
            let game : Game = new Game(3, 10);
            expect(game["players"].length).toBe(3);
            expect(game["nbPins"]).toBe(10);
        });
        test("Game(3, 9)", () => {
            let game : Game = new Game(3, 9);
            expect(game["players"].length).toBe(3);
            expect(game["nbPins"]).toBe(9);
            game["players"].forEach(p => {
                expect(p["nbPins"]).toEqual(9);
            });
        });
    });

    describe("Game behavior", () => {
        test("3 players", () => {
            const game = new Game(3, 10)
            const players = game["players"]
            expect(players[0].getName()).toBe("Joueur 1")
            expect(players[1].getName()).toBe("Joueur 2")
            expect(players[2].getName()).toBe("Joueur 3")
        });

        test("Start playing", () => {
            const game = new Game(3, 10)
            game.startPlaying()
            const players = game["players"]
            expect(players[0].isPlaying()).toBe(true)
            expect(players[1].isPlaying()).toBe(false)
            expect(players[2].isPlaying()).toBe(false)
        });

        test("Make player play", () => {
            const game = new Game(3, 10)
            game.startPlaying()
            const players = game["players"]
            players[0].makeTry(5)
            players[0].makeTry(3)
            game.nextPlayer()
            expect(players[0].isPlaying()).toBe(false)
            expect(players[1].isPlaying()).toBe(true)
            expect(players[2].isPlaying()).toBe(false)
            players[1].makeTry(5)
            players[1].makeTry(3)
            game.nextPlayer()
            expect(players[0].isPlaying()).toBe(false)
            expect(players[1].isPlaying()).toBe(false)
            expect(players[2].isPlaying()).toBe(true)
            players[2].makeTry(5)
            players[2].makeTry(3)
            game.nextPlayer()
            expect(players[0].isPlaying()).toBe(true)
            expect(players[1].isPlaying()).toBe(false)
            expect(players[2].isPlaying()).toBe(false)
        });

        test("Game ending 1 winner" , () => {
            const game = new Game(3, 10)
            game.startPlaying()
            const players = game["players"]
            for(let turnInd = 0; turnInd < 10; turnInd = turnInd + 1)
            {
                for(let playerInd = 0; playerInd < 3; playerInd = playerInd + 1)
                {
                    players[playerInd].makeTry(1 + playerInd * 2)
                    players[playerInd].makeTry(3)
                    game.nextPlayer()
                }
            }
            expect(game.hasEnded()).toBe(true);
            expect(game.getWinners().length).toBe(1)
            expect(game.getWinners()[0].getName()).toBe("Joueur 3");
       }); 

        test("Game ending 2 winners" , () => {
                const game = new Game(3, 10)
                game.startPlaying()
                const players = game["players"]
                for(let turnInd = 0; turnInd < 10; turnInd = turnInd + 1)
                {
                    for(let playerInd = 0; playerInd < 3; playerInd = playerInd + 1)
                    {
                        if (playerInd != 0)
                            players[playerInd].makeTry(2)
                        else
                            players[playerInd].makeTry(1)
                        players[playerInd].makeTry(3)
                        game.nextPlayer()
                    }
                }
                expect(game.hasEnded()).toBe(true)
                expect(game.getWinners().length).toBe(2)
                expect(game.getWinners()[0].getName()).toBe("Joueur 2")
                expect(game.getWinners()[1].getName()).toBe("Joueur 3")
        }); 
    });
});
