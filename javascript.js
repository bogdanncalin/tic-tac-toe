
let gameBoard = {
    cellsArray : [],

    create : function () {
        console.log('test');
        let cellsArray = [];
        for(var y = 0; y < 3; y++) {
            for(var x = 0; x < 3; x++)    {
            this.cellsArray.push(new Cell(x, y, ''));
            }
        }

        return this.cellsArray;
    }
}

class Cell {
    constructor(positionX, positionY, content, isEmpty){
        this.positionY = positionY;
        this.positionX = positionX;
        this.content = content; // shows if the cell is empt
        if(typeof this.isEmpty === 'boolean'){
            this.isEmpty = false;
        }
        this.isEmpty = typeof this.isEmpty === 'boolean' ? isEmpty : false;
    }

// to be implemented
/*
    clicked(){
        if(x clicked)
            content change to x
        else
            content change to y
    }
*/
}

class Players{
    constructor(name, side){
        this.name = name;
        this.side = side; // the player is either X or O
    }
}

let game = {

    // to be implemented
    /*
    play : function () {
        starts the game
    }
    */
}

function renderGameBoard() {

// !!! TO DO: check the implementation, doesn't work properly

    // to be implemented
    /*
    renders the gameboard in the page
    */
   let gameBoard = document.querySelector('.game-board');

   for(let i = 0; i < 9; i++){
        let square = document.createElement('div');
        gameBoard.appendChild(square);
   }
}

renderGameBoard();