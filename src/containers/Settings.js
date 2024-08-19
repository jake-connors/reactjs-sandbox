import { useState, useEffect } from "react";

function Settings() {

    const [showCookieSettings, setShowCookieSettings] = useState(false);

    useEffect(() => {
        initCookieSettingsPopup();
    }, []);
    
    function initCookieSettingsPopup() {
        setShowCookieSettings(true);
    }

    function handleCookiesLearnMore() {
        console.log('cookies learn more');
    }

    function handleAllowAllCookies() {
        console.log('allowing all cookies');
    }
    
    return (
        <div className="row">
            <h2 className="col-sm-12">Settings</h2>
            {showCookieSettings && (
                <div id="settings-cookies">
                    <h4>About cookies on this site</h4>
                    <span>We use cookies to collect and analyze information on site performance, and usage to enhance and customize content. <span style={{ textDecoration: "underline" }} onClick={handleCookiesLearnMore}>Learn more</span></span>
                    <div>
                        <span>Cookie settings</span>
                        <button className="btn btn-success" onClick={handleAllowAllCookies}>ALL ALL COOKIES</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Settings;