import { takeLatest, call, put } from "redux-saga/effects";
import Api from "shared/api";

/* Constants */

export const FETCH_REPOS_REQUEST = "FETCH_REPOS_REQUEST";
export const FETCH_REPOS_SUCCESS = "FETCH_REPOS_SUCCESS";
export const FETCH_REPOS_FAILURE = "FETCH_REPOS_FAILURE";

/* Action Creators */

export function fetchReposRequest(username) {
	return { type: FETCH_REPOS_REQUEST, payload: { username } };
}

export function fetchReposSuccess(items) {
	return { type: FETCH_REPOS_SUCCESS, payload: { items } };
}

export function fetchReposFailure(errorMessage) {
	return { type: FETCH_REPOS_FAILURE, payload: { errorMessage } };
}

/* Sagas */

function* fetchRepos(action) {
	const { username } = action.payload;
	try {
		let repos = [];
		if (username) {
			repos = yield call(Api.fetchRepos, username);
		} else {
			repos = yield call(Api.fetchLoggedUserRepos);
		}
		yield put(fetchReposSuccess(repos));
	} catch (e) {
		console.log(e);
		yield put(fetchReposFailure("Fetching repos failed because of an error..."));
	}
}

export function* reposSaga() {
	yield takeLatest(FETCH_REPOS_REQUEST, fetchRepos);
}

/* Reducer */

export default function reposReducer(state = { isLoading: false, items: [], errorMessage: "" }, action) {
	switch (action.type) {
	case FETCH_REPOS_REQUEST: {
		return {
			...state,
			isLoading: true,
			errorMessage: "",
			items: []
		};
	}
	case FETCH_REPOS_SUCCESS: {
		const { items } = action.payload;
		return {
			...state,
			isLoading: false,
			items
		};
	}
	case FETCH_REPOS_FAILURE: {
		const { errorMessage } = action.payload;
		return {
			...state,
			isLoading: false,
			errorMessage
		};
	}
	default: {
		return state;
	}
	}
}
