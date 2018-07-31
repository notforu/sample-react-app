import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import Router from "routes/router";
import { configureStore } from "store";
import "assets/style.scss";

const store = configureStore();

function renderApp(AppRouter) {
	ReactDOM.render(
		<Provider store={store}>
			<AppRouter />
		</Provider>,
		document.getElementById("root"),
	);
}

renderApp(Router);

if (module.hot) {
	module.hot.accept("routes/router", () => {
		const newRouter = require("routes/router").default;
		renderApp(newRouter);
	});
}
