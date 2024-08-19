import { connect } from "react-redux";
import { useState } from "react";
import { setUserInfo } from "../redux/actions";
import { allow_all_cookies } from "../api/cookies";
import Modal from "react-modal";

function CookiesPopup({ user_info, dispatch }) {

    const [showCookieSettingsModal, setShowCookieSettingsModal] = useState(false);

    async function handleAllowAllCookies() {
        let newUserInfo = {
            ...user_info,
            show_cookies_popup: false
        };
        let resp = await allow_all_cookies();
        console.log('resp ; ' , resp);
        if (resp.data.success) {
            newUserInfo.allowed_cookies = resp.data.allowed_cookies;
        }
        dispatch(setUserInfo(newUserInfo));
    }

    const modalStyles = {
        content: {
            background: "#00000080",
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            zIndex: 100000,
            borderRadius: "32px"
        }
    };
    
    return (
        <>
            <div id="cookies-popup">
                <h4>About cookies on this site</h4>
                <span>We use cookies to collect and analyze information on site performance, and usage to enhance and customize content.</span>
                <div style={{ marginTop: "10px" }}>
                    <button id="cookie-settings" onClick={() => setShowCookieSettingsModal(true)}>Cookie settings</button>
                    <button className="btn btn-success" onClick={handleAllowAllCookies}>ALL ALL COOKIES</button>
                </div>
            </div>
            <Modal
                isOpen={showCookieSettingsModal}
                style={modalStyles}
            >
                <span>content here</span>
            </Modal>
        </>
    );
}

function mapStateToProps(state) {
    return {
        user_info: state.user_info
    }
}

export default connect(mapStateToProps)(CookiesPopup);