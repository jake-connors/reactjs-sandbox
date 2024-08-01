import { useEffect, forwardRef } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from "./containers/Navbar";
import Main from "./containers/Main";
import About from "./containers/About";
import Documentation from "./containers/Documentation";
import Settings from "./containers/Settings";
import Contact from "./containers/Contact";
import JsExamples from "./containers/JsExamples";
import Email from "./containers/php_examples/Email";
import Excel from "./containers/php_examples/Excel";
import Other from "./containers/Other";

function App() {

    useEffect(() => {
        // console.clear();
        console.log('app loaded v4.0');
    }, []);

    return (
        <Router>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" exact Component={Main} />
                    <Route path="/about" exact Component={About} />
                    <Route path="/documentation" exact Component={Documentation} />
                    <Route path="/settings" exact Component={Settings} />
                    <Route path="/contact" exact Component={Contact} />
                    <Route path="/js_examples" exact Component={JsExamples} />
                    <Route path="/php_examples/email" exact Component={Email} />
                    <Route path="/php_examples/excel" exact Component={Excel} />
                    <Route path="/other" exact Component={Other} />
                </Routes>
            </div>
        </Router>
    );
}

export default forwardRef(App);