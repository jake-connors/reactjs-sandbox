import { connect } from "react-redux";
import { useEffect } from "react";
import { setUserInfo } from "../../redux/actions";

function StylePicker({ isDesktop, dispatch }) {

    useEffect(() => {
        console.log('StylePicker isDesktop : ', isDesktop);
        // dispatch style type to redux ?
    }, []);

    const styleOptions = [
        { id: 1, className: "asi-main" },
        { id: 2, className: "asi-alt" },
        { id: 3, className: "asi-csgo" },
        { id: 4, className: "asi-csgo-alt" },
    ];

    function handleStyleClicked(className) {
        let newUserInfoStyle = {
            style: className
        };
        dispatch(setUserInfo(newUserInfoStyle));
    }

    return (
        <span id="style-picker-all">
        {isDesktop ? 
            <>
            {styleOptions.map((option, i) => (
                <span key={i} className={"style-picker-option " + option.className} 
                    onClick={() => {
                        handleStyleClicked(option.className);
                    }}
                >
                    <span className="style-picker-option-primary"></span>
                </span>
            ))}
            </> 
        : 
            <>
            {styleOptions.map((option, i) => (
                <span key={i} className={"style-picker-option " + option.className} 
                    onClick={() => {
                        handleStyleClicked(option.className);
                    }}
                >
                    <span className="style-picker-option-primary"></span>
                </span>
            ))}
            </>
        }
        </span>
    );
}

export default connect()(StylePicker);