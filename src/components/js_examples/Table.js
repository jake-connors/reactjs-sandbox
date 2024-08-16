import { useState, useEffect, useRef, useMemo } from "react";
import { get_users, submit_user } from "../../api/user";
import { useDefaultTable, RenderDefaultTable } from "../ReactTableHelper";
import columns from "./TableColumns";
import PopupNotifyHelper from "../PopupNotifyHelper";

function Table({ tableRef, isLoading, setIsLoading }) {

    const [isEditMode, setIsEditMode] = useState(false);
    const [username, setUsername] = useState("");
    const [details, setDetails] = useState("");
    const [allUsers, setAllUsers] = useState([]);
    const [usernameRequired, setUsernameRequired] = useState(false);
    const [detailsRequired, setDetailsRequired] = useState(false);

    const detailsRef = useRef(null);

    useEffect(() => {
        initUsersTable();
    }, []);

    async function initUsersTable() {
        setIsLoading(true);
        let resp = await get_users();
        console.log('resp all users ', resp);
        if (resp.data.success) {
            setAllUsers(resp.data.users);
        }
        setIsLoading(false);
    }

    async function handleSubmit() {
        let valid = true;
        if (username.trim() === "") {
            setUsernameRequired(true);
            valid = false;
        }
        if (details.trim() === "") {
            setDetailsRequired(true);
            valid = false;
        }
        if (!valid) {
            return;
        }
        setIsLoading(true);
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
        setUsername("");
        setDetails("");
        setIsEditMode(false);
        setUsernameRequired(false);
        setDetailsRequired(false);
        setIsLoading(false);
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
        setIsLoading(true);
        let resp = await delete_user(userId);
        console.log('resp : ' , resp);
        if (resp.data.success) {
            PopupNotifyHelper.create_notification("Delete Success!", "text-success");
        }
        setIsLoading(false);
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
            <div className="row">
                <div id="add-edit-box" className="col-sm-12">
                    <label style={{ fontSize: "18px" }}>{!isEditMode ? "Add " : "Edit " }User:</label>
                    <div className="col-sm-12">
                        <div className="form-group">
                            <label>Username:</label>
                            <input 
                                type="text"
                                className="form-control" 
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                readOnly={isEditMode || isLoading}
                                style={{ border: usernameRequired ? "1px solid red" : "" }}
                            />
                            {usernameRequired && <span className="form-input-required">Username cannot be empty.</span>}
                        </div>
                        <div className="form-group">
                            <label>Details:</label>
                            <input 
                                type="text"
                                className="form-control" 
                                onChange={(e) => setDetails(e.target.value)}
                                value={details}
                                readOnly={isLoading}
                                ref={detailsRef}
                                style={{ border: usernameRequired ? "1px solid red" : "" }}
                            />
                            {detailsRequired && <span className="form-input-required">Details cannot be empty.</span>}
                        </div>
                        <button className="form-control btn btn-primary" onClick={handleSubmit} style={{ marginTop: "10px" }}>
                            {!isEditMode ? "Submit" : "Edit"}
                        </button>
                    </div>
                </div>
            </div>
            <div id="table-display" className="row" ref={tableRef}>
                {allUsers.length > 0 && 
                    <RenderDefaultTable
                        table={table}
                        paginate={true}
                        className="react-table-vertical-borderless"
                    />
                }
            </div>
            <div className="clear10"></div>
            <div className="clear20"></div>
        </div>
    );
}

export default Table;
