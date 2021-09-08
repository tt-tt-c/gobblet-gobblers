import { State } from "./reducer";

// auth情報を取得するSelector
export const getNextPlayer = (state: State) => state.nextPlayer;

export const getSelectedPiece = (state: State) => state.selectedPiece;

export const getBoard = (state: State) => state.board;

export const getPlayers = (state: State) => state.players;
