import { Link } from "react-router-dom";

function PythonExamples() {
    return (
        <div>
            <div className="row">
                <h2 className="python-examples col-sm-12">PHP Examples</h2>
            </div>
            <div className="row">
                <div className="example-card col-sm-6">
                    <Link to={"/python/ai"}>
                        {"Artificial Intelligence"}
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PythonExamples;