import { takeLatest, call, put } from "redux-saga/effects";
import Api from "shared/api";

/* Constants */

export const FETCH_CONTRIBUTORS_REQUEST = "FETCH_CONTRIBUTORS_REQUEST";
export const FETCH_CONTRIBUTORS_SUCCESS = "FETCH_CONTRIBUTORS_SUCCESS";
export const FETCH_CONTRIBUTORS_FAILURE = "FETCH_CONTRIBUTORS_FAILURE";

/* Action Creators */

export function fetchContributorsRequest(userName, repoName) {
	return { type: FETCH_CONTRIBUTORS_REQUEST, payload: { userName, repoName } };
}

export function fetchContributorsSuccess(items) {
	return { type: FETCH_CONTRIBUTORS_SUCCESS, payload: { items } };
}

export function fetchContributorsFailure(errorMessage) {
	return { type: FETCH_CONTRIBUTORS_FAILURE, payload: { errorMessage } };
}

/* Sagas */

function* fetchContributors(action) {
	const { userName, repoName } = action.payload;
	try {
		const contributors = yield call(Api.fetchContributors, userName, repoName);
		yield put(fetchContributorsSuccess(contributors));
	} catch (e) {
		console.log(e);
		yield put(fetchContributorsFailure("Fetching contributors failed because of an error..."));
	}
}

export function* contributorsSaga() {
	yield takeLatest(FETCH_CONTRIBUTORS_REQUEST, fetchContributors);
}

/* Reducer */

export default function contributorsReducer(state = { isLoading: false, items: [], errorMessage: "" }, action) {
	switch (action.type) {
	case FETCH_CONTRIBUTORS_REQUEST: {
		return {
			...state,
			isLoading: true,
			errorMessage: "",
			items: []
		};
	}
	case FETCH_CONTRIBUTORS_SUCCESS: {
		const { items } = action.payload;
		return {
			...state,
			isLoading: false,
			items
		};
	}
	case FETCH_CONTRIBUTORS_FAILURE: {
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
