import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

//import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/general/store";

render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);
