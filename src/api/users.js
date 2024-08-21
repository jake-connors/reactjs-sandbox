import go from "./go";

export function get_users() {
    var getObj = {
        mode: "getUsers"
    };
    return go.get("/api/users/users", { params: getObj });
}

export function submit_user(postObj) {
    return go.post("/api/users/users", postObj);
}