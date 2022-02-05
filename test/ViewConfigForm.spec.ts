/**
 * @jest-environment jsdom
 */

import fs from 'fs'
import path from 'path'

import {
    fireEvent,
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

import {Game} from "../src/Game"
import {initGame} from "../src/Init"
import {ConfigFormView} from "../src/ConfigFormView"

const html = fs.readFileSync(path.resolve(__dirname, "../src/index.html"))


describe('ConfigFormView', () => {
    let view, divForm, nplayersTitle, nplayersInput, npinsTitle, npinsInput, button, error
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString()
        view = new ConfigFormView(new Game(2, 10))
        view.attachGameCreationCallback(initGame)

        divForm = (document.querySelector('#config-form'))
        nplayersTitle = divForm.querySelector('#nb-players-title')
        nplayersInput = divForm.querySelector('#nb-players-input')
        npinsTitle = divForm.querySelector('#nb-pins-title')
        npinsInput = divForm.querySelector('#nb-pins-input')
        button = divForm.querySelector('#validate-button')
        error = divForm.querySelector('#config-error-box')
    });

    test('Constructor', () => {
        expect(divForm).toBeDefined()

        expect(nplayersTitle).toBeDefined()
        expect(nplayersTitle.innerHTML).toBe('Veuillez saisir le nombre de joueur :')

        expect(nplayersInput).toBeDefined()

        expect(npinsTitle).toBeDefined()
        expect(npinsTitle.innerHTML).toBe('Veuillez saisir le nombre de quilles :')

        expect(npinsInput).toBeDefined()

        expect(button).toBeDefined()
        expect(button.innerHTML).toBe('Valider')

        expect(error).toBeDefined()
        expect(error.style.background).toBe("red")
        expect(error.style.color).toBe("white")
        expect(error.style.visibility).toBe("hidden")
    })

    test('Valid form', () => {
        nplayersInput.value = "5"
        npinsInput.value = "5"
        fireEvent(button, new MouseEvent('click'))
        expect(document.querySelector('#config-form')).toBe(null)
    })

    test('One player', () => {
        nplayersInput.value = "1"
        npinsInput.value = "5"
        fireEvent(button, new MouseEvent('click'))
        expect(document.querySelector('#config-form')).toBe(null)
    })

    test('Empty form', () => {
        fireEvent(button, new MouseEvent('click'))
        expect(error.style.visibility).toBe('visible')
        expect(error.innerHTML).toBe('Error: Invalid parameter : nbPlayers must be a number')
    })

    test('Negative player number', () => {
        nplayersInput.value = "-5"
        npinsInput.value = "5"
        fireEvent(button, new MouseEvent('click'))
        expect(error.style.visibility).toBe('visible')
        expect(error.innerHTML).toBe('Error: Invalid parameter : nbPlayers must be positive')
    })

    test('Negative pin number', () => {
        nplayersInput.value = "5"
        npinsInput.value = "-5"
        fireEvent(button, new MouseEvent('click'))
        expect(error.style.visibility).toBe('visible')
        expect(error.innerHTML).toBe('Error: Invalid parameter : nbPins must be positive')
    })

    test('Negative player and pin number', () => {
        nplayersInput.value = "-5"
        npinsInput.value = "-5"
        fireEvent(button, new MouseEvent('click'))
        expect(error.style.visibility).toBe('visible')
        expect(error.innerHTML).toBe('Error: Invalid parameter : nbPlayers must be positive')
    })

    test('Zero player', () => {
        nplayersInput.value = "0"
        npinsInput.value = "5"
        fireEvent(button, new MouseEvent('click'))
        expect(error.style.visibility).toBe('visible')
        expect(error.innerHTML).toBe('Error: Invalid parameter : nbPlayers must be positive')
    })

    test('Zero pins', () => {
        nplayersInput.value = "5"
        npinsInput.value = "0"
        fireEvent(button, new MouseEvent('click'))
        expect(error.style.visibility).toBe('visible')
        expect(error.innerHTML).toBe('Error: Invalid parameter : nbPins must be positive')
    })
})
