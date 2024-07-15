import { connect } from "react-redux";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Main from "./containers/Main";
import About from "./containers/About";
import Documentation from "./containers/Documentation";
import Settings from "./containers/Settings";
import Contact from "./containers/Contact";

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
            </Routes>
        </Router>
    );
}

export default connect()(App);