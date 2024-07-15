import { connect } from "react-redux";
import { useEffect } from "react";
import { test_api_get, test_api_post } from "../api/api";
import Navbar from "./Navbar";

function Main() {

    useEffect(() => {
        console.log('main loaded');
    }, []);

    async function handleTest(method) {
        console.log('test');
        if (method == "get") {
            var resp = await test_api_get();
        } else {
            var resp = await test_api_post(); 
        }
        console.log("resp : ", resp);
    }

    return (
        <div className="container">
            <Navbar />
            <div id="header"></div>
            <h1>Main</h1>
            <button className="btn btn-primary" onClick={() => { handleTest("get"); }}>Test Get</button>
            <button className="btn btn-primary" onClick={() => { handleTest("post"); }}>Test Post</button>
        </div>
    );
}

export default connect()(Main);