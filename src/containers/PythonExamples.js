import { Link } from "react-router-dom";

function PythonExamples() {
    return (
        <div>
            <div className="row">
                <h2 className="python-examples col-sm-12">PHP Examples</h2>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <span>info about page...</span>
                    <Link to={"/python/ai"}>
                        {"Artificial Intelligence"}
                    </Link>
                </div>
            </div>
            <div className="clear20"></div>
        </div>
    );
}

export default PythonExamples;