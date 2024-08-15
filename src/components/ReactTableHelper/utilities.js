export function getStyles(props, column, stylePassed) {
    let customStyles = {};
    if (column.freeze === true) {
        customStyles.left = column.totalLeft;
    }

    const style = { style: { ...customStyles, ...stylePassed } };
    return [props, style];
}
