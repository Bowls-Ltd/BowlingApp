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

import {NumberSelector} from "../src/NumberSelector"

const html = fs.readFileSync(path.resolve(__dirname, "../src/index.html"))

describe('NumberSelector', () => {
    let selector, mainDiv, titleDiv, selectorDiv, buttonPlusDiv, imgButtonPlusUp,
    imgButtonPlusDown, numberDiv, buttonMinusDiv, imgButtonMinusUp, imgButtonMinusDown,
    erroBox
    let title = 'test'
    let initValue = 5
    let upperBound   = 10
    let lowerBound   = 0

    beforeEach(() => {
        document.documentElement.innerHTML = html.toString()
        selector = new NumberSelector(document.body, title, initValue, lowerBound, upperBound)
        mainDiv = document.body.querySelector('#selector-main-div')
        titleDiv = mainDiv.querySelector('.number-selector-title')
        selectorDiv = mainDiv.querySelector('.number-selector-div')
        buttonMinusDiv = mainDiv.querySelector('#selector-minus-div')
        imgButtonMinusUp = mainDiv.querySelectorAll('.button-up')[0]
        imgButtonMinusDown = mainDiv.querySelectorAll('.button-down')[0]
        numberDiv = mainDiv.querySelector('.number-selector-number')
        buttonPlusDiv = mainDiv.querySelector('#selector-plus-div')
        imgButtonPlusUp = mainDiv.querySelectorAll('.button-up')[1]
        imgButtonPlusDown = mainDiv.querySelectorAll('.button-down')[1]
    })

    test('Constructor', () => {
        expect(mainDiv).toBeDefined()
        expect(titleDiv).toBeDefined()
        expect(titleDiv.innerHTML).toBe(title)
        expect(selectorDiv).toBeDefined()
        expect(buttonMinusDiv).toBeDefined()
        expect(imgButtonMinusUp).toBeDefined()
        expect(imgButtonMinusDown).toBeDefined()
        expect(numberDiv).toBeDefined()
        expect(buttonPlusDiv).toBeDefined()
        expect(imgButtonPlusUp).toBeDefined()
        expect(imgButtonPlusDown).toBeDefined()
    });

    test('getSelectedValue()', () => {
        expect(selector.getSelectedValue()).toBe(5)
        expect(numberDiv.innerHTML).toBe('5')
    })

    test('Increment', () => {
        selector.incrementValue()
        expect(selector.getSelectedValue()).toBe(6)
        expect(numberDiv.innerHTML).toBe('6')
    })

    test('Decrement', () => {
        selector.decrementValue()
        expect(selector.getSelectedValue()).toBe(4)
        expect(numberDiv.innerHTML).toBe('4')
    })

    test('Increment button', () => {
        fireEvent(buttonPlusDiv, new MouseEvent('click'))
        expect(selector.getSelectedValue()).toBe(6)
        expect(numberDiv.innerHTML).toBe('6')
    })

    test('Decrement button', () => {
        fireEvent(buttonMinusDiv, new MouseEvent('click'))
        expect(selector.getSelectedValue()).toBe(4)
        expect(numberDiv.innerHTML).toBe('4')
    })

    test('UpperBound', () => {
        for (let i = 1; i < 6; i++) {
            fireEvent(buttonPlusDiv, new MouseEvent('click'))
            expect(selector.getSelectedValue()).toBe(5 + i)
            expect(numberDiv.innerHTML).toBe((5 + i).toString())
        }
        fireEvent(buttonPlusDiv, new MouseEvent('click'))
        expect(selector.getSelectedValue()).toBe(10)
        expect(numberDiv.innerHTML).toBe('10')
    })

    test('LowerBound', () => {
        for (let i = 1; i < 6; i++) {
            fireEvent(buttonMinusDiv, new MouseEvent('click'))
            expect(selector.getSelectedValue()).toBe(5 - i)
            expect(numberDiv.innerHTML).toBe((5 - i).toString())
        }
        fireEvent(buttonMinusDiv, new MouseEvent('click'))
        expect(selector.getSelectedValue()).toBe(0)
        expect(numberDiv.innerHTML).toBe('0')
    })
})
