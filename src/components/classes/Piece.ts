import { colors, sizes } from "./typeAlias"

export class Piece {
    constructor(private _color:colors, private _size: sizes) {
    }

    get color() {
        return this._color
    }
    set color(color: colors) {
        this._color = color
    }

    get size() {
        return this._size
    }
    set size(size: sizes) {
        this._size = size
    }
}