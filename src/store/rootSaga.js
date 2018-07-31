import { all } from "redux-saga/effects";
import { authSaga } from "entities/auth";
import { reposSaga } from "entities/repos";
import { contributorsSaga } from "entities/contributors";

export default function* rootSaga() {
	yield all([
		authSaga(),
		reposSaga(),
		contributorsSaga()
	]);
}
