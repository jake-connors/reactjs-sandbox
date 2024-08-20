import { useState, useRef } from "react";
import Typeahead from "./Typeahead";
import Table from "./Table";

function TypeaheadTable() {

    const [isLoading, setIsLoading] = useState(false);

    const tableRef = useRef(null);

    function scrollToTable() {
        if (tableRef.current) {
            tableRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }

    return (
        <div id="typeahead-table-container">
            <h4 className="js-examples col-sm-12">Typeaheads And Tables</h4>
            <div id="typeaheads-container" className="row form-group">
                <h4 className="js-examples col-sm-12">Typeaheads</h4>
                <Typeahead 
                    scrollToTable={scrollToTable}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                />
            </div>
            <div id="table-container" className="row form-group">
                <h4 className="col-sm-12">Table - React Table w/ data from `users` SQL table</h4>
                <Table 
                    tableRef={tableRef}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                />
            </div>
            <div className="clear10"></div>
            <div className="clear20"></div>
        </div>
    );
}

export default TypeaheadTable;