import { Link } from "react-router-dom";

function PhpExamples() {
    return (
        <div>
            <div className="row">
                <h2 className="php-examples col-sm-12">PHP Examples</h2>
            </div>
            <div className="row">
                <div className="example-card col-6">
                    <Link to={"/php_examples/email"}>
                        {"Typeaheads and Tables"}
                    </Link>
                </div>
                <div className="example-card col-sm-6">
                    <Link to={"/php_examples/excel"}>
                        {"Excel"}
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PhpExamples;