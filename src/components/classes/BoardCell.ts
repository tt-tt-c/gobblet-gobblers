import { colors, sizes } from "./typeAlias";

type CellAlias = [colors | "", colors | "", colors | ""];
export class BoardCell {
    private _cellState: CellAlias
    constructor(_cellState?: CellAlias) {
        if(_cellState)       this._cellState = _cellState
        else this._cellState = ["","",""]
    }

    get cellState() {return this._cellState}
    set cellState(cellState: CellAlias) {
        this._cellState = cellState
    }

    getTopColor():(colors | "") {
        for(let i=this.cellState.length-1;i>=0;i--) {
            if(this._cellState[i] !== "") return this._cellState[i]
        }
        return ""
    }

    getTopSize():sizes {
        let i;
        for(i=this.cellState.length-1;i>=0;i--) {
            if(this._cellState[i] !== "") break;
        }
        const size:sizes = i === 2 ? 2: i === 1 ? 1 : 0;
        return size;
    }
}
