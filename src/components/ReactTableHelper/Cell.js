import React from "react"; // eslint-disable-line no-unused-vars
import { getStyles } from "./utilities";

export default function ({ cell }) {
    return (
        <div
            {...cell.getCellProps(cellProps)}
            className={`td${cell.column.isSorted ? " td-sorted" : ""}${
                cell.column.freeze === true ? " sticky-left" : ""
            }`}
        >
            <div
                className={
                    cell.column.wrapText !== true && cell.column.wrap !== true
                        ? "td-no-wrap"
                        : "td-wrap"
                }
                style={
                    cell.column.align !== null
                        ? {
                              textAlign: cell.column.align,
                          }
                        : {}
                }
            >
                {cell.render("Cell")}
            </div>
        </div>
    );
}

function cellProps(props, { cell }) {
    // add cell-only styling
    return getStyles(props, cell.column, {
        ...cell.column.style,
        ...cell.column.cellStyle,
    });
}
