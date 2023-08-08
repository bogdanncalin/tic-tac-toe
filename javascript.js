let gameBoard = {
    _cellsArray: [],

    create: function () {
        this._cellsArray = [];
        for (var y = 0; y < 3; y++) {
            for (var x = 0; x < 3; x++) {
                this._cellsArray.push(new Cell(x, y, ''));
            }
        }
        return this._cellsArray;
    },

    get cellsArray() {
        return this._cellsArray;
    }
}

class Cell {
    constructor(positionX, positionY, content, isEmpty) {
        this.positionY = positionY;
        this.positionX = positionX;
        this.content = content; // shows if the cell is empty, has X or a 0 in it
    }
}

class Players {
    constructor(name, side) {
        this.name = name;
        this.side = side; // the player is either X or O
    }
}

let gameBoardElement = document.querySelector('.game-board');

function renderGameBoard() {
    const cellsArray = gameBoard.create();

    for (let i = 0; i < cellsArray.length; i++) {
        let square = document.createElement('div');
        square.classList.add('square');
        square.setAttribute('id', i);
        square.textContent = cellsArray[i].content;
        square.setAttribute('data-cell-index', i);
        gameBoardElement.appendChild(square);
    }
}

function play() {
    let squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
        square.addEventListener('click', squareClicked);
    });
}

var playerX = new Players('Name1', 'x');
var playerO = new Players('Name2', 'o');

var currentPlayer = playerX;
var turn = playerX;

function showWinnerModal(winner) {
    const modal = document.getElementById('winModal');
    const winnerMessage = document.getElementById('winnerMessage');
    const closeModalButton = document.getElementById('closeModal');

    winnerMessage.textContent = winner;
    modal.style.display = 'flex';

    closeModalButton.addEventListener('click', function() {
        modal.style.display = 'none';
        refreshBoard();
    });
}

function tieGame(){
    showWinnerModal('It is a tie..');
}

function youWon(){
    if(currentPlayer === playerO){
        showWinnerModal('Player X has won');

    }
    else {
        showWinnerModal('Player O has won');
    }
}

function checkWinRows() {
    // Check rows
    for (let i = 0; i < 3; i++) {
        const rowStartIndex = i * 3;
        if (
            gameBoard.cellsArray[rowStartIndex].content !== '' &&
            gameBoard.cellsArray[rowStartIndex].content === gameBoard.cellsArray[rowStartIndex + 1].content &&
            gameBoard.cellsArray[rowStartIndex + 1].content === gameBoard.cellsArray[rowStartIndex + 2].content
        ) {
            return true; // Row win condition is met
        }
    }
    return false; // No win condition is met
}

function checkWinColumns() {
    for (let i = 0; i < 3; i++) {
        if (
            gameBoard.cellsArray[i].content !== '' &&
            gameBoard.cellsArray[i].content === gameBoard.cellsArray[i + 3].content &&
            gameBoard.cellsArray[i + 3].content === gameBoard.cellsArray[i + 6].content
        ) {
            return true; // Column win condition is met
        }
    }
    return false; // No win condition is met
}

function checkWinDiagonals() {
    if (
        (gameBoard.cellsArray[0].content !== '' &&
        gameBoard.cellsArray[0].content === gameBoard.cellsArray[4].content &&
        gameBoard.cellsArray[4].content === gameBoard.cellsArray[8].content) ||
        (gameBoard.cellsArray[2].content !== '' &&
        gameBoard.cellsArray[2].content === gameBoard.cellsArray[4].content &&
        gameBoard.cellsArray[4].content === gameBoard.cellsArray[6].content)
    ) {
        return true; // Diagonal win condition is met
    }
    return false; // No win condition is met
}

function checkTie() {
    for (const cell of gameBoard.cellsArray) {
        if (cell.content === '') {
            return false; // At least one cell is empty, not a tie
        }
    }
    return true; // All cells are filled, it's a tie
}


function squareClicked(event) {
    const square = event.target;
    const cellIndex = parseInt(square.getAttribute('data-cell-index'), 10);
    const cell = gameBoard.cellsArray[cellIndex];

    if(cell.content === ''){
        if (currentPlayer === playerX) {
            cell.content = 'X';
            currentPlayer = playerO;
        } else if (currentPlayer === playerO) {
            cell.content = 'O';
            currentPlayer = playerX;
        }
    }

    square.textContent = cell.content;
    
    if(checkWinColumns() || checkWinRows() || checkWinDiagonals()){
        youWon();
    }
    else if (checkTie()){
        tieGame();
    }
}

function refreshBoard() {
    currentPlayer = playerX;
    let squares = document.querySelectorAll('.square');
    for(let i = 0; i <= 8; i++){
            gameBoard.cellsArray[i].content = '';
        }
        
    squares.forEach((square) => {
            square.textContent = '';
        });
};

document.addEventListener('DOMContentLoaded', function() {
    const refreshButton = document.querySelector('#refreshButton');

    let squares = document.querySelectorAll('.square');
    refreshButton.addEventListener('click', function() {
        refreshBoard();
    });
});

renderGameBoard();
play();
