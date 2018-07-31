import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { Layout, AuthRoute } from "shared/containers";
import { history } from "store";
import NotFound from "./NotFound";
import Repos from "./Repos";
import Contributors from "./Contributors";
import Home from "./Home";
import Login from "./Login";

const Router = () => <ConnectedRouter history={history}>
	<Layout>
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/login" component={Login} />
			<AuthRoute path="/repos/:username?" component={Repos} />
			<AuthRoute path="/contributors/:userName/:repoName" component={Contributors} />
			<Route component={NotFound} />
		</Switch>
	</Layout>
</ConnectedRouter>;

export default Router;
