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

import {RollInputView} from "../src/RollInputView"

const html = fs.readFileSync(path.resolve(__dirname, "../src/index.html"))

describe('RollInputView', () => {
    let view, rollView, pinInput, pinLabel, pinSubmit, pinError
    beforeEach(() => {
        view = new RollInputView(document.body, 8)
        rollView = document.body.querySelector('#roll-view')
        pinInput = rollView.querySelector('#pin-input')
        pinLabel = rollView.querySelector('#pin-label')
        pinSubmit = rollView.querySelector('#pin-submit')
        pinError  = rollView.querySelector('#pin-error')

        view.attachRollInputCallback((pinCount) => {
            if (Number.isNaN(pinCount) ||pinCount < 0 || pinCount > 8)
                view.printError('Error')
            else
                view.hideError()
        })
    })

    test('Constructor', () => {
        expect(rollView).toBeDefined()
        expect(rollView.id).toBe('roll-view')

        expect(pinInput).toBeDefined()
        expect(pinInput.id).toBe('pin-input')
        expect(pinInput.type).toBe('number')
        expect(pinInput.min).toBe('0')
        expect(pinInput.max).toBe('8')

        expect(pinLabel).toBeDefined()
        expect(pinLabel.id).toBe('pin-label')
        expect(pinLabel.innerHTML).toBe('Nombre de quilles ')

        expect(pinSubmit).toBeDefined()
        expect(pinSubmit.id).toBe('pin-submit')
        expect(pinSubmit.innerHTML).toBe('Envoyer')

        expect(pinError).toBeDefined()
        expect(pinError.id).toBe('pin-error')
        expect(pinError.style.background).toBe('red')
        expect(pinError.style.color).toBe('white')
        expect(pinError.style.visibility).toBe('hidden')
    })

    test('Print Error', () => {
        view.printError('Error')
        expect(pinError.style.visibility).toBe('visible')
        expect(pinError.innerHTML).toBe('Error')
    })

    test('Hide Error', () => {
        view.printError('Error')
        expect(pinError.style.visibility).toBe('visible')
        expect(pinError.innerHTML).toBe('Error')
        view.hideError()
        expect(pinError.style.visibility).toBe('visible')
        expect(pinError.innerHTML).toBe('')
    })

    test('Valid Input', () => {
        for (let i = 0; i <= 8; i++) {
            pinInput.value = i.toString()
            fireEvent(pinSubmit, new MouseEvent('click'))
            expect(pinError.style.visibility).toBe('hidden')
        }
    })

    test('Upper bound', () => {
        pinInput.value = '8'
        fireEvent(pinSubmit, new MouseEvent('click'))
        expect(pinError.style.visibility).toBe('hidden')
    })

    test('Lower bound', () => {
        pinInput.value = '0'
        fireEvent(pinSubmit, new MouseEvent('click'))
        expect(pinError.style.visibility).toBe('hidden')
    })

    test('Negative Number', () => {
        pinInput.value = '-1'
        fireEvent(pinSubmit, new MouseEvent('click'))
        expect(pinError.style.visibility).toBe('visible')
        expect(pinError.innerHTML).toBe('Error')
    })

    test('String', () => {
        pinInput.value = 'Jean-Michel'
        fireEvent(pinSubmit, new MouseEvent('click'))
        expect(pinError.style.visibility).toBe('visible')
        expect(pinError.innerHTML).toBe('Error')
    })

    test('Valid-Valid input', () => {
        pinInput.value = '1'
        fireEvent(pinSubmit, new MouseEvent('click'))
        expect(pinError.style.visibility).toBe('hidden')
        expect(pinError.innerHTML).toBe('')
        pinInput.value = '4'
        fireEvent(pinSubmit, new MouseEvent('click'))
        expect(pinError.style.visibility).toBe('hidden')
        expect(pinError.innerHTML).toBe('')
    })

    test('Invalid-Valid input', () => {
        pinInput.value = 'a'
        fireEvent(pinSubmit, new MouseEvent('click'))
        expect(pinError.style.visibility).toBe('visible')
        expect(pinError.innerHTML).toBe('Error')
        pinInput.value = '5'
        fireEvent(pinSubmit, new MouseEvent('click'))
        expect(pinError.style.visibility).toBe('hidden')
        expect(pinError.innerHTML).toBe('')
    })
})
 
