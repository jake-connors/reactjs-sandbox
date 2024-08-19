
function columns({ handleEditUser, handleDeleteUser }) {
    
    const columns = [
        {
            Header: "Username",
            accessor: "username",
            width: 150,
        },
        {
            Header: "Details",
            accessor: "details",
            width: 150,
        },
        {
            Header: "Edit",
            accessor: "",
            width: 150,
            style: { textAlign: "center" },
            Cell: (info) => {
                const row = info.row.original;
                return (
                    <button className="btn btn-primary" onClick={() => handleEditUser(row.id)}>
                        Edit
                    </button>
                );
            },
        },
        {
            Header: "Delete",
            accessor: "",
            width: 150,
            style: { textAlign: "center" },
            Cell: (info) => {
                const row = info.row.original;
                return (
                    <button className="btn btn-danger" onClick={() => handleDeleteUser(row.id)}>
                        Delete
                    </button>
                );
            },
        },
    ];

    return [...columns];
}

export default columns;
