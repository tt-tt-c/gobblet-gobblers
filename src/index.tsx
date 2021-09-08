import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import {configureStore, history} from "./reducks/store";

import RouteContainer from "./RouteContainer";

const store = configureStore()


ReactDOM.render(
    <>
        <Provider store={store}>
            <Router history={history}>
                <RouteContainer />
            </Router>
        </Provider>
    </>,
    document.getElementById("root")
);
