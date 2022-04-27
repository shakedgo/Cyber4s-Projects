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
    getPieceNum(row, col) {
        let count = 0;
        for (let pie of boardData.pieces) {
            if (pie.row === row && pie.col === col) {
                return count;
            }
            count++;
        }
    }
    removePiece(row, col) {
        for (let i = 0; i < this.pieces.length; i++) {
            const piece = this.pieces[i];
            if (piece.row === row && piece.col === col) {
                // Remove piece at index i
                this.pieces.splice(i, 1);
                return piece;
            }
        }
    }
}
