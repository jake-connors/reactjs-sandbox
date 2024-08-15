import { useState, useEffect } from "react";
import { get_users, submit_user } from "../../api/user";

function Table({ tableRef }) {

    const [isEditMode, setIsEditMode] = useState(false);
    const [username, setUsername] = useState("");
    const [details, setDetails] = useState("");
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        initUsersTable();
    }, []);

    async function initUsersTable() {
        let resp = await get_users();
        if (resp.data.success) {
            setAllUsers(resp.data.users);
        }
    }

    async function handleSubmit() {
        let postObj = {
            username,
            details,
            isEditMode
        };
        let resp = await submit_user(postObj);
        console.log('resp : ' , resp);
    }
    
    return (
        <div id="table-container" className="row form-group">
            <label className="js-examples col-sm-12">Table - React Table w/ data from `users` SQL table</label>
            <h3>{!isEditMode ? "Add " : "Edit " }User:</h3>
            <div id="add-edit-box" className="row" ref={tableRef}>
                <div className="col-sm-12">
                    <div className="form-group">
                        <label>Username:</label>
                        <input 
                            type="text"
                            className="form-control" 
                            onChange={setUsername}
                            value={username}
                        />
                    </div>
                    <div className="form-group">
                        <label>Details:</label>
                        <input 
                            type="text"
                            className="form-control" 
                            onChange={setDetails}
                            value={details}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={handleSubmit}>{!isEditMode ? "Submit" : "Edit"}</button>
                </div>
            </div>
            <div id="table-display" className="row">
                {allUsers.length && 
                    <span onClick={() => {setIsEditMode(true);}}>..table (temp click)</span>
                }
            </div>
        </div>
    );
}

export default Table;
