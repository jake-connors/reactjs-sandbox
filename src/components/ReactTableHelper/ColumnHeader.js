import React from "react"; // eslint-disable-line no-unused-vars
import { getStyles } from "./utilities";

export default function ({ column }) {
    let firstPartOfHeader = "";
    let lastPartOfHeader = "";
    if (typeof column.Header === "string") {
        const words = column.render("Header");
        lastPartOfHeader = typeof words === "string" ? words.split(" ").pop() : "";
        firstPartOfHeader = typeof words === "string" ? words.replace(lastPartOfHeader, "") : "";
    } else {
        let header;
        if (typeof column.Header === "function") {
            header = column.Header();
        } else {
            header = column.render("Header");
        }
        const children = header.props.children;
        if (children.length > 1) {
            firstPartOfHeader = children.slice(0, children.length - 1);
            lastPartOfHeader = children[children.length - 1];
        } else {
            lastPartOfHeader = children;
        }
    }
    return (
        <div
            {...column.getHeaderProps(headerProps)}
            className={`th${column.columns !== undefined ? " parentHeader" : ""}${
                column.isSorted ? " th-sorted" : ""
            }${column.freeze === true ? " sticky-left" : ""}`}
        >
            {column.canResize && (
                <div
                    {...column.getResizerProps()}
                    className={`resizer ${column.isResizing ? "isResizing" : ""}`}
                />
            )}
            <div className="titleFilterContainer">
                <div {...column.getSortByToggleProps()}>
                    <span className={`columnTitle ${column.isSorted ? "sort-active-title" : ""}`}>
                        {firstPartOfHeader.length > 0 && <>{firstPartOfHeader} </>}
                        <span style={{ whiteSpace: "nowrap" }}>
                            {lastPartOfHeader} <SortBy column={column} />
                        </span>
                    </span>
                </div>
                <FilterBy column={column} />
            </div>
        </div>
    );
}

function headerProps(props, { column }) {
    // add header-only styling
    return getStyles(props, column, {
        ...column.style,
        ...column.headerStyle,
    });
}

function SortBy({ column }) {
    return (
        <>
            {column.accessor !== undefined && column.disableSortBy !== true && (
                <span className="sort-icons">
                    {column.isSorted ? (
                        column.isSortedDesc ? (
                            <i className="fa fa-sort-down sort-active" />
                        ) : (
                            <i className="fa fa-sort-up sort-active" />
                        )
                    ) : (
                        <i className="fa fa-sort sort-inactive" />
                    )}
                </span>
            )}
        </>
    );
}

function FilterBy({ column }) {
    return (
        <>
            {column.canFilter ? (
                <div className="filterContainer">{column.render("Filter")}</div>
            ) : null}
        </>
    );
}
