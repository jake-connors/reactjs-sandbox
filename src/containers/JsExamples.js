import { useState, useRef } from "react";
import Typeaheads from "../components/js_examples/Typeaheads";
import PopupNotify from "../components/js_examples/PopupNotify";
import DragAndDrop from "../components/js_examples/DragAndDrop";
import Popper from "../components/js_examples/Popper";
import Table from "../components/js_examples/Table";

function JsExamples() {

    const [isLoading, setIsLoading] = useState(false);

    const tableRef = useRef(null);

    function scrollToTable() {
        if (tableRef.current) {
            tableRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }
    
    return (
        <div>
            <div className="row">
                <h2 className="col-sm-12">JS Examples</h2>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <Typeaheads 
                        scrollToTable={scrollToTable}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                    />
                </div>
                <div className="col-sm-6">
                    <DragAndDrop />
                </div>
                <div className="clear10"></div>
                <div className="col-sm-6">
                    <Popper />
                </div>
                <div className="col-sm-6">
                    <PopupNotify />
                </div>
            </div>
            <div className="row">
                <Table 
                    tableRef={tableRef}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                />
            </div>
        </div>
    );
}

export default JsExamples;