import { BowlingGame } from "./BowlingGame"

let game1 = new BowlingGame();
console.log(game1.getTitle());
console.log(game1.getScore());
game1.scorePoints(0, 5);
console.log(game1.getScore());
game1.scorePoints(1, 3);
console.log(game1.getScore());
