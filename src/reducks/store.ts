import { createStore, applyMiddleware } from "redux";
import {
    routerMiddleware,
    RouterState,
} from "connected-react-router";
import { createLogger } from "redux-logger";
import { createBrowserHistory } from "history";
import { rootReducer, State } from "./reducer";

export interface AppState {
    state: State;
    router: RouterState;
};

const logger = createLogger();

export const history = createBrowserHistory();

export function configureStore() {
    const middlewares = [routerMiddleware(history), logger];
    const middlewareEnhancer = applyMiddleware(...middlewares);
    const store = createStore(
        rootReducer(history),
        middlewareEnhancer
    );
    return store;
}
