const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');

let board = Array.from({ length: 3 }, () => Array(3).fill(''));
const players = ['X', 'O'];
let currentPlayer = 0;
let moves = 0;

function renderBoard() {
    boardElement.innerHTML = '';
    board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            if (cell !== '') cellElement.classList.add('taken');
            cellElement.textContent = cell;
            cellElement.addEventListener('click', () => makeMove(rowIndex, colIndex));
            boardElement.appendChild(cellElement);
        });
    });
}

function checkWinner() {
    // Check rows and columns
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== '') {
            return board[i][0];
        }
        if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== '') {
            return board[0][i];
        }
    }

    // Check diagonals
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== '') {
        return board[0][0];
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== '') {
        return board[0][2];
    }

    // Check for draw
    if (moves === 9) {
        return 'Draw';
    }

    return null;
}

function makeMove(row, col) {
    if (board[row][col] !== '') return;

    board[row][col] = players[currentPlayer];
    moves++;
    const result = checkWinner();

    if (result) {
        if (result === 'Draw') {
            messageElement.textContent = "It's a draw!";
        } else {
            messageElement.textContent = `Player ${result} wins!`;
        }
        boardElement.querySelectorAll('.cell').forEach(cell => cell.classList.add('taken'));
    } else {
        currentPlayer = 1 - currentPlayer;
        messageElement.textContent = `Player ${players[currentPlayer]}'s turn.`;
    }

    renderBoard();
}

// Initialize game
messageElement.textContent = `Player ${players[currentPlayer]}'s turn.`;
renderBoard();