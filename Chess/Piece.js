class Piece {
    constructor(row, col, color, name) {
        this.row = row;
        this.col = col;
        this.color = color;
        this.name = name;
    }

    getPossibleMoves(boardData) {
        if (winner !== undefined){
            return [];
        }
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
                if (
                    boardData.getPiece(row, col).color !==
                    boardData.getPiece(this.row, this.col).color
                ) {
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
