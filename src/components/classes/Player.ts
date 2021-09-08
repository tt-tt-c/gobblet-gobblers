import { colors, sizes } from "./typeAlias";
import { Piece } from "./Piece"

export class PlayerPiece extends Piece {
    constructor(_color:colors, _size: sizes, private _isUsed: boolean = false) {
        super(_color, _size)
        this._isUsed = _isUsed;
    }

    get isUsed() {
        return this._isUsed
    }

    set isUsed(isUsed :boolean) {
        this._isUsed = isUsed
    }

}

type PlayerPieces = [PlayerPiece, PlayerPiece,PlayerPiece,PlayerPiece,PlayerPiece,PlayerPiece]

export class Player {
    private _pieces: PlayerPieces
    constructor(private _color:colors, _pieces?: PlayerPieces) {
        this._color = _color;
        if(_pieces) this._pieces = [..._pieces]
        else this._pieces = [...this.setInitPieces(_color)]
    }

    get color() {
        return this._color
    }
    set color(color: colors) {
        this._color = color
    }

    get pieces(): PlayerPieces {
        return this._pieces
    }
    set pieces(pieces: PlayerPieces) {
        this._pieces = [...pieces]
    }

    setInitPieces(color: colors):PlayerPieces {
        const pieceL1 = new PlayerPiece(color, 2)
        const pieceL2 = new PlayerPiece(color, 2)
        const pieceM1 = new PlayerPiece(color, 1)
        const pieceM2 = new PlayerPiece(color, 1)
        const pieceS1 = new PlayerPiece(color, 0)
        const pieceS2 = new PlayerPiece(color, 0)
        return [pieceL1,pieceL2,pieceM1, pieceM2, pieceS1, pieceS2]
    }

    getPiece(index: number) {
        return this._pieces[index]
    }
}