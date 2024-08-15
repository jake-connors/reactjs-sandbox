import go from "./go";

export function get_user_info_cookie() {
    var getObj = {
        mode: "getUserInfo"
    };
    return go.get("/api/user/user", { params: getObj });
}

export function save_user_info_cookie(newUserInfo) {
    var postObj = {
        mode: "saveUserInfo",
        newUserInfo
    };
    return go.post("/api/user/user", postObj);
}

export function get_users() {
    var getObj = {
        mode: "getUsers"
    };
    return go.post("/api/user/user", getObj);
}

export function submit_user(postObj) {
    postObj.mode = "submitUser";
    return go.post("/api/user/user", postObj);
}