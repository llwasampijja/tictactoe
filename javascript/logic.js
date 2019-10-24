let MESSAGEBOARD = "Hey, I'm ANN, am an AI. You can just start playin, or tell me to go first!"
let message = document.getElementById("message-board");
let resetButton = document.getElementById("reset-game");
let firstMoveButton = document.getElementById("first-player");

const playFirst = (button) => {
    let message2 = document.getElementById("message-board");
    let resetButton2 = document.getElementById("reset-game");
    computerzTurn();
    message2.innerHTML = "It's on! Bring your A-Game, the rumors are true, am really good!"
    resetButton2.disabled = true;
}

const resetGame = () => {
    let cell;

    for (var column = 0; column < 3; column++) {
        for (var row = 0; row < 3; row++) {
            board[column][row] = 0;
            cell = document.getElementById(String(column) + String(row));
            cell.classList.remove("blink");
            cell.innerHTML = "";
            cell.style.background = "rgb(122, 168, 196)";
            cell.style.color = "#FFFFFF";
        }
    }
    message.innerHTML = MESSAGEBOARD;
    resetButton.disabled = false;
    firstMoveButton.disabled = false;
}