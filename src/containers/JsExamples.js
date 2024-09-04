import { Link } from "react-router-dom";

function JsExamples() {
    
    return (
        <div>
            <div className="row">
                <h2 className="js-examples col-sm-12">JS Examples</h2>
            </div>
            <div className="row">
                <div className="example-card col-6 col-md-4">
                    <Link to={"/js_examples/typeahead_table"}>
                        {"Typeaheads and Tables"}
                    </Link>
                </div>
                <div className="example-card col-6 col-md-4">
                    <Link to={"/js_examples/drag_drop"}>
                        {"Drag & Drop"}
                    </Link>
                </div>
                <div className="example-card col-6 col-md-4">
                    <Link to={"/js_examples/popper"}>
                        {"Poppers"}
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default JsExamples;