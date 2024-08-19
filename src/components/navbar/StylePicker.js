import { connect } from "react-redux";
import { useEffect } from "react";
import { setUserInfo } from "../../redux/actions";
import { save_cookie } from "../../api/cookies";

function StylePicker({ isDesktop, dispatch, user_info }) {

    useEffect(() => {
        console.log('StylePicker isDesktop : ', isDesktop);
    }, []);

    const styleOptions = [
        { id: 1, className: "asi-main" },
        { id: 2, className: "asi-alt" },
        { id: 3, className: "asi-csgo" },
        { id: 4, className: "asi-csgo-alt" },
    ];

    async function handleStyleClicked(className) {
        let newUserInfo = {
            ...user_info,
            site_style: className
        };
        dispatch(setUserInfo(newUserInfo));
        if (user_info.allowed_cookies.some((cookie) => cookie === "site_style")) {
            // if user allows the "style" cookie then save it
            let cookieName = "site_style";
            let cookieData = {
                style: className
            };
            let resp = await save_cookie(cookieName, cookieData);
            console.log('resp (save user info) ', resp);
        }
    }

    return (
        <span id="style-picker-all">
        {isDesktop ? 
            <>
            {styleOptions.map((option, i) => (
                <span key={i} className={`style-picker-option ${option.className} ${user_info.style == option.className ? " active" : ""}`} 
                    onClick={() => handleStyleClicked(option.className)}
                >
                    <span className="style-picker-option-primary"></span>
                </span>
            ))}
            </> 
        : 
            <>
            {styleOptions.map((option, i) => (
                <span key={i} className={`style-picker-option ${option.className} ${user_info.style == option.className ? " active" : ""}`} 
                    onClick={() => handleStyleClicked(option.className)}
                >
                    <span className="style-picker-option-primary"></span>
                </span>
            ))}
            </>
        }
        </span>
    );
}

function mapStateToProps(state) {
    return {
        user_info: state.user_info
    }
}

export default connect(mapStateToProps)(StylePicker);