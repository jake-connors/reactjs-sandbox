import { connect } from "react-redux";
import { useState } from "react";
import { setUserInfo } from "../redux/actions";
import { allow_all_cookies, deny_all_cookies, save_user_cookie_settings } from "../api/cookies";
import Modal from "react-modal";

function CookiesPopup({ user_info, dispatch, allCookies }) {

    const [showCookieSettingsModal, setShowCookieSettingsModal] = useState(false);
    const [localAllowedCookies, setLocalAllowedCookies] = useState([...user_info.cookie_settings.allowed_cookies]);

    async function handleAllowAllCookies() {
        let resp = await allow_all_cookies();
        if (resp.data.success) {
            let newCookieSettings = resp.data.cookie_settings;
            let newUserInfo = {
                ...user_info,
                cookie_settings: newCookieSettings,
                show_cookies_popup: false
            };
            dispatch(setUserInfo(newUserInfo));
        }
        setShowCookieSettingsModal(false);
    }

    async function handleDenyAllCookies() {
        let resp = await deny_all_cookies();
        if (resp.data.success) {
            let newCookieSettings = resp.data.cookie_settings;
            // let newIp = {
            //     ip_address: "",
            //     display_location: "",
            // };
            let newUserInfo = {
                ...user_info,
                cookie_settings: newCookieSettings,
                show_cookies_popup: false
            };
            dispatch(setUserInfo(newUserInfo));
        }
        setShowCookieSettingsModal(false);
    }

    async function handleSaveCookieSettings() {
        let cookiesWithSettings = [];
        for (let cookie of allCookies.filter((c) => c.require_consent)) {
            if (localAllowedCookies.some((c) => c === cookie.name)) {
                cookie.allowed = 1;
            } else {
                cookie.allowed = 0;
            }
            cookiesWithSettings.push(cookie);
        }
        let resp = await save_user_cookie_settings(cookiesWithSettings);
        if (resp.data.success) {
            let newCookieSettings = resp.data.cookie_settings;
            let newUserInfo = {
                ...user_info,
                cookie_settings: newCookieSettings,
                show_cookies_popup: false,
            };
            dispatch(setUserInfo(newUserInfo));
        }
        setShowCookieSettingsModal(false);
    }

    function handleToggleCookie(cookieName, isChecked) {
        if (isChecked) {
            var newLocalAllowedCookies = [...localAllowedCookies].filter((c) => c !== cookieName);
        } else {
            var newLocalAllowedCookies = [...localAllowedCookies];
            newLocalAllowedCookies.push(cookieName);
        }
        setLocalAllowedCookies(newLocalAllowedCookies);
    }

    const modalStyles = {
        content: {
            background: "#00000080",
            position: "fixed",
            inset: "0",
        }
    };
    
    return (
        <div id="cookies-popup-container">
            <AboutCookiesBanner
                showBanner={user_info.show_cookies_popup ?? false}
                setShowCookieSettingsModal={setShowCookieSettingsModal}
                handleAllowAllCookies={handleAllowAllCookies}
            />
            <Modal
                isOpen={showCookieSettingsModal}
                style={modalStyles}
            >
                <div id="cookie-settings-modal">
                    <div className="row">
                        <h4>About cookies on this site</h4>
                        <span>We use cookies to collect and analyze information on site performance, and usage to enhance and customize content.</span>
                    </div>
                    <div style={{ marginTop: "10px", marginBottom: "25px" }}>
                        <button className="btn btn-success" onClick={handleAllowAllCookies}>ALL ALL COOKIES</button>
                        <button className="btn btn-light" onClick={handleDenyAllCookies} style={{ marginLeft: "15px" }}>DENY ALL</button>
                    </div>
                    {allCookies.length > 0 && allCookies.filter((c) => c.require_consent).map((cookie, i) => (
                        <ModalCookie 
                            key={i}
                            cookie={cookie}
                            isChecked={localAllowedCookies.some((c) => c === cookie.name)}
                            handleToggleCookie={handleToggleCookie}
                        />
                    ))}
                    <div style={{ marginTop: "10px" }}>
                        <button className="btn btn-success" onClick={handleSaveCookieSettings}>SAVE SETTINGS</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

function AboutCookiesBanner({ showBanner, setShowCookieSettingsModal, handleAllowAllCookies }) {
    return (
        <div 
            id={showBanner ? "cookies-popup-show" : "cookies-popup-hide"} 
        >
            <h4>About cookies on this site</h4>
            <span>We use cookies to collect and analyze information on site performance, and usage to enhance and customize content.</span>
            <div style={{ marginTop: "10px" }}>
                <button className="cookie-settings-button" onClick={() => setShowCookieSettingsModal(true)}>Cookie settings</button>
                <button className="btn btn-success" onClick={handleAllowAllCookies}>ALL ALL COOKIES</button>
            </div>
        </div>
    );
}

function ModalCookie({ cookie, isChecked, handleToggleCookie }) {
    return (
        <div style={{ marginBottom: "25px" }}>
            <div className="row">
                <label className="toggle-switch col-sm-2">
                    <input 
                        type="checkbox" 
                        checked={isChecked}
                        onChange={() => handleToggleCookie(cookie.name, isChecked)}
                    />
                    <span className="slider round"></span>
                </label>
                <span className="col-sm-10">{cookie.display_name}</span>
            </div>
            <div className="row">
                <span className="offset-2 col-sm-10">{cookie.display_info}</span>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        user_info: state.user_info
    }
}

export default connect(mapStateToProps)(CookiesPopup);