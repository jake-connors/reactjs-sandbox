import { connect } from "react-redux";
import { useEffect } from "react";

function Main({ user_info }) {

    useEffect(() => {
        console.log('main loaded');
        console.log('redux-state: user_info: ', user_info);
    }, []);

    return (
        <div className="row">
            <h1 className="col-sm-12">Main</h1>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        user_info: state.user_info
    }
} 

export default connect(mapStateToProps)(Main);