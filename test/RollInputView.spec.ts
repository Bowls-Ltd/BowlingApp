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
import { ValidationError } from 'webpack'

const html = fs.readFileSync(path.resolve(__dirname, "../src/index.html"))

describe('RollInputView', () => {
    let view, rollView, downButton, upButton, validateButton, pinError;
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        view = new RollInputView(document.body, 8)
        rollView = document.body.querySelector('#roll-view')
        downButton = rollView.querySelector('#selector-minus-div')
        upButton = rollView.querySelector('#selector-plus-div')
        validateButton = rollView.querySelector('#roll-view-validate-div')
        pinError = rollView.querySelector('#pin-error')
    })


    test('Constructor', () => {
        expect(view).toBeDefined()
        expect(rollView).toBeDefined()
        expect(downButton).toBeDefined()
        expect(upButton).toBeDefined()
        expect(validateButton).toBeDefined()
        expect(pinError).toBeDefined()
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
        expect(pinError.style.visibility).toBe('hidden')
        expect(pinError.innerHTML).toBe('')
    })

    test('Default Input', () => {
        let end = false;
        view.attachRollInputCallback(function(nb: number) {
            expect(nb).toBe(0);
            end = true;
        })
        fireEvent(validateButton, new MouseEvent('click'))
        expect(end).toBe(true)
    })

    test('Upper bound', () => {
        for(let i = 0; i <15; i++)
            fireEvent(upButton, new MouseEvent('click'))
        let end = false;
        view.attachRollInputCallback(function(nb: number) {
            expect(nb).toBe(8);
            end = true;
        })
        fireEvent(validateButton, new MouseEvent('click'))
        expect(end).toBe(true)
    })

    test('Lower bound', () => {
        for(let i = 0; i <15; i++)
        fireEvent(downButton, new MouseEvent('click'))
        let end = false;
        view.attachRollInputCallback(function(nb: number) {
            expect(nb).toBe(0);
            end = true;
        })
        fireEvent(validateButton, new MouseEvent('click'))
        expect(end).toBe(true)
    })

    test('normal input', () => {

        for(let i = 0; i <3; i++)
            fireEvent(upButton, new MouseEvent('click'))

        let end = false;
        view.attachRollInputCallback(function(nb: number) {
            expect(nb).toBe(3);
            end = true;
        })
        fireEvent(validateButton, new MouseEvent('click'))
        expect(end).toBe(true)
    })

})
 
