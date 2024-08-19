function Email() {

    function handleSubmit() {
        console.log('submit send email');
    }

    return (
        <div className="row">
            <h2 className="col-sm-12">Email</h2>
            <div className="row">
                <div id="email-form" className="col-sm-12">
                    <label style={{ fontSize: "18px" }}>Send an email:</label>
                    <input className="form-control" type="text" value="noreply@jc.com" readOnly />
                    <label>To: </label>
                    <input className="form-control" type="text" />
                    <label>CC:</label>
                    <input className="form-control" type="text" />
                    <label>BCC:</label>
                    <input className="form-control" type="text" />
                    <label>Body: </label>
                    <input className="form-control" type="text" />
                    <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default Email;