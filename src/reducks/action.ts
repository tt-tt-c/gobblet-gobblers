import actionCreatorFactory from "typescript-fsa";
import { Board } from "../components/classes/Board";
import { Players, SelectedPieceAlias, State  } from "./reducer";

const actionCreator = actionCreatorFactory();


export const gameActions = {
    updateNextUserAction: actionCreator("UPDATE_NEXT_PLAYER"),
    updateSelectedPiece: actionCreator<SelectedPieceAlias>(
        "UPDATE_SELECTEDP_PIECE"
    ),
    deleteSelectedPiece: actionCreator("DELETE_SELECTEDP_PIECE"),
    updateBoardState: actionCreator<Board>('UPDATE_BOARD_STATE'),
    updatePlayers: actionCreator<Players>('UPDATE_PLAYER_STATE'),
    initGame: actionCreator<State>('INIT_GAME'),
};
