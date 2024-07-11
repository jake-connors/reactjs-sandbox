import { createStore, applyMiddleware } from "redux";
import { rootReducer, initial } from "../reducers";
import thunkMiddleware from "redux-thunk";

export const store = createStore(
    rootReducer,
    initial,
    applyMiddleware(
        thunkMiddleware // lets us dispatch() functions
    )
);
