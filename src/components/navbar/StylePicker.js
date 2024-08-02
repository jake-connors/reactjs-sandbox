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
        <div id="style-picker-all">
        {isDesktop ? 
            <>
            {styleOptions.map((option, i) => (
                <div key={i} className={"style-picker-option " + option.className}>
                    <div className="style-picker-option-primary"></div>
                </div>
            ))}
            </> 
        : 
            <>
            {styleOptions.map((option, i) => (
                <div key={i} className={"style-picker-option " + option.className}>
                    <div className="style-picker-option-primary"></div>
                </div>
            ))}
            </>
        }
        </div>
    );
}

export default StylePicker;