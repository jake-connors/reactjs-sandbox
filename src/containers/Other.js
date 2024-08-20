import { Link } from "react-router-dom";

function Other() {

    return (
        <div className="row">
            <h2 className="col-sm-12">Other</h2>
            <span>...</span>
            <Link to="/about">
                <i className="fa fa-info-circle"></i>About
            </Link>
            <Link to="/contact">
                <i className="fa fa-envelope"></i>Contact
            </Link>
            <br />
            <Link to="/settings">
                <i className="fa fa-cog"></i>Settings
            </Link>
            <Link to="/documentation">
                <i className="fa fa-code"></i>Code
            </Link>
        </div>
    );
}

export default Other;