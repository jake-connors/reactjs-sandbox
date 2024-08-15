/*
This prints out a standard table. 
It takes the object created using useDefaultTable.js to create the html template for the table.
*/

import React from "react";
import ColumnHeader from "./ColumnHeader";
import Row from "./Row";
import TableFooter from "./TableFooter";
import Pagination from "./Pagination";

function RenderTable({
    table,
    paginate = true,
    className = "", // react-table-tight, react-table-small, react-table-striped, react-table-sort-column, react-table-highlight-row react-table-vertical-borderless
    onFilter = false, // use this to get any filter changes
    onTableChange = false, // use this to get the latest state of the table after any change (can be used for fetching new data)
    onPageDataChange = false, // use this to get alerted to any changes to the visible data in the table
    highlightRow = false,
    isLoading = false,
    renderRowSubComponent = false,
    onRowClick = false,
}) {
    const {
        getTableProps,
        headerGroups,
        footerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize, filters, sortBy },
        showTableFooter,
    } = table;

    const [lastTableState, setLastTableState] = React.useState(false);
    const [lastPageData, setLastPageData] = React.useState(false);

    // trigger filter event
    React.useEffect(() => {
        // when the user starts typing a filter, make sure to
        // return to the first page (bkniaz 10/15/21)
        if (filters.length > 0 && pageIndex !== 0) {
            gotoPage(0);
        }
        if (onFilter !== false) {
            onFilter(filters);
        }
    }, [filters]);

    // trigger table change event
    React.useEffect(() => {
        if (onTableChange !== false) {
            const newstate = {
                pageIndex,
                pageSize,
                sortBy,
                filters,
            };
            if (JSON.stringify(newstate) !== lastTableState) {
                onTableChange({
                    pageIndex,
                    pageSize,
                    sortBy,
                    filters,
                });
            }
        }
        setLastTableState(JSON.stringify({ pageIndex, pageSize, sortBy, filters }));
    }, [pageIndex, pageSize, sortBy, filters]);

    // trigger page data change
    React.useEffect(() => {
        if (onPageDataChange !== false) {
            const page_data = page.map((row) => row.original);
            if (JSON.stringify(page_data) !== lastPageData) {
                onPageDataChange(page_data);
            }
            setLastPageData(JSON.stringify(page_data));
        }
    }, [page]);

    const tableFooters = footerGroups.length > 1 ? headerGroups[1] : headerGroups[0];

    let classNm = "react-table-container";
    if (className !== "") classNm += " " + className;
    if (isLoading === true) classNm += " react-table-is-loading";

    // Render the UI for your table
    return (
        <div className={classNm}>
            {isLoading === true && <p className="loading-table-data">Loading</p>}

            <div {...getTableProps()} className="react-table">
                {/* table head */}
                <div className="thead">
                    {headerGroups.map((headerGroup) => (
                        <div {...headerGroup.getHeaderGroupProps()} className="tr">
                            {headerGroup.headers.map((column, colIndex) => {
                                // console.log("column", column);
                                return <ColumnHeader key={colIndex} column={column} />;
                            })}
                        </div>
                    ))}
                </div>
                {/* table body */}
                <div className="tbody">
                    {page.map((row, rowIndex) => {
                        prepareRow(row);
                        return (
                            <Row
                                key={rowIndex}
                                row={row}
                                highlightRow={highlightRow}
                                pageIndex={pageIndex}
                                pageSize={pageSize}
                                rowIndex={rowIndex}
                                renderRowSubComponent={renderRowSubComponent}
                                onRowClick={onRowClick}
                            />
                        );
                    })}
                </div>
                {/* table foot */}
                {showTableFooter === true && <TableFooter tableFooters={tableFooters} />}
            </div>
            {/* table pagination */}
            {paginate === true && (
                <Pagination
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                    canPreviousPage={canPreviousPage}
                    canNextPage={canNextPage}
                    pageCount={pageCount}
                    pageOptions={pageOptions}
                    gotoPage={gotoPage}
                    nextPage={nextPage}
                    previousPage={previousPage}
                    setPageSize={setPageSize}
                />
            )}
        </div>
    );
}

export default RenderTable;
