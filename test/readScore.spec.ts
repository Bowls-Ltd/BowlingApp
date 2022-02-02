import { readScore } from "../src/readScore";

describe("Test readScore()", () => {

    test("Null input", () => {
        let input = null 
        expect(() => readScore(input)).toThrow("Invalid input : score can't be empty")
    })

    test("No input", () => {
        let input = ""
        expect(() => readScore(input)).toThrow("Invalid input : score can't be empty")
    })

    test("Spaces", () => {
        let input = "  "
        expect(() => readScore(input)).toThrow("Invalid input : score can't be empty")
    })

    test("Negative number", () => {
        let input = "-1"
        expect(() => readScore(input)).toThrow("Invalid input : score must be within 0 and 10")
    })

    test("Number higher than 10", () => {
        let input = "30"
        expect(() => readScore(input)).toThrow("Invalid input : score must be within 0 and 10")
    })

    test("Not a number", () => {
        let input = "ci"
        expect(() => readScore(input)).toThrow("Invalid input : score must be a number")
    })

    test("Number only", () => {
        let input = "4"
        expect(readScore(input)).toBe(4)
    })

    test("Number preceded by a space", () => {
        let input = " 3"
        expect(readScore(input)).toBe(3)
    })

    test("Space preceded by a number", () => {
        let input = "8 "
        expect(readScore(input)).toBe(8)
    })

    test('Ten', () => {
        let input = "10"
        expect(readScore(input)).toBe(10)
    })

    test("Ten followed by spaces", () => {
        let input = "10  "
        expect(readScore(input)).toBe(10)
    })
});
