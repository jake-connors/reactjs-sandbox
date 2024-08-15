import React from "react"; // eslint-disable-line no-unused-vars
import Cell from "./Cell";

export default function ({
    row,
    highlightRow,
    pageIndex,
    pageSize,
    rowIndex,
    renderRowSubComponent,
    onRowClick,
}) {
    return (
        <>
            <div
                {...row.getRowProps()}
                className={`tr ${rowIndex % 2 == 0 ? "tr-even" : "tr-odd"} ${
                    highlightRow === pageIndex * pageSize + rowIndex
                        ? "tr-highlight"
                        : ""
                }`}
                onClick={
                    onRowClick !== false
                        ? () =>
                              onRowClick({ row, rowIndex, pageIndex, pageSize })
                        : undefined
                }
            >
                {row.cells.map((cell, cellIndex) => {
                    // console.log(
                    //     cell.column.Header,
                    //     cell.column.isSorted
                    // );
                    //console.log(cell);
                    return <Cell key={cellIndex} cell={cell} />;
                })}
            </div>
            {row.isExpanded && renderRowSubComponent({ row })}
        </>
    );
}
