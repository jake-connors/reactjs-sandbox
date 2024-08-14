import Typeaheads from "../components/js_examples/Typeaheads";
import PopupNotify from "../components/js_examples/PopupNotify";
import DragAndDrop from "../components/js_examples/DragAndDrop";
import Popper from "../components/js_examples/Popper";

function JsExamples() {
    return (
        <div>
            <div className="row">
                <h2 className="col-sm-12">JS Examples</h2>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <Typeaheads />
                </div>
                <div className="col-sm-6">
                    <DragAndDrop />
                </div>
                <div className="col-sm-6">
                    <Popper />
                </div>
                <div className="col-sm-6">
                    <PopupNotify />
                </div>
            </div>
            <div className="row">
                <Table />
            </div>
        </div>
    );
}

function Table() {
    return (
        <>
            <label>Table</label>
        </>
    );
}

export default JsExamples;