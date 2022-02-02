/**
 * @jest-environment jsdom
 */

import fs from 'fs'
import path from 'path'

const html = fs.readFileSync(path.resolve(__dirname, "../src/index.html"))

beforeEach(() => {
    document.documentElement.innerHTML = html.toString()
});

describe('HTML', () => {
    test('Title', () => {
        expect(document.title).toBe("Bowling-App")
    })
})