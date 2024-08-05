import { connect } from "react-redux";
import { useEffect } from "react";
import { test_api_get, test_api_post } from "../api/api";

function Main({ user_info }) {

    useEffect(() => {
        console.log('main loaded');
        console.log('redux-state: user_info: ', user_info);
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
        <div className="row">
            <h1 className="col-sm-12">Main</h1>
            <button className="btn btn-primary col-sm-3" onClick={() => { handleTest("get"); }}>Test Get</button>
            <button className="btn btn-primary col-sm-3" onClick={() => { handleTest("post"); }}>Test Post</button>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        user_info: state.user_info
    }
} 

export default connect(mapStateToProps)(Main);