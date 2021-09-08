import { Switch, Route, Redirect } from "react-router-dom";
import { Layout } from "./components/elements/Layout";
import {TopPage, GamePage} from './templates'

export const Path = {
    top: "/",
    game: "/game",
};

const RouteContainer: React.FC = () => {
    return(
        (
            <Layout>
                <Switch>
                    <Route exact path={Path.top} component={TopPage} />
                    <Route exact path={Path.game} component={GamePage} />
                    <Redirect to={Path.top} />
                </Switch>
            </Layout>
        )
    )
} 

export default RouteContainer;
