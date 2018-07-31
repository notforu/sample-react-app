import { takeLatest, call, put } from "redux-saga/effects";
import API from "shared/api";
import { history } from "store/store";

/* Constants */

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

/* Action Creators */

export function loginRequest(code) {
	return { type: LOGIN_REQUEST, payload: { code } };
}

export function loginSuccess(accessToken) {
	return { type: LOGIN_SUCCESS, payload: { accessToken } };
}

export function loginFailure(errorMessage) {
	return { type: LOGIN_FAILURE, payload: { errorMessage } };
}

/* Sagas */

const githubOAuthURL = Config.authUrl + "?client_id=" + Config.clientId + "&redirect_uri=" + Config.redirectUrl;
function* login() {
	const { location } = history;
	const redirectPathname = location.state ? location.state.from.pathname : "/";
	const queryParams = new URLSearchParams(location.search);
	const oauthCode = queryParams.get("code");
	// hide query params in address bar
	history.replace(location.pathname);
	if (!oauthCode) {
		window.location = githubOAuthURL + "login?redirectTo=" + redirectPathname;
	}
	try {
		const success = yield call(API.getAccessToken, oauthCode);
		if (success) {
			yield put(loginSuccess());
			history.push(queryParams.get("redirectTo"));
		} else {
			yield put(loginFailure("Access token expired."));
		}
	} catch (e) {
		console.log(e);
		yield put(loginFailure("Login failed because of an error."));
	}
}

export function* authSaga() {
	yield takeLatest(LOGIN_REQUEST, login);
}

/* Reducer */

export default function authReducer(state = { isLoading: true, authenticated: false, errorMessage: "" }, action) {
	switch (action.type) {
	case LOGIN_REQUEST: {
		return {
			...state,
			isLoading: true,
			errorMessage: ""
		};
	}
	case LOGIN_SUCCESS: {
		return {
			...state,
			isLoading: false,
			errorMessage: "",
			authenticated: true
		};
	}
	case LOGIN_FAILURE: {
		const { errorMessage } = action.payload;
		return {
			...state,
			isLoading: false,
			authenticated: false,
			errorMessage
		};
	}
	default: {
		return state;
	}
	}
}
