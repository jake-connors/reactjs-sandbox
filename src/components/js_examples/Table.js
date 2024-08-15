import { useState, useEffect } from "react";
// import ReactTable from "react-table";
import { get_users, submit_user } from "../../api/user";
// import columns from "./TableColumns";

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

    // const cols = useMemo(() => columns(), []);
    // const table = useTable();
    
    return (
        <div id="table-container" className="row form-group">
            <h4 className="col-sm-12">Table - React Table w/ data from `users` SQL table</h4>
            <label style={{ fontSize: "18px" }}>{!isEditMode ? "Add " : "Edit " }User:</label>
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
                    <button className="form-control btn btn-primary" onClick={handleSubmit} style={{ marginTop: "10px" }}>
                        {!isEditMode ? "Submit" : "Edit"}
                    </button>
                </div>
            </div>
            <div id="table-display" className="row">
                {allUsers.length > 0 && 
                    <>
                    <button onClick={() => {setIsEditMode(true);}}>..table (temp click)</button>
                    {/* <ReactTable
                        data={allUsers}
                    /> */}
                    </>
                }
            </div>
        </div>
    );
}

export default Table;
