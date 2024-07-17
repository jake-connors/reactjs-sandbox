import { connect } from "react-redux";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from "./containers/Navbar";
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
            <div className="container">
                <Navbar />
                <Routes>
                    <Route path="/" exact Component={Main} />
                    <Route path="/about" exact Component={About} />
                    <Route path="/documentation" exact Component={Documentation} />
                    <Route path="/settings" exact Component={Settings} />
                    <Route path="/contact" exact Component={Contact} />
                    <Route path="/popper" exact Component={Popper} />
                    <Route path="/popup_notify" exact Component={PopupNotify} />
                    <Route path="/drag_and_drop" exact Component={DragAndDrop} />
                    <Route path="/email" exact Component={Email} />
                    <Route path="/excel" exact Component={Excel} />
                    <Route path="/other" exact Component={Other} />
                </Routes>
            </div>
        </Router>
    );
}

export default connect()(App);