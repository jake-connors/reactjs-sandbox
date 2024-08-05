import { useEffect } from "react";

function StylePicker({ isDesktop }) {

    useEffect(() => {
        console.log('StylePicker isDesktop : ', isDesktop);
        // dispatch style type to redux ?
    }, []);

    const styleOptions = [
        { id: 1, className: "asi-main" },
        { id: 1, className: "asi-alt" },
        { id: 1, className: "asi-csgo" },
        { id: 1, className: "asi-csgo-alt" },
    ];

    return (
        <span id="style-picker-all" className="navbar-item-nochild">
        {isDesktop ? 
            <>
            {styleOptions.map((option, i) => (
                <span key={i} className={"style-picker-option " + option.className}>
                    <span className="style-picker-option-primary"></span>
                </span>
            ))}
            </> 
        : 
            <>
            {styleOptions.map((option, i) => (
                <span key={i} className={"style-picker-option " + option.className}>
                    <span className="style-picker-option-primary"></span>
                </span>
            ))}
            </>
        }
        </span>
    );
}

export default StylePicker;