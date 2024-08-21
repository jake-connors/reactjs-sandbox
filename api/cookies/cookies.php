<?php

require_once __DIR__ . "/utilities/cookies.php";

use Cookies\Utilities as Utils;

class Cookies_Cookies extends API_Endpoint
{
    public function postFunc()
    {
        $mode = $this->args["mode"];
        $result = 0;
        $ret = [];
        if ($mode === "saveCookie") {
            $cookieName = $this->args["cookieName"];
            $cookieData = $this->args["cookieData"];
            $result = Utils\Cookies::saveCookie($cookieName, $cookieData);
            $ret = ["success" => $result];
        } else if ($mode === "allowAllCookies") {
            $userCookieSettings = Utils\Cookies::allowAllCookies();
            $ret = ["success" => 1, "user_cookie_settings" => $userCookieSettings];
        } else if ($mode === "denyAllCookies") {
            $userCookieSettings = Utils\Cookies::denyAllCookies();
            $ret = ["success" => 1, "user_cookie_settings" => $userCookieSettings];
        } else if ($mode === "saveUserCookieSettings") {
            $userCookieSettings = Utils\Cookies::saveUserCookieSettings($this->args["cookies"]);
            $ret = ["success" => 1, "user_cookie_settings" => $userCookieSettings];
        }
        echo json_encode($ret);
    }

    public function getFunc()
    {
        $mode = $this->args["mode"];
        if ($mode === "getAllCookies") {
            $all_cookies = Utils\Cookies::getAllCookies();
            $user_cookies = Utils\Cookies::getUserCookies();
            echo json_encode(["success" => 1, "all_cookies" => $all_cookies, "user_cookies" => $user_cookies]);
        }
    }
}

?>