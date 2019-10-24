const path = require('path')
const fs = require('fs')
const html = fs.readFileSync(path.resolve(__dirname, './../../index.html'), 'utf8')
const {
    clickCell,
    setMove
} = require('./../main.js');

describe('testing tictactoe', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });

    afterEach(() => {
        jest.resetModules();
    });

    test('Can computer make correct move', () => {
        expect(setMove(1, 1, +1)).toEqual(true);
    });

    test('Can not move to already filled cell/position', () => {
        expect(setMove(1, 1, +1)).toEqual(false);
    });

    test('Can human make correct move', () => {
        expect(setMove(0, 1, -1)).toEqual(true);
    });

    test('is able to click a cell', () => {
        cell = document.getElementById("11")
        expect(clickCell(cell)).toEqual(undefined);
    })

})
