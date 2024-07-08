import { combineReducers } from "redux";
import user_info from "./user_info";
import initial from "./initial";

const rootReducer = combineReducers({
    user_info,
});

export { rootReducer, initial };