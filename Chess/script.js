const BOARD_SIZE = 8;
const WHITE_PLAYER = "White";
const DARK_PLAYER = "Black";

const PAWN = "Pawn";
const ROOK = "Rook";
const KNIGHT = "Knight";
const BISHOP = "Bishop";
const KING = "King";
const QUEEN = "Queen";

let selectedCell;
let boardData;
let table;
let previousPossible = [];

class Piece {
    constructor(row, col, color, name) {
        this.row = row;
        this.col = col;
        this.color = color;
        this.name = name;
    }

    getPossibleMoves(boardData) {
        let moves;
        if (this.name === PAWN) {
            moves = this.getPawnMoves(boardData);
            // relativeMoves gets something like this [[1, 0]];
        } else if (this.name === ROOK) {
            moves = this.getRookMoves(boardData);
        } else if (this.name === KNIGHT) {
            moves = this.getKnightMoves(boardData);
        } else if (this.name === BISHOP) {
            moves = this.getBishopMoves(boardData);
        } else if (this.name === KING) {
            moves = this.getKingMoves(boardData);
        } else if (this.name === QUEEN) {
            moves = this.getQueenMoves(boardData);
        } else {
            console.log("Unknown name: " + this.name);
        }
        //console.log("relativeMoves", moves);

        let filteredMoves = [];
        for (let absoluteMove of moves) {
            const absoluteRow = absoluteMove[0];
            const absoluteCol = absoluteMove[1];
            // we filter the moves that are out of the chessboard.
            if (
                absoluteRow >= 0 &&
                absoluteRow <= 7 &&
                absoluteCol >= 0 &&
                absoluteCol <= 7
            ) {
                filteredMoves.push(absoluteMove);
            }
        }
        //We return the filtered possible moves.
        //console.log("filteredMoves", filteredMoves);
        return filteredMoves;
    }

    getPawnMoves(boardData) {
        let result = [];
        let direction = 1;
        if (this.color === WHITE_PLAYER) {
            direction = -1;
        }
        let position = [this.row + direction, this.col];
        if (boardData.getPiece(position[0], position[1]) === undefined) {
            result.push(position);
        }
        position = [this.row + direction, this.col + direction];
        if (boardData.getPiece(position[0], position[1]) !== undefined) {
            if (
                boardData.getPiece(position[0], position[1]).color !==
                boardData.getPiece(this.row, this.col).color
            ) {
                result.push(position);
            }
        }
        position = [this.row + direction, this.col - direction];
        if (boardData.getPiece(position[0], position[1]) !== undefined) {
            if (
                boardData.getPiece(position[0], position[1]).color !==
                boardData.getPiece(this.row, this.col).color
            ) {
                result.push(position);
            }
        }
        return result;
    }
    getRookMoves(boardData) {
        let result = [];

        result = result.concat(this.getMovesInDirection(0 + 1, 0, boardData));
        result = result.concat(this.getMovesInDirection(0 - 1, 0, boardData));
        result = result.concat(this.getMovesInDirection(0, 0 + 1, boardData));
        result = result.concat(this.getMovesInDirection(0, 0 - 1, boardData));

        return result;
    }

    getMovesInDirection(directionRow, directionCol, boardData) {
        let result = [];

        for (let i = 1; i < BOARD_SIZE; i++) {
            let row = this.row + directionRow * i;
            let col = this.col + directionCol * i;
            if (boardData.getPiece(row, col) === undefined) {
                result.push([row, col]);
            } else if (
                boardData.getPiece(row, col).color !==
                boardData.getPiece(this.row, this.col).color
            ) {
                result.push([row, col]);
                //console.log("opponent");
                return result;
            } else if (
                boardData.getPiece(row, col).color ===
                boardData.getPiece(this.row, this.col).color
            ) {
                //console.log("player");
                return result;
            }
        }
        //console.log("all empty");
        return result;
    }
    getKnightMoves(boardData) {
        let result = [];
        const relativeMoves = [
            [0 + 2, 0 - 1],
            [0 + 2, 0 + 1],
            [0 + 1, 0 - 2],
            [0 + 1, 0 + 2],
            [0 - 2, 0 + 1],
            [0 - 2, 0 - 1],
            [0 - 1, 0 + 2],
            [0 - 1, 0 - 2],
        ];
        for (let relativeMove of relativeMoves) {
            let row = this.row + relativeMove[0];
            let col = this.col + relativeMove[1];
            if (boardData.getPiece(row, col) === undefined) {
                result.push([row, col]);
            } else {
                if (boardData.getPiece(row, col).color !==
                    boardData.getPiece(this.row, this.col).color) {
                    result.push([row, col]);
                }
            }
        }
        
        //result.push([this.row + 2, this.col - 1]);
        //result.push([this.row + 2, this.col + 1]);
        //result.push([this.row + 1, this.col - 2]);
        //result.push([this.row + 1, this.col + 2]);
        //result.push([this.row - 2, this.col + 1]);
        //result.push([this.row - 2, this.col - 1]);
        //result.push([this.row - 1, this.col + 2]);
        //result.push([this.row - 1, this.col - 2]);
        return result;
    }
    getBishopMoves(boardData) {
        let result = [];

        result = result.concat(
            this.getMovesInDirection(0 - 1, 0 + 1, boardData)
        );
        result = result.concat(
            this.getMovesInDirection(0 - 1, 0 - 1, boardData)
        );
        result = result.concat(
            this.getMovesInDirection(0 + 1, 0 - 1, boardData)
        );
        result = result.concat(
            this.getMovesInDirection(0 + 1, 0 + 1, boardData)
        );

        return result;
    }
    getKingMoves(boardData) {
        let result = [];

        const relativeMoves = [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, -1],
            [0, 1],
            [1, -1],
            [1, 0],
            [1, 1],
        ];
        for (let relativeMove of relativeMoves) {
            let row = this.row + relativeMove[0];
            let col = this.col + relativeMove[1];
            if (boardData.getPiece(row, col) === undefined) {
                result.push([row, col]);
            } else {
                if (
                    boardData.getPiece(row, col).color !==
                    boardData.getPiece(this.row, this.col).color
                ) {
                    result.push([row, col]);
                }
            }
        }

        return result;
    }
    getQueenMoves(boardData) {
        let result = [];

        result = result.concat(this.getMovesInDirection(0 + 1, 0, boardData));
        result = result.concat(this.getMovesInDirection(0 - 1, 0, boardData));
        result = result.concat(this.getMovesInDirection(0, 0 + 1, boardData));
        result = result.concat(this.getMovesInDirection(0, 0 - 1, boardData));

        result = result.concat(
            this.getMovesInDirection(0 - 1, 0 + 1, boardData)
        );
        result = result.concat(
            this.getMovesInDirection(0 - 1, 0 - 1, boardData)
        );
        result = result.concat(
            this.getMovesInDirection(0 + 1, 0 - 1, boardData)
        );
        result = result.concat(
            this.getMovesInDirection(0 + 1, 0 + 1, boardData)
        );
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
    }
    checkValid(possible, cell) {
        possible = possible.split("_");
        //console.log("possible = " + possible);
        cell = cell.split("_");
        //console.log("cell = " + cell);
        if (possible[0] === cell[0] && possible[1] === cell[1]) {
            return true;
        }
        return false;
    }
}

// Builds the board.
function build() {
    table = document.createElement("table");
    document.body.appendChild(table);
    for (let row = 0; row < BOARD_SIZE; row++) {
        let tr = document.createElement("tr");
        table.appendChild(tr); // creates new tr
        for (let col = 0; col < BOARD_SIZE; col++) {
            // i and j to switch places
            const td = document.createElement("td");
            td.style = "text-align: center; font-size: 60px;";
            if ((col + row) % 2 === 0) {
                td.classList.add("white");
                td.id = row + "_" + col;
                tr.appendChild(td);
            } else {
                td.classList.add("dark");
                td.id = row + "_" + col;
                tr.appendChild(td);
            }
            td.addEventListener("click", (event) =>
                onCellClick(event, row, col)
            );
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
    if (previousPossible.length > 1){
        previousPossible.shift()
    }
    // Clean board.
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            table.rows[i].cells[j].classList.remove("possibleMove");
        }
    }
    let previousSelection = selectedCell; 

    const piece = boardData.getPiece(row, col);
    if (piece !== undefined) {
        let possibleMoves = piece.getPossibleMoves(boardData);
        for (let possibleMove of possibleMoves) {
            const cell = table.rows[possibleMove[0]].cells[possibleMove[1]];
            cell.classList.add("possibleMove");
            previousPossible.push(cell.id);
        }
        //previousPossible.push(cell.id);
    }
    if (selectedCell !== undefined) {
        selectedCell.classList.remove("clicked");
    }
    selectedCell = event.currentTarget;
    selectedCell.classList.add("clicked");
    
    let cell = table.rows[row].cells[col];
    // Relocating the piece to a possible move - works for first move.
    if (cell.firstChild === null) {
        for (let possibleMove of previousPossible) {
            if (boardData.checkValid(possibleMove, selectedCell.id)) {
                cell.appendChild(previousSelection.firstChild);
            }
        }
    }
}

// Adds the image to the cell.
function addImg(cell, color, name) {
    const img = document.createElement("img");
    img.style = "width: 60px;height:60px;";
    img.src = "pieces/" + color + name + ".svg";
    cell.appendChild(img);
}

// Puts the pieces on the board
function getInitialPieces() {
    let result = [];
    addFirstRowPieces(result, 0, DARK_PLAYER);
    addFirstRowPieces(result, 7, WHITE_PLAYER);
    for (let i = 0; i < 8; i++) {
        result.push(new Piece(1, i, DARK_PLAYER, PAWN));
        result.push(new Piece(6, i, WHITE_PLAYER, PAWN));
    }
    return result;
}
// To avoid duplicate in getInitialBoard().
function addFirstRowPieces(result, row, color) {
    result.push(new Piece(row, 0, color, ROOK));
    result.push(new Piece(row, 1, color, KNIGHT));
    result.push(new Piece(row, 2, color, BISHOP));
    result.push(new Piece(row, 3, color, QUEEN));
    result.push(new Piece(row, 4, color, KING));
    result.push(new Piece(row, 5, color, BISHOP));
    result.push(new Piece(row, 6, color, KNIGHT));
    result.push(new Piece(row, 7, color, ROOK));
}

window.addEventListener("load", build()); // Builds the chessboard.
