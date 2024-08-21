import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from "./containers/Navbar";
import Main from "./containers/Main";
import About from "./containers/About";
import Documentation from "./containers/Documentation";
import Settings from "./containers/Settings";
import Contact from "./containers/Contact";
import JsExamples from "./containers/JsExamples";
import TypeaheadTable from "./components/js_examples/TypeaheadTable";
import DragDrop from "./components/js_examples/DragDrop";
import Popper from "./components/js_examples/Popper";
import PhpExamples from "./containers/PhpExamples";
import Email from "./components/php_examples/Email";
import Excel from "./components/php_examples/Excel";
import PythonExamples from "./containers/PythonExamples";
import ArtificialIntel from "./components/python_examples/ArtificialIntel";
import Other from "./containers/Other";
import CookiesPopup from "./components/CookiesPopup";
import { setUserInfo } from "./redux/actions/";
import { get_all_cookies } from "./api/cookies";

function App({ dispatch, user_info }) {

    const [allCookies, setAllCookies] = useState([]);

    useEffect(() => {
        // console.clear();
        // console.log('app loaded v4.0');
        init();
    }, []);

    async function init() {
        let resp = await get_all_cookies();
        console.log('resp : ', resp);
        let user_cookies = resp.data.user_cookies;
        let userInfo = {
            site_style: user_cookies.site_style.style,
            cookie_settings: user_cookies.user_cookie_settings,
            show_cookies_popup: user_cookies.user_cookie_settings.expires == -1
        };
        dispatch(setUserInfo(userInfo));
        setAllCookies(resp.data.all_cookies);
    }

    return (
        <Router>
            <Navbar />
            <div id="app-container-wrapper" className={user_info.site_style}>
                <div id="app-container" className="container">
                <Routes>
                    <Route path="/" exact Component={Main} />
                    <Route path="/about" exact Component={About} />
                    <Route path="/documentation" exact Component={Documentation} />
                    <Route path="/settings" exact Component={Settings} />
                    <Route path="/contact" exact Component={Contact} />
                    <Route path="/js_examples" exact Component={JsExamples} />
                    <Route path="/js_examples/typeahead_table" Component={TypeaheadTable} />
                    <Route path="/js_examples/drag_drop" Component={DragDrop} />
                    <Route path="/js_examples/popper" Component={Popper} />
                    <Route path="/php_examples" exact Component={PhpExamples} />
                    <Route path="/php_examples/email" Component={Email} />
                    <Route path="/php_examples/excel" Component={Excel} />
                    <Route path="/python_examples" exact Component={PythonExamples} />
                    <Route path="/python_examples/ai" Component={ArtificialIntel} />
                    <Route path="/other" Component={Other} />
                </Routes>
                {allCookies.length > 0 && user_info.show_cookies_popup != undefined && user_info.show_cookies_popup && (
                    <CookiesPopup allCookies={allCookies} />
                )}
                </div>
            </div>
        </Router>
    );
}

function mapStateToProps(state) {
    return {
        user_info: state.user_info
    }
} 

export default connect(mapStateToProps)(App);