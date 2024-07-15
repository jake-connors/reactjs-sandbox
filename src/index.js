import React from 'react';
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { rootReducer, initial } from "./redux/reducers";
import thunkMiddleware from "redux-thunk";
import App from './App';
import "./styles/styles.css";

const store = createStore(
    rootReducer,
    initial,
    applyMiddleware(
        thunkMiddleware
    )
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);