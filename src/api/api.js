import go from "./go";

export function get_user_info_cookie() {
    var getObj = {
        mode: "getUserInfo"
    };
    return go.get("/api/user/user_info_cookie", { params: getObj });
}

export function save_user_info_cookie(newUserInfo) {
    var postObj = {
        mode: "saveUserInfo",
        newUserInfo
    };
    return go.post("/api/user/user_info_cookie", postObj);
}