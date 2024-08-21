import { Link } from "react-router-dom";

function PhpExamples() {
    return (
        <div>
            <div className="row">
                <h2 className="php-examples col-sm-12">PHP Examples</h2>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <span>info about page...</span>
                    <Link to={"/php_examples/email"}>
                        {"Typeaheads and Tables"}
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <span>info...</span>
                    <Link to={"/php_examples/excel"}>
                        {"Excel"}
                    </Link>
                </div>
            </div>
            <div className="clear20"></div>
        </div>
    );
}

export default PhpExamples;