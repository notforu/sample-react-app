import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

export const history = createBrowserHistory();

export function configureStore() {
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	const loggerMiddleware = createLogger();
	const sagaMiddleware = createSagaMiddleware();
	const routingMiddleware = routerMiddleware(history);

	const store = createStore(
		connectRouter(history)(rootReducer),
		composeEnhancers(
			applyMiddleware(
				routingMiddleware,
				sagaMiddleware,
				loggerMiddleware,
			)
		)
	);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept("entities/", () => {
			const nextRootReducer = require("./rootReducer").default;
			store.replaceReducer(nextRootReducer);
		});
	}

	sagaMiddleware.run(rootSaga);
	return store;
}
