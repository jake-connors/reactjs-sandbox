import { connect } from "react-redux";
import { setUserInfo } from "../redux/actions";

function Settings({ user_info, dispatch }) {
    
    function handleCookiesPopupButtons(showPopup) {
        let newUserInfo = {
            ...user_info,
            show_cookies_popup: showPopup
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
                    <button
                        className="btn btn-primary"
                        onClick={() => handleCookiesPopupButtons(true)}
                        disabled={!user_info.show_cookies_popup}
                    >
                        Show Cookies Popup
                    </button>
                    <button
                        className="btn btn-dark" 
                        onClick={() => handleCookiesPopupButtons(false)}
                        disabled={user_info.show_cookies_popup}
                        style={{ marginLeft: "10px" }}
                    >
                        Hide Cookies Popup
                    </button>
                </div>
            </div>
            <div className="clear10"></div>
            <div className="clear20"></div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        user_info: state.user_info
    }
} 

export default connect(mapStateToProps)(Settings);