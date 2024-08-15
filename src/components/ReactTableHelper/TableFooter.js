import React from "react"; // eslint-disable-line no-unused-vars
import { getStyles } from "./utilities";

export default function ({ tableFooters }) {
    return (
        <div className="tfoot">
            <div className="tr" {...tableFooters.getHeaderGroupProps()}>
                {tableFooters.headers.map((column) => {
                    //console.log("col", column);
                    return (
                        <div
                            className={`td${
                                column.isSorted ? " td-sorted" : ""
                            }${column.freeze === true ? " sticky-left" : ""}`}
                            {...column.getFooterProps(footerProps)}
                        >
                            {column.render("Footer")}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function footerProps(props, { column }) {
    return getStyles(props, column, column.style);
}
