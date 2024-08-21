import { useState, useRef } from "react";
import Typeahead from "./Typeahead";
import Table from "./Table";

function TypeaheadTable() {

    const [isLoading, setIsLoading] = useState(false);

    const tableRef = useRef(null);

    function scrollToTable() {
        console.log('scrollToTable, tableRef : ' , tableRef);
        if (tableRef.current) {
            tableRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }

    return (
        <div id="typeahead-table-container" className="row form-group">
            <div>
                <h4 className="js-examples col-sm-12">Typeaheads And Tables</h4>
                <Typeahead 
                    scrollToTable={scrollToTable}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                />
                <Table 
                    tableRef={tableRef}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                />
                <div className="clear10"></div>
                <div className="clear20"></div>
            </div>
        </div>
    );
}

export default TypeaheadTable;