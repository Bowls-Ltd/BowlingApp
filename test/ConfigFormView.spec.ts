/**
 * @jest-environment jsdom
 */

import * as fs from 'fs'
import * as path from 'path'

import {
    fireEvent,
    // getByLabelText,
    // getByText,
    // getByTestId,
    // queryByTestId,
    // Tip: all queries are also exposed on an object
    // called "queries" which you could import here as well
    // waitFor,
} from '@testing-library/dom'
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom'

import {ConfigFormView} from "../src/ConfigFormView"
// import {Game} from "../src/Game"
import {initGame} from "../src/Init"

const html = fs.readFileSync(path.resolve(__dirname, "../src/index.html"))

let scrollIntoViewMock = jest.fn();
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

describe('ConfigFormView', () => {
    let view, configForm, button, error,
        nplayersTitle, nplayersInput, decrPlayersButton, incrPlayersButton,
        npinsTitle, npinsInput, decrPinsButton, incrPinsButton;

    function setPinsInput(target: number) {
        let current: number = parseInt(npinsInput.innerHTML);
        let clicks: number = Math.abs(target - current);
        let button = (target - current > 0) ? incrPinsButton : decrPinsButton;
        for (let i = 0; i < clicks; i++) {
            fireEvent(button, new MouseEvent('click'));
        }
        expect(parseInt(npinsInput.innerHTML)).toBe(target);
    }

    function setPlayerInput(target: number) {
        let current: number = parseInt(nplayersInput.innerHTML);
        let clicks: number = Math.abs(target - current);
        let button = (target - current > 0) ? incrPlayersButton : decrPlayersButton;
        for (let i = 0; i < clicks; i++) {
            fireEvent(button, new MouseEvent('click'));
        }
        expect(parseInt(nplayersInput.innerHTML)).toBe(target);
    }

    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        const mainContainer = document.getElementById('main-container');
        view = new ConfigFormView(mainContainer);
        view.attachGameCreationCallback(initGame);

        configForm = document.querySelector('#config-form');
        expect(configForm).not.toBeNull();

        nplayersTitle = document.querySelector('#config-form > div:nth-child(2) > div:nth-child(1)');
        expect(nplayersTitle).not.toBeNull();

        decrPlayersButton = document.querySelector('#config-form > div:nth-child(2) > div:nth-child(2) > div:nth-child(1)');
        expect(decrPlayersButton).not.toBeNull();
        nplayersInput = document.querySelector('#config-form > div:nth-child(2) > div:nth-child(2) > div:nth-child(2)');
        expect(parseInt(nplayersInput.innerHTML)).toBe(2);
        incrPlayersButton = document.querySelector('#config-form > div:nth-child(2) > div:nth-child(2) > div:nth-child(3)');
        expect(incrPlayersButton).not.toBeNull();

        npinsTitle = document.querySelector('#config-form > div:nth-child(3) > div:nth-child(1)');
        expect(npinsTitle).not.toBeNull();

        decrPinsButton = document.querySelector('#config-form > div:nth-child(3) > div:nth-child(2) > div:nth-child(1)');
        expect(decrPinsButton).not.toBeNull();
        npinsInput = document.querySelector('#config-form > div:nth-child(3) > div:nth-child(2) > div:nth-child(2)');
        expect(parseInt(npinsInput.innerHTML)).toBe(10);
        incrPinsButton = document.querySelector('#config-form > div:nth-child(3) > div:nth-child(2) > div:nth-child(3)');
        expect(incrPinsButton).not.toBeNull();

        button = document.querySelector('#validate-div');
        expect(button).not.toBeNull();

        error = document.querySelector('#config-error-box');
        expect(error).not.toBeNull();
    });

    test('Constructor', () => {
        expect(configForm).toBeDefined()

        expect(nplayersTitle).toBeDefined()
        expect(nplayersTitle.innerHTML).toBe('Nombre de joueurs')

        expect(nplayersInput).toBeDefined()

        expect(npinsTitle).toBeDefined()
        expect(npinsTitle.innerHTML).toBe('Nombre de quilles')

        expect(npinsInput).toBeDefined()

        expect(button).toBeDefined()

        expect(error).toBeDefined()
        expect(error.style.background).toBe("red")
        expect(error.style.color).toBe("white")
        expect(error.style.visibility).toBe("hidden")
    })

    test('Valid form', () => {
        setPlayerInput(5);
        setPinsInput(5);
        fireEvent(button, new MouseEvent('click'));
        expect(document.querySelector('#config-form')).toBeNull();
    })

    test('One player', () => {
        setPlayerInput(1);
        setPinsInput(5);
        fireEvent(button, new MouseEvent('click'))
        expect(document.querySelector('#config-form')).toBeNull();
    })

    test.skip('Negative player number', () => {
        setPlayerInput(-5);
        setPinsInput(5);
        fireEvent(button, new MouseEvent('click'))
        expect(error.style.visibility).toBe('visible')
        expect(error.innerHTML).toBe('Error: Invalid parameter : nbPlayers must be positive')
    })

    test.skip('Negative pin number', () => {
        setPlayerInput(5);
        setPinsInput(-5);
        fireEvent(button, new MouseEvent('click'))
        expect(error.style.visibility).toBe('visible')
        expect(error.innerHTML).toBe('Error: Invalid parameter : nbPins must be positive')
    })

    test.skip('Negative player and pin number', () => {
        setPlayerInput(-5);
        setPinsInput(-5);
        fireEvent(button, new MouseEvent('click'))
        expect(error.style.visibility).toBe('visible')
        expect(error.innerHTML).toBe('Error: Invalid parameter : nbPlayers must be positive')
    })

    test.skip('Zero player', () => {
        setPlayerInput(0);
        setPinsInput(5);
        fireEvent(button, new MouseEvent('click'))
        expect(error.style.visibility).toBe('visible')
        expect(error.innerHTML).toBe('Error: Invalid parameter : nbPlayers must be positive')
    })

    test.skip('Zero pins', () => {
        setPlayerInput(5);
        setPinsInput(0);
        fireEvent(button, new MouseEvent('click'))
        expect(error.style.visibility).toBe('visible')
        expect(error.innerHTML).toBe('Error: Invalid parameter : nbPins must be positive')
    })

    test('GameCreationCallback', () => {
        let actualPinCount: number;
        view.attachGameCreationCallback((view_, nbPlayers_, nbPins_) => {
            actualPinCount = nbPins_;
        });

        for (let i = 10; i > 0; i--) {
            setPinsInput(i);
            fireEvent(button, new MouseEvent('click'));
            expect(actualPinCount).toBe(i);
        }
    })

    test('printError', () => {
        view.printError("This is an error message.");
        expect(view.errorBox.innerHTML).toBe("This is an error message.");
        expect(view.errorBox.style.visibility).toBe("visible");
    })
})
