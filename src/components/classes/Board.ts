import { BoardCell } from "./BoardCell";
import { colors, sizes } from "./typeAlias";

export type BoardState = [
    BoardCell,
    BoardCell,
    BoardCell,
    BoardCell,
    BoardCell,
    BoardCell,
    BoardCell,
    BoardCell,
    BoardCell
];

export class Board {
    private _boardState: BoardState;
    constructor(_boardState?: BoardState) {
        if (_boardState) this._boardState = _boardState;
        else {
            const boardState: BoardState = [
                new BoardCell(),
                new BoardCell(),
                new BoardCell(),
                new BoardCell(),
                new BoardCell(),
                new BoardCell(),
                new BoardCell(),
                new BoardCell(),
                new BoardCell(),
            ];
            this._boardState = boardState;
        }
    }

    get boardState() {
        return this._boardState;
    }
    setBoardState(boardIndex: number, size: sizes, color: colors | "") {
        this._boardState[boardIndex].cellState[size] = color;
    }

    getSettableIndexes(size: sizes): number[] {
        const indexes: number[] = [];
        for (let i = 0; i < this._boardState.length; i++) {
            const cell = this._boardState[i].cellState;

            let isPlaceable: boolean = true;
            for (let j = cell.length - 1; j >= size; j--) {
                if (cell[j] !== "") {
                    isPlaceable = false;
                    break;
                }
            }
            if (isPlaceable) indexes.push(i);
        }
        return indexes;
    }

    getWinnedPlayer(nextPlayer: colors): colors | "" {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        let hasWinnedPlayer:(colors | "") = ""

        for (let i = 0; i < lines.length; i++) {
            const stdColor = this._boardState[lines[i][0]].getTopColor()
            let hasWinned = true;
            for (let j = 1; j < lines[i].length; j++) {
                if (stdColor !== this._boardState[lines[i][j]].getTopColor()) {
                    hasWinned = false;
                    break;
                }
            }
            if(hasWinned) hasWinnedPlayer = stdColor;
            if (hasWinned && hasWinnedPlayer === nextPlayer) return hasWinnedPlayer;
        }
        return hasWinnedPlayer;
    }
}
