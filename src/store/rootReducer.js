import { combineReducers } from "redux";
import auth from "entities/auth";
import repos from "entities/repos";
import contributors from "entities/contributors";

const rootReducer = combineReducers({
	auth,
	repos,
	contributors
});

export default rootReducer;
