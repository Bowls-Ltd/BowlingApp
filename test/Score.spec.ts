import { Score } from "../src/Score"

describe('Score tests', () => {
    test('Default constructor', () => {
        let score = new Score()
        expect(score.getTotal()).toBe(0)
    })
})