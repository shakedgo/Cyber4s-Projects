const BOARD_SIZE = 8;
const WHITE_PLAYER = "White";
const DARK_PLAYER = "Black";

const PAWN = "Pawn";
const ROOK = "Rook";
const KNIGHT = "Knight";
const BISHOP = "Bishop";
const KING = "King";
const QUEEN = "Queen";
const PIECES = [ROOK, KNIGHT, BISHOP, KING, QUEEN, BISHOP, KNIGHT, ROOK];

let selectedCell;
let boardData;
let table;
let previousPossible = [];
let previousColor;
let previousName;
let previousLocation;
let pieceTurn = WHITE_PLAYER;
let winner;

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
    // Clean board.
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            table.rows[i].cells[j].classList.remove("possibleMove");
        }
    }
    let previousSelection = selectedCell;

    const piece = boardData.getPiece(row, col);
    paintPossibleMoves(row, col, piece);

    if (selectedCell !== undefined) {
        selectedCell.classList.remove("clicked");
    }
    selectedCell = event.currentTarget;
    selectedCell.classList.add("clicked");

    movePiece(previousSelection, piece, row, col);
}

// Painting the possible moves
function paintPossibleMoves(row, col, piece) {
    if (piece !== undefined && pieceTurn === piece.color) {
        let possibleMoves = piece.getPossibleMoves(boardData);
        previousPossible = [];
        for (let possibleMove of possibleMoves) {
            const cell = table.rows[possibleMove[0]].cells[possibleMove[1]];
            cell.classList.add("possibleMove");
            previousPossible.push(cell.id);
        }
        chagngePrevious(row, col);
    }
}

// Relocating the piece.
function movePiece(previousSelection, piece, row, col) {
    // For regular move.
    if (selectedCell.firstChild === null) {
        for (let possibleMove of previousPossible) {
            if (boardData.checkValid(possibleMove, selectedCell.id)) {
                selectedCell.appendChild(previousSelection.firstChild); // Replace the child (piece/img)

                newLocationBoardData();
                changeTurn();
            }
        }
    }
    // For takes (eating).
    else if (
        selectedCell.firstChild !== null &&
        piece.color !== previousColor
    ) {
        for (let possibleMove of previousPossible) {
            if (boardData.checkValid(possibleMove, selectedCell.id)) {
                const removedPiece = boardData.removePiece(row, col); // deletes the previous piece from boardata
                // Checks if the removed piece is king for win.
                if (removedPiece !== undefined && removedPiece.name === KING) {
                    winner = previousColor;
                }
                selectedCell.removeChild(selectedCell.firstChild); // deletes the img.
                selectedCell.appendChild(previousSelection.firstChild); // Replace the child (piece/img)

                newLocationBoardData();
                changeTurn();
            }
        }
        chagngePrevious(row, col);
    }
    // For
    if (winner !== undefined) {
        winGame();
    }
}

//Gets the last piece location in boardData and rewrite it to the new one.
function newLocationBoardData() {
    let cellLocation = selectedCell.id.split("_");
    boardData.pieces[
        boardData.getPieceNum(previousLocation[0], previousLocation[1])
    ] = new Piece(
        parseInt(cellLocation[0]),
        parseInt(cellLocation[1]),
        previousColor,
        previousName
    );
}

function winGame() {
    const winnerPopup = document.createElement("div");
    winnerPopup.textContent = winner + " player wins!";
    winnerPopup.classList.add("winner-dialog");
    table.appendChild(winnerPopup);
}

function chagngePrevious(row, col) {
    previousColor = boardData.getPiece(row, col).color;
    previousName = boardData.getPiece(row, col).name;
    previousLocation = [row, col];
}

function changeTurn() {
    if (pieceTurn === WHITE_PLAYER) {
        pieceTurn = DARK_PLAYER;
    } else {
        pieceTurn = WHITE_PLAYER;
    }
}

// Adds the image to the cell.
function addImg(cell, color, name) {
    const img = document.createElement("img");
    img.style = "width: 60px;height:60px;";
    img.src = "pieces/" + color + name + ".svg";
    img.draggable = false; // To not drag image
    cell.appendChild(img);
}

function getInitialPieces() {
    // Create list of pieces (32 total)
    let result = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
        result.push(new Piece(7, i, WHITE_PLAYER, PIECES[i]));
        result.push(new Piece(6, i, WHITE_PLAYER, PAWN));
        result.push(new Piece(1, i, DARK_PLAYER, PAWN));
        result.push(new Piece(0, i, DARK_PLAYER, PIECES[i]));
    }
    return result;
}

window.addEventListener("load", build()); // Builds the chessboard.
