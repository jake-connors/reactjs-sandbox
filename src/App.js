import { connect } from "react-redux";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Main from "./containers/Main";

function App() {

    useEffect(() => {
        // console.clear();
        console.log('app loaded');
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" Component={Main} />
                <Route path="/about" Component={Main} />
                <Route path="/documentation" Component={Main} />
                <Route path="/settings" Component={Main} />
                <Route path="/contact" Component={Main} />
            </Routes>
        </Router>
    );
}

export default connect()(App);