import { connect } from "react-redux";

function SearchBar() {

    return (
        <>
        <input type="text" placeholder="search bar..." />
        </>
    );
}

export default connect()(SearchBar);