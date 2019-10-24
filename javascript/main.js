let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];

let COMPUTER = +1;
let OPPONENT = -1;

const clickCell = (cell) => {
    let resetButton = document.getElementById("reset-game");
    let firstMoveButton = document.getElementById("first-player");
    let message = document.getElementById("message-board");
    resetButton.disabled = true;
    firstMoveButton.disabled = true;
    message.innerHTML = "It's on! Bring your A-Game, the rumors are true, am really good!"
    let conditionToContinue = gameOverStatus(board) == false && returnEmptyCells(board).length > 0;
    if (conditionToContinue == true) {
        let xPosition = cell.id.split("")[0];
        let yPostion = cell.id.split("")[1];
        let move = makeMove(xPosition, yPostion, OPPONENT);
        if (move == true) {
            cell.innerHTML = "X";
            if (conditionToContinue)
                computerzTurn();
        }

    }
    if (gameDone(board, COMPUTER)) {
        let staightLine;
        let cell;

        if (board[0][0] == 1 && board[0][1] == 1 && board[0][2] == 1)
            staightLine = [[0, 0], [0, 1], [0, 2]];
        else if (board[1][0] == 1 && board[1][1] == 1 && board[1][2] == 1)
            staightLine = [[1, 0], [1, 1], [1, 2]];
        else if (board[2][0] == 1 && board[2][1] == 1 && board[2][2] == 1)
            staightLine = [[2, 0], [2, 1], [2, 2]];
        else if (board[0][0] == 1 && board[1][0] == 1 && board[2][0] == 1)
            staightLine = [[0, 0], [1, 0], [2, 0]];
        else if (board[0][1] == 1 && board[1][1] == 1 && board[2][1] == 1)
            staightLine = [[0, 1], [1, 1], [2, 1]];
        else if (board[0][2] == 1 && board[1][2] == 1 && board[2][2] == 1)
            staightLine = [[0, 2], [1, 2], [2, 2]];
        else if (board[0][0] == 1 && board[1][1] == 1 && board[2][2] == 1)
            staightLine = [[0, 0], [1, 1], [2, 2]];
        else if (board[2][0] == 1 && board[1][1] == 1 && board[0][2] == 1)
            staightLine = [[2, 0], [1, 1], [0, 2]];

        for (var cellIndex = 0; cellIndex < staightLine.length; cellIndex++) {
            cell = document.getElementById(String(staightLine[cellIndex][0]) + String(staightLine[cellIndex][1]));
            cell.style.background = "#BEC2EC";
            cell.className += " " + "blink";
            cell.style.color = "green";
        }
        message.innerHTML = "I win, You lose! Better luck next time";
    }
    if (returnEmptyCells(board).length == 0 && !gameOverStatus(board)) {
        message.innerHTML = "It's a draw! Good game, perhaps you will beat me next time!";
    }
    if (gameOverStatus(board) == true || returnEmptyCells(board).length == 0) {
        resetButton.disabled = false;
    }
}

const makeMove = (xPosition, yPosition, player) => {
    board[xPosition][yPosition] = player;
    return true;
}

const computerzTurn = () => {
    let xPostion, yPostion;
    let move;
    let cell;

    if (returnEmptyCells(board).length == 9) {
        xPostion = parseInt(Math.random() * 3);
        yPostion = parseInt(Math.random() * 3);
    }
    else {
        move = makeBestMove(board, returnEmptyCells(board).length, COMPUTER);
        xPostion = move[0];
        yPostion = move[1];
    }

    if (setMove(xPostion, yPostion, COMPUTER)) {
        cell = document.getElementById(String(xPostion) + String(yPostion));
        cell.innerHTML = "O";
    }
}


const returnEmptyCells = (emptyNessState) => {
    let cells = [];
    for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
        for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
            if (emptyNessState[columnIndex][rowIndex] == 0)
                cells.push([columnIndex, rowIndex]);
        }
    }
    return cells;
}

const makeBestMove = (emptyNessState, depth, player) => {
    let bestMove;

    if (player == COMPUTER) {
        bestMove = [-1, -1, -1000];
    } else {
        bestMove = [-1, -1, +1000];
    }

    if (depth == 0 || gameOverStatus(emptyNessState)) {
        let score = evaluateGameStatus(emptyNessState);
        return [-1, -1, score];
    }

    returnEmptyCells(emptyNessState).forEach(function (cell) {
        let first = cell[0];
        let second = cell[1];
        emptyNessState[first][second] = player;
        let score = makeBestMove(emptyNessState, depth - 1, -player);
        emptyNessState[first][second] = 0;
        score[0] = first;
        score[1] = second;

        if (player == COMPUTER) {
            if (score[2] > bestMove[2])
                bestMove = score;
        }
        else {
            if (score[2] < bestMove[2])
                bestMove = score;
        }
    });

    return bestMove;
}

const gameOverStatus = (status) => {
    return gameDone(status, OPPONENT) || gameDone(status, COMPUTER);
}

const gameDone = (status, player) => {
    let winningPositions = [
        [status[0][0], status[0][1], status[0][2]],
        [status[1][0], status[1][1], status[1][2]],
        [status[2][0], status[2][1], status[2][2]],
        [status[0][0], status[1][0], status[2][0]],
        [status[0][1], status[1][1], status[2][1]],
        [status[0][2], status[1][2], status[2][2]],
        [status[0][0], status[1][1], status[2][2]],
        [status[2][0], status[1][1], status[0][2]],
    ];

    for (var position = 0; position < 8; position++) {
        let staightLine = winningPositions[position];
        let filledCells = 0;
        for (var checkedCells = 0; checkedCells < 3; checkedCells++) {
            if (staightLine[checkedCells] == player)
                filledCells++;
        }
        if (filledCells == 3)
            return true;
    }
    return false;
}

const evaluateGameStatus = (status) => {
    let score = 0;
    if (gameDone(status, COMPUTER)) {
        score = +1;
    }
    else if (gameDone(status, OPPONENT)) {
        score = -1;
    } else {
        score = 0;
    }
    return score;
}

const setMove = (xPostion, yPostion, player) => {
    if (validateMove(xPostion, yPostion)) {
        board[xPostion][yPostion] = player;
        return true;
    }
    else {
        return false;
    }
}

const validateMove = (xPosition, yPosition) => {
    try {
        if (board[xPosition][yPosition] == 0) {
            return true;
        }
        else {
            return false;
        }
    } catch (exception) {
        return false;
    }
}

if (typeof exports !== 'undefined') {
    module.exports = {
        clickCell,
        setMove,
    };
}