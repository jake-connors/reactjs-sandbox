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
            $result = Utils\Cookies::allowAllCookies();
            $ret = ["success" => $result];
        } else if ($mode === "denyAllCookies") {
            $result = Utils\Cookies::denyAllCookies();
            $ret = ["success" => $result];
        } else if ($mode === "saveUserCookieSettings") {
            $result = Utils\Cookies::saveUserCookieSettings($this->args["cookies"]);
            $ret = ["success" => $result];
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