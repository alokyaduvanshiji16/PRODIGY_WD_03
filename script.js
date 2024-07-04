// Game constants
const PLAYER_X = 'X';
const PLAYER_O = 'O';
const EMPTY_CELL = '';
const WINNING_COMBOS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

// Game variables
let currentPlayer = PLAYER_X;
let gameBoard = Array(9).fill(EMPTY_CELL);
let gameActive = true;

// DOM elements
const cells = document.querySelectorAll('.cell');
const statusMessage = document.getElementById('status-message');
const resetButton = document.getElementById('reset-btn');

// Initialize game board
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

// Function to handle cell click
function handleCellClick(event) {
    const selectedCell = event.target;
    const selectedCellIndex = parseInt(selectedCell.id.replace('cell-', ''));

    if (gameBoard[selectedCellIndex] !== EMPTY_CELL || !gameActive) {
        return;
    }

    // Update game board and UI
    gameBoard[selectedCellIndex] = currentPlayer;
    selectedCell.textContent = currentPlayer;
    selectedCell.style.color = currentPlayer === PLAYER_X ? '#3498db' : '#e74c3c';

    // Check for win or draw
    if (checkWin(currentPlayer)) {
        gameActive = false;
        statusMessage.textContent = `${currentPlayer} wins!`;
        return;
    } else if (isDraw()) {
        gameActive = false;
        statusMessage.textContent = 'It\'s a draw!';
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
    statusMessage.textContent = `${currentPlayer}'s turn`;
}

// Function to check if a player has won
function checkWin(player) {
    return WINNING_COMBOS.some(combination => {
        return combination.every(index => {
            return gameBoard[index] === player;
        });
    });
}

// Function to check if the game is a draw
function isDraw() {
    return gameBoard.every(cell => {
        return cell !== EMPTY_CELL;
    });
}

// Function to reset the game
function resetGame() {
    gameBoard = Array(9).fill(EMPTY_CELL);
    currentPlayer = PLAYER_X;
    gameActive = true;
    statusMessage.textContent = `${currentPlayer}'s turn`;

    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.color = '';
    });
}
