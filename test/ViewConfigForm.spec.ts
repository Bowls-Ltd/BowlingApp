/**
 * @jest-environment jsdom
 */

import fs from 'fs'
import path from 'path'

import {
    getByLabelText,
    getByText,
    getByTestId,
    queryByTestId,
    // Tip: all queries are also exposed on an object
    // called "queries" which you could import here as well
    waitFor,
  } from '@testing-library/dom'
  // adds special assertions like toHaveTextContent
  import '@testing-library/jest-dom'

import {ViewConfigForm} from "../src/ViewConfigForm"

const html = fs.readFileSync(path.resolve(__dirname, "../src/index.html"))

beforeEach(() => {
    document.documentElement.innerHTML = html.toString()
});

describe('ViewConfigForm', () => {
    test('Init', () => {
        new ViewConfigForm()

        const divForm = (document.querySelector('#config-form'))
        expect(divForm).toBeDefined()

        const nplayersTitle = divForm.querySelector('#nb-players-title')
        expect(nplayersTitle).toBeDefined()
        expect(nplayersTitle.innerHTML).toBe("Veuillez saisir le nombre de joueur :")

        const nplayersInput = divForm.querySelector('#nb-players-input')
        expect(nplayersInput).toBeDefined()

        const npinsTitle = divForm.querySelector('#nb-pins-title')
        expect(npinsTitle).toBeDefined()
        expect(npinsTitle.innerHTML).toBe("Veuillez saisir le nombre de quilles :")

        const npinsInput = divForm.querySelector('#nb-pins-input')
        expect(npinsInput).toBeDefined()

        const button = divForm.querySelector('#validate-button')
        expect(button).toBeDefined()
        expect(button.innerHTML).toBe("Valider")
    })
})
