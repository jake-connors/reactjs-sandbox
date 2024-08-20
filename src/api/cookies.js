import go from "./go";

export function get_all_cookies() {
    var getObj = {
        mode: "getAllCookies"
    };
    return go.get("/api/cookies/cookies", { params: getObj });
}

export function save_cookie(cookieName, cookieData) {
    var postObj = {
        mode: "saveCookie",
        cookieName,
        cookieData
    };
    return go.post("/api/cookies/cookies", postObj);
}

export function save_user_cookie_settings(cookies) {
    var postObj = {
        mode: "saveUserCookieSettings",
        cookies
    };
    return go.post("/api/cookies/cookies", postObj);
}

export function allow_all_cookies() {
    var postObj = {
        mode: "allowAllCookies",
    };
    return go.post("/api/cookies/cookies", postObj);
}

export function deny_all_cookies() {
    var postObj = {
        mode: "denyAllCookies",
    };
    return go.post("/api/cookies/cookies", postObj);
}