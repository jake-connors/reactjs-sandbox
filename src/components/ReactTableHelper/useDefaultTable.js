/* 
This is a wrapper for react-table. 

It does a couple of things:
1. makes it more convenient (write less code) to create a react table
2. somewhat standardizes the features from react table
3. adds on a couple small improvements such as sorting by the first column if no columns are set to sort, etc.
*/

import React from "react";
import {
    useTable,
    usePagination,
    useFilters,
    useSortBy,
    useResizeColumns,
    useFlexLayout,
    useExpanded,
} from "react-table";

export default function useDefaultTable(
    options,
    resetStateWhenDataReloads = false
) {
    const defaultColumn = createDefaultColumnObject();
    const showTableFooter = shouldShowTableFooter(options);

    const finalOptions = combineTableOptions({
        options,
        defaultColumn,
        showTableFooter,
    });

    finalOptions.autoResetPage = resetStateWhenDataReloads;
    finalOptions.autoResetExpanded = resetStateWhenDataReloads;
    finalOptions.autoResetGroupBy = resetStateWhenDataReloads;
    finalOptions.autoResetSelectedRows = resetStateWhenDataReloads;
    finalOptions.autoResetSortBy = resetStateWhenDataReloads;
    finalOptions.autoResetFilters = resetStateWhenDataReloads;
    finalOptions.autoResetRowState = resetStateWhenDataReloads;

    //console.log("finalOptions", finalOptions);

    const table = useTable(
        finalOptions,
        useFilters,
        useSortBy,
        useFlexLayout,
        useResizeColumns,
        useExpanded,
        usePagination
    );

    return table;
}

function combineTableOptions({ options, defaultColumn, showTableFooter }) {
    let defaultOptions = {
        defaultColumn,
        initialState: { pageSize: 25 },
    };

    options.initialState = combineInitialState(
        defaultOptions.initialState,
        options.initialState,
        options.columns
    );

    // anything we put into these options will automatically be available on the instance.
    // that means we can add stuff that is not part of the API, like handlers that the cell uses to
    // call a parent's function
    // also, any options in additionalOptions that is the same as a default option above
    // will overide the initial option since we are using the spread operators to combine and putting it after.
    const final = {
        ...defaultOptions,
        ...options,
        showTableFooter,
    };

    return final;
}

function combineInitialState(defaultInit, customInit, columns) {
    return React.useMemo(() => {
        if (customInit !== undefined) {
            defaultInit = { ...defaultInit, ...customInit };
        }

        // sort by the first column if nothing is selected to sort by
        if (defaultInit.sortBy === undefined && columns.length > 0) {
            defaultInit.sortBy = [{ id: columns[0].accessor, desc: false }];
        }
        return defaultInit;
    }, [customInit, columns]);
}

function shouldShowTableFooter(options) {
    return React.useMemo(() => {
        let ret = false;
        options.columns.forEach((groupHeader) => {
            if (groupHeader.Footer !== undefined) {
                ret = true;
            }
            if (groupHeader.columns !== undefined) {
                groupHeader.columns.forEach((column) => {
                    if (column.Footer !== undefined) {
                        ret = true;
                    }
                });
            }
        });
        return ret;
    }, [options.columns]);
}

function createDefaultColumnObject() {
    return React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter,
            minWidth: 30, // minWidth is only used as a limit for resizing
            width: 100, // width is used for both the flex-basis and flex-grow
            maxWidth: 200, // maxWidth is only used as a limit for resizing
        }),
        []
    );
}

// Define a default UI for filtering
function DefaultColumnFilter({ column: { filterValue, setFilter } }) {
    return React.useMemo(
        () => (
            <input
                value={filterValue || ""}
                onChange={(e) => {
                    setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
                }}
                className="form-control filter"
                // placeholder="Search..."
            />
        ),
        [filterValue]
    );
}
