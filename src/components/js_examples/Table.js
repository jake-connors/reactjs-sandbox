import { useState, useEffect, useRef, useMemo } from "react";
import { get_users, submit_user } from "../../api/user";
import { useDefaultTable, RenderDefaultTable } from "../ReactTableHelper";
import columns from "./TableColumns";
import PopupNotifyHelper from "../PopupNotifyHelper";

function Table({ tableRef }) {

    const [isEditMode, setIsEditMode] = useState(false);
    const [username, setUsername] = useState("");
    const [details, setDetails] = useState("");
    const [allUsers, setAllUsers] = useState([]);

    const detailsRef = useRef(null);

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
        if (resp.data.success) {
            let notifyMsg = isEditMode ? "Edit" : "Add";
            notifyMsg += " Success!";
            PopupNotifyHelper.create_notification(notifyMsg, "text-success");
        }
    }

    function handleEditUser(userId) {
        setIsEditMode(true);
        let tempUsername = "";
        let tempDetails = "";
        allUsers.forEach((user) => {
            if (user.id == userId) {
                tempUsername = user.username;
                tempDetails = user.details;
            }
        });
        if (tempUsername !== "") {
            setUsername(tempUsername);
            setDetails(tempDetails);
        }
        if (detailsRef.current) {
            detailsRef.current.focus();
        }
    }

    async function handleDeleteUser(userId) {
        let resp = await delete_user(userId);
        console.log('resp : ' , resp);
        if (resp.data.success) {
            PopupNotifyHelper.create_notification("Delete Success!", "text-success");
        }
    }

    const cols = columns({
        handleEditUser,
        handleDeleteUser
    });
    const table = useDefaultTable({
        data: useMemo(() => allUsers, [allUsers]),
        columns: useMemo(() => cols, [allUsers]),
        initialState: {
            pageSize: 25
        },
    });

    
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
                            readOnly={isEditMode}
                        />
                    </div>
                    <div className="form-group">
                        <label>Details:</label>
                        <input 
                            type="text"
                            className="form-control" 
                            onChange={setDetails}
                            value={details}
                            ref={detailsRef}
                        />
                    </div>
                    <button className="form-control btn btn-primary" onClick={handleSubmit} style={{ marginTop: "10px" }}>
                        {!isEditMode ? "Submit" : "Edit"}
                    </button>
                </div>
            </div>
            <div id="table-display" className="row">
                {allUsers.length > 0 && 
                    <RenderDefaultTable
                        table={table}
                        paginate={true}
                        className="react-table-vertical-borderless"
                    />
                }
            </div>
            <div className="clear10"></div>
        </div>
    );
}

export default Table;
