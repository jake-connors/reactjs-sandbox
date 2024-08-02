import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { rootReducer, initial } from "./redux/reducers";
import thunkMiddleware from "redux-thunk";
import App from './App';
import "./styles/styles.less";

const store = createStore(
    rootReducer,
    initial,
    applyMiddleware(
        thunkMiddleware
    )
);
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);