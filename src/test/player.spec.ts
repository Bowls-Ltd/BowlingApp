import { Player } from "../Player";

describe('Test Player.ts', () => {

    test('should say', () => {
        const p1 = new Player("Charly");
        expect(p1.getName()).toBe('Charly');
    })
});