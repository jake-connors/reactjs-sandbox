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
            $allowed_cookies = Utils\Cookies::allowAllCookies();
            $ret = ["success" => 1, "allowed_cookies" => $allowed_cookies];
        }
        echo json_encode($ret);
    }

    public function getFunc()
    {
        $mode = $this->args["mode"];
        if ($mode === "getCookies") {
            $cookies = Utils\Cookies::getAllCookies();
            echo json_encode(["success" => 1, "cookies" => $cookies]);
        }
    }
}

?>