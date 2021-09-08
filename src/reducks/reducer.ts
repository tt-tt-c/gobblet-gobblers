import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Player } from "../components/classes";
import { Board } from "../components/classes/Board";
import { colors, sizes } from "../components/classes/typeAlias";
import { gameActions } from "./action";
import { History } from "history";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

export type SelectedPieceAlias = {
    size: sizes;
    position: string;
    onBoard: boolean;
    index: number;
};

export type Players = {
    blue: Player;
    orange: Player;
};

export type State = {
    nextPlayer: colors;
    selectedPiece: SelectedPieceAlias | null;
    board: Board;
    players: Players;
};

export const generateInitalState = (): State => {
    const initialState: State = {
        nextPlayer: "blue",
        selectedPiece: null,
        board: new Board(),
        players: {
            blue: new Player("blue"),
            orange: new Player("orange"),
        },
    };
    return initialState;
};

export const initialState: State = {
    nextPlayer: "blue",
    selectedPiece: null,
    board: new Board(),
    players: {
        blue: new Player("blue"),
        orange: new Player("orange"),
    },
};

export const Reducer = reducerWithInitialState(generateInitalState())
    .case(gameActions.updateNextUserAction, (state) => {
        return {
            ...state,
            nextPlayer: `${state.nextPlayer === "blue" ? "orange" : "blue"}`,
        };
    })
    .case(gameActions.deleteSelectedPiece, (state) => {
        return { ...state, selectedPiece: null };
    })
    .case(gameActions.updateSelectedPiece, (state, payload) => {
        return { ...state, selectedPiece: payload };
    })
    .case(gameActions.updateBoardState, (state, payload) => {
        return { ...state, board: payload };
    })
    .case(gameActions.updatePlayers, (state, payload) => {
        return { ...state, player: payload };
    })
    .case(gameActions.initGame, (state,payload) => {
        return {...state, nextPlayer: payload.nextPlayer, players: payload.players, board: payload.board, selectedPiece: payload.selectedPiece}
    })
    .default(() => {
        return { ...initialState };
    });

export const rootReducer = (history: History) =>
    combineReducers({
        router: connectRouter(history),
        state: Reducer,
    });
