document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {};

function startGame () {
    board.cells = generateCells();
    // Don't remove this function call: it makes the game work!
    for (var i = 0; i < board.cells.length; i++) {

        var surroundingMines = countSurroundingMines(board.cells[i]);
        board["cells"].surroundingMines = surroundingMines;
    }

    document.addEventListener("click", checkForWin)
    document.addEventListener("contextmenu", checkForWin)

    lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin() {
    var markedMines = 0;
    var unhiddenCells = 0;
    for (var i = 0; i < board.cells.length; i++) {
        if (board.cells[i].isMine && board.cells[i].isMarked) {
            markedMines++;
        } else if (!board.cells[i].hidden && !board.cells[i].isMine) {
            unhiddenCells++;
        }
    }
    if (markedMines + unhiddenCells === board.cells.length) {
        lib.displayMessage('You win!');
    }
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
// var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
    var surroundingCells = lib.getSurroundingCells(cell.row, cell.col);
    var mineCount = 0;
    for (var i = 0; i < surroundingCells.length; i++) {
        if (surroundingCells[i].isMine) {
            mineCount++;
        }
    } 
    return mineCount;
}


function generateCells () {
    var cells = [];
    var boardSize = 3;
    for (var i = 0; i < boardSize; i++) {
        for (var j = 0; j < boardSize; j++) {
            cells.push({row: i, col: j, isMine: true, isMarked: false, hidden: true});
        }
    }
    return cells;
}