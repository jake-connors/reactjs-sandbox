import React from "react"; // eslint-disable-line no-unused-vars

export default function ({
    pageIndex,
    pageSize,
    canPreviousPage,
    canNextPage,
    pageCount,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
}) {
    return (
        <div className="react-table-pagination">
            <div className="form-inline">
                <button
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                    className="btn btn-default"
                >
                    {"<<"}
                </button>{" "}
                <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                    className="btn btn-default"
                >
                    {"<"}
                </button>{" "}
                <button
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                    className="btn btn-default"
                >
                    {">"}
                </button>{" "}
                <button
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                    className="btn btn-default"
                >
                    {">>"}
                </button>{" "}
                <span>
                    Page{" "}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{" "}
                </span>
                <span className="page-jump">
                    | Go to page:{" "}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value
                                ? Number(e.target.value) - 1
                                : 0;
                            gotoPage(page);
                        }}
                        style={{ width: "80px" }}
                        className="form-control input-sm"
                    />
                </span>
                <span className="page-size">
                    {" "}
                    <select
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                        }}
                        className="form-control input-sm"
                    >
                        {[5, 10, 15, 20, 25, 50, 100].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </span>
            </div>
        </div>
    );
}
