import { useEffect, useState } from "react";
import PopupNotifyHelper from "../PopupNotifyHelper";

function PopupNotify() {
    const [activeOption, setActiveOption] = useState({});
    const popupNotifyOptions = [
        { id: 1, display: "Primary", popupClassName: "text-primary", buttonClassName: "btn btn-outline-primary" },
        { id: 2, display: "Success", popupClassName: "text-success", buttonClassName: "btn btn-outline-success" },
        { id: 3, display: "Secondary", popupClassName: "text-secondary", buttonClassName: "btn btn-outline-secondary" },
        { id: 4, display: "Danger", popupClassName: "text-danger", buttonClassName: "btn btn-outline-danger" },
        { id: 5, display: "Warning", popupClassName: "text-warning", buttonClassName: "btn btn-outline-warning" },
        { id: 6, display: "Info", popupClassName: "text-info", buttonClassName: "btn btn-outline-info" },
        { id: 7, display: "Light", popupClassName: "text-light bg-dark", buttonClassName: "btn btn-outline-light" },
        { id: 8, display: "Dark", popupClassName: "text-dark", buttonClassName: "btn btn-outline-dark" },
    ];

    useEffect(() => {
        setActiveOption(popupNotifyOptions[0]);
    }, []);
    

    function handlePopupNotifyDropdownChange(e) {
        let thisOpt = {};
        for (let opt of popupNotifyOptions) {
            if (opt.id == e.target.value) {
                thisOpt = opt;
            }
        }
        setActiveOption(thisOpt);
    }

    function handlePopupNotify() {
        PopupNotifyHelper.create_notification("Test: " + activeOption.display, activeOption.popupClassName);
    }

    return (
        <div className="row form-group">
            <label className="js-examples col-sm-12">Popup Notify</label>
            <select
                className="form-select"
                value={activeOption.id ?? ""}
                onChange={handlePopupNotifyDropdownChange}
            >
                {popupNotifyOptions.map((opt, i) => (
                    <option key={i} value={opt.id}>{opt.display}</option>
                ))}
            </select>
            <button className={"form-control btn btn-" + activeOption.buttonClassName} onClick={handlePopupNotify}>Test</button>
        </div>
    );
}
export default PopupNotify;