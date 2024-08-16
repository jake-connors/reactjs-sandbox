import { connect } from "react-redux";
import { useEffect } from "react";
import { setUserInfo } from "../../redux/actions";
import { save_user_info_cookie } from "../../api/user";

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
            style: className
        };
        dispatch(setUserInfo(newUserInfo));
        let resp = await save_user_info_cookie(newUserInfo);
        console.log('resp (save user info) ', resp);
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