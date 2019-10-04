const setMove = require('./../main');

test('Jest setup correctly', () => {
    expect("setup").toEqual("setup");
});

test('Can computer make correct move', () => {
    expect(setMove(1,1,+1)).toEqual(true);
});

test('Can not move to already filled cell/position', () => {
    expect(setMove(1,1,+1)).toEqual(false);
});

test('Can human make correct move', () => {
    expect(setMove(0,1,-1)).toEqual(true);
});