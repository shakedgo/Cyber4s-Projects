const BOARD_SIZE = 8;
const WHITE_PLAYER = 'White';
const DARK_PLAYER = 'Black';

const PAWN = 'Pawn';
const ROOK = 'Rook';
const KNIGHT = 'Knight';
const BISHOP = 'Bishop';
const KING = 'King';
const QUEEN = 'Queen';

let selectedCell;
// let pieces = [];
let boardData;
let table;

class piece {
    constructor(row, col, color, name) {
        this.row = row;
        this.col = col;
        this.color = color;
        this.name = name;
    }

    getPossibleMoves() {
        let relativeMoves;
        if (this.name === PAWN) {
            relativeMoves = this.getPawnRelativeMoves();
            // relativeMoves gets something like this [[1, 0]];
        } else if (this.name === ROOK) {
            relativeMoves = this.getRookRelativeMoves();
        } else if (this.name === KNIGHT) {
            relativeMoves = this.getKnightRelativeMoves();
        } else if (this.name === BISHOP) {
            relativeMoves = this.getBishopRelativeMoves();
        } else if (this.name === KING) {
            relativeMoves = this.getKingRelativeMoves();
        } else if (this.name === QUEEN) {
            relativeMoves = this.getQueenRelativeMoves();
        } else {
            console.log("Unknown name: " + this.name)
        }
        //console.log('relativeMoves', relativeMoves);

        let absoluteMoves = [];
        for (let relativeMove of relativeMoves) {
            // we set absolute move by setting the row or col the piece is in right now.
            // and them we add relativeMove answer.
            const absoluteRow = this.row + relativeMove[0];
            const absoluteCol = this.col + relativeMove[1];
            absoluteMoves.push([absoluteRow, absoluteCol]);
        }
        //console.log('absoluteMoves', absoluteMoves);

        let filteredMoves = [];
        for (let absoluteMove of absoluteMoves) {
            const absoluteRow = absoluteMove[0];
            const absoluteCol = absoluteMove[1];
            // we filter the moves that are out of the chessboard.
            if (absoluteRow >= 0 && absoluteRow <= 7 && absoluteCol >= 0 && absoluteCol <= 7) {
                filteredMoves.push(absoluteMove);
            }
        }
        //console.log('filteredMoves', filteredMoves);
        // We return the filtered possible moves.
        return filteredMoves;
    }

    getPawnRelativeMoves() {
        let result = [];
        if (this.color === DARK_PLAYER) {
            if (this.row === 1){
                result.push([2, 0])
            }
            result.push([1,0]);
        } else if (this.color === WHITE_PLAYER) {
            if (this.row === 6){
                result.push([-2, 0]);
            }
            result.push([-1, 0]);
        }
        return result;
    }
    getRookRelativeMoves() {
        let result = [];
        for (let i = 1; i < BOARD_SIZE; i++) {
            result.push([i, 0]);
            result.push([-i, 0]);
            result.push([0, i]);
            result.push([0, -i]);
        }
        return result;
    }
    getKnightRelativeMoves() {
        let result = [];
        for (let i = 0; i < BOARD_SIZE; i++) {
            result.push([0 + 2, 0 - 1]);
            result.push([0 + 2, 0 + 1]);
            result.push([0 + 1, 0 - 2]);
            result.push([0 + 1, 0 + 2]);

            result.push([0 - 2, 0 + 1]);
            result.push([0 - 2, 0 - 1]);
            result.push([0 - 1, 0 + 2]);
            result.push([0 - 1, 0 - 2]);
        }
        return result;
    }
    getBishopRelativeMoves() {
        let result = [];
        for (let i = 1; i < BOARD_SIZE - this.col; i++) {
            result.push([0 - i, 0 + i]);
        }
        for (let i = 1; i < BOARD_SIZE - (this.row - this.col); i++) {
            result.push([0 - i, 0 - i]);
        }
        for (let i = 1; i < BOARD_SIZE + this.col; i++) {
            result.push([0 + i, 0 - i]);
        }
        for (let i = 1; i < BOARD_SIZE + (this.row - this.col); i++) {
            result.push([0 + i, 0 + i]);
        }
        return result;
    }
    getKingRelativeMoves() {
        let result = [];
        for (let i = 1; i < 2; i++) {
            result.push([0, 0 + i]);
            result.push([0, 0 - i]);
            result.push([0 - i, 0 + i]);
            result.push([0 - i, 0 - i]);
            result.push([0 - i, 0]);
        }
        for (let i = 1; i < 2; i++) {
            result.push([0, 0 - i]);
            result.push([0, 0 + i]);
            result.push([0 + i, 0 - i]);
            result.push([0 + i, 0 + i]);
            result.push([0 + i, 0]);
        }
        return result;
    }
    getQueenRelativeMoves() {
        let result = [];
        for (let i = 1; i < BOARD_SIZE - this.col; i++) {
            result.push([0 - i, 0 + i]);
        }
        for (let i = 1; i < BOARD_SIZE - (this.row - this.col); i++) {
            result.push([0 - i, 0 - i]);
        }
        for (let i = 1; i < BOARD_SIZE + this.col; i++) {
            result.push([0 + i, 0 - i]);
        }
        for (let i = 1; i < BOARD_SIZE + (this.row - this.col); i++) {
            result.push([0 + i, 0 + i]);
        }
        for (let i = 1; i < BOARD_SIZE; i++) {
            result.push([i, 0]);
            result.push([-i, 0]);
            result.push([0, i]);
            result.push([0, -i]);
        }
        return result;
    }
}

class BoardData {
    constructor(pieces) {
        this.pieces = pieces;
    }
    // Returns piece in row, col, or undefined if not exists.
    getPiece(row, col) {
        for (let i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].row === row && this.pieces[i].col === col) {
                return this.pieces[i];
            }
        }
        return undefined;
    }
    // Check if the possiple moves empty
    //isEmpty (piece) {
    //}
}

// Builds the board.
function build() {
    table = document.createElement('table');
    document.body.appendChild(table);
    for (let row = 0; row < BOARD_SIZE; row++) {
        let tr = document.createElement('tr');
        table.appendChild(tr); // creates new tr
        for (let col = 0; col < BOARD_SIZE; col++) {
            // i and j to switch places
            const td = document.createElement('td');
            td.style = 'text-align: center; font-size: 60px;';
            if ((col + row) % 2 === 0) {
                td.className = 'white';
                td.id = (row + "_" + col)
                tr.appendChild(td);
            }
            else {
                td.className = 'dark';
                td.id = (row + "_" + col)
                tr.appendChild(td);
            }
            td.addEventListener('click', (event) => onCellClick(event, row, col));
        }
    }
    boardData = new BoardData(getInitialPieces());
    for (let piece of boardData.pieces) {
        const cell = table.rows[piece.row].cells[piece.col];
        addImg(cell, piece.color, piece.name);
    }
}

// When clicking a td it marks it.
function onCellClick(event, row, col) {
    // Clean board.
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            table.rows[i].cells[j].classList.remove('possibleMove');
        }
    }
    const piece = boardData.getPiece(row, col);
    if (piece !== undefined) {
        let possibleMoves = piece.getPossibleMoves();
        for (let possibleMove of possibleMoves) {
            const cell = table.rows[possibleMove[0]].cells[possibleMove[1]];
            cell.classList.add('possibleMove');
        }
    }

    if (selectedCell !== undefined) {
        selectedCell.classList.remove('clicked');
    }
    selectedCell = event.currentTarget;
    selectedCell.classList.add('clicked');
}

// Adds the image to the cell.
function addImg(cell, color, name) {
    const img = document.createElement('img');
    img.style = 'width: 60px;height:60px;'
    img.src = 'pieces/' + color + name + '.svg';
    cell.appendChild(img);
}

// Puts the pieces on the board
function getInitialPieces() {
    let result = [];
    addFirstRowPieces(result, 0, DARK_PLAYER);
    addFirstRowPieces(result, 7, WHITE_PLAYER);
    for (let i = 0; i < 8; i++) {
        result.push(new piece(1, i, DARK_PLAYER, PAWN))
        result.push(new piece(6, i, WHITE_PLAYER, PAWN))
    }
    return result;
}
// To avoid duplicate in getInitialBoard().
function addFirstRowPieces(result, row, color) {
    result.push(new piece(row, 0, color, ROOK));
    result.push(new piece(row, 1, color, KNIGHT));
    result.push(new piece(row, 2, color, BISHOP));
    result.push(new piece(row, 3, color, QUEEN));
    result.push(new piece(row, 4, color, KING));
    result.push(new piece(row, 5, color, BISHOP));
    result.push(new piece(row, 6, color, KNIGHT));
    result.push(new piece(row, 7, color, ROOK));
}


window.addEventListener('load', build()); // Builds the chessboard.