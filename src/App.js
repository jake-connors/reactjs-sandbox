import { connect } from "react-redux";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from "./containers/Navbar";
import Main from "./containers/Main";
import About from "./containers/About";
import Documentation from "./containers/Documentation";
import Settings from "./containers/Settings";
import Contact from "./containers/Contact";
import Frontend from "./containers/Frontend";
import Email from "./containers/backend/Email";
import Excel from "./containers/backend/Excel";
import Other from "./containers/Other";

function App() {

    useEffect(() => {
        // console.clear();
        console.log('app loaded v4.0');
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
                    <Route path="/frontend" exact Component={Frontend} />
                    <Route path="/backend/email" exact Component={Email} />
                    <Route path="/backend/excel" exact Component={Excel} />
                    <Route path="/other" exact Component={Other} />
                </Routes>
            </div>
        </Router>
    );
}

export default connect()(App);