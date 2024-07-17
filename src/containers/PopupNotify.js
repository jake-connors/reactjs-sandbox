import { connect } from "react-redux";
import PopupNotifyHelper from "../components/PopupNotifyHelper";

function PopupNotify() {

    function handleTestPopupNotify() {
        PopupNotifyHelper.create_notification("Test Success!", "text-success");
    }

    function handleTestPopupNotify2() {
        PopupNotifyHelper.create_notification("Test Red!", "text-danger");
    }

    return (
        <div>
            <h3 className="col-sm-12">Test PopupNotify</h3>
            <button className="btn btn-primary col-sm-2" onClick={handleTestPopupNotify}>Test Popup Notify</button>
            <button className="btn btn-primary col-sm-2" onClick={handleTestPopupNotify2}>Test 2 (red)</button>
        </div>
    );
}

export default connect()(PopupNotify);