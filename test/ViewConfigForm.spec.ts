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
        const divForm = (document.querySelector('#nb-players-form'))
        expect(divForm).toBeDefined()
        const title = divForm.querySelector('#nb-players-title')
        expect(title).toBeDefined()
        expect(title.innerHTML).toBe("Veuillez saisir le nombre de joueur :")
        const inputNb = divForm.querySelector('#nb-players-input')
        expect(inputNb).toBeDefined()
        const button = divForm.querySelector('#nb-players-button')
        expect(button).toBeDefined()
        expect(button.innerHTML).toBe("Valider")
    })
})