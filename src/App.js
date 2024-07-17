import { connect } from "react-redux";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Main from "./containers/Main";
import About from "./containers/About";
import Documentation from "./containers/Documentation";
import Settings from "./containers/Settings";
import Contact from "./containers/Contact";
import Popper from "./containers/Popper";
import PopupNotify from "./containers/PopupNotify";
import DragAndDrop from "./containers/DragAndDrop";
import Email from "./containers/Email";
import Excel from "./containers/Excel";
import Other from "./containers/Other";

function App() {

    useEffect(() => {
        // console.clear();
        console.log('app loaded');
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" Component={Main} />
                <Route path="/about" Component={About} />
                <Route path="/documentation" Component={Documentation} />
                <Route path="/settings" Component={Settings} />
                <Route path="/contact" Component={Contact} />
                <Route path="/popper" Component={Popper} />
                <Route path="/popup_notify" Component={PopupNotify} />
                <Route path="/drag_and_drop" Component={DragAndDrop} />
                <Route path="/email" Component={Email} />
                <Route path="/excel" Component={Excel} />
                <Route path="/other" Component={Other} />
            </Routes>
        </Router>
    );
}

export default connect()(App);