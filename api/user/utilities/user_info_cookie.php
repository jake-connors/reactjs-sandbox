<?php

namespace User\Utilities;

class UserInfoCookie {
    public static function getUserInfoCookie(): array {
        $user_info_cookie = isset($_COOKIE["user_info"]) ? json_decode($_COOKIE["user_info"], 1) : ["style" => "asi-main"];
        return $user_info_cookie;
    }

    public static function saveUserInfoCookie(array $new_user_info): int {
        $new_user_info = json_encode($new_user_info);
        $cookie_options = [
            "expires" => time() + 60*60*24*365, // expires in a year
            // "path" => "/",
            // "domain" => ""
            // "secure" => true,
            // "httponly" => true,
            // "samesite" => "None"
        ];
        setcookie("user_info", $new_user_info, $cookie_options);
        return 1;
    }
}

?>