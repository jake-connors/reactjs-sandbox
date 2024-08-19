import { connect } from "react-redux";
import { setUserInfo } from "../redux/actions";

function Settings({ user_info, dispatch }) {

    function handleShowCookiesPopup() {
        let newUserInfo = {
            ...user_info,
            show_cookies_popup: true
        };
        dispatch(setUserInfo(newUserInfo));
    }
    
    return (
        <div id="settings-container">
            <div className="row">
                <h2 className="col-sm-12">Settings</h2>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <button className="btn btn-primary" onClick={handleShowCookiesPopup}>Show Cookies Popup</button>
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        user_info: state.user_info
    }
} 

export default connect(mapStateToProps)(Settings);