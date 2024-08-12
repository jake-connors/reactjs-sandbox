<?php

class User_User_Info_Cookie extends API_Endpoint
{
    public function postFunc()
    {
        $mode = $this->args["mode"];
        if ($mode === "saveUserInfo") {
            $this->_saveUserInfo();
        }
    }

    public function getFunc()
    {
        $mode = $this->args["mode"];
        if ($mode === "getUserInfo") {
            $this->_getUserInfo();
        }
    }

    private function _saveUserInfo() {
        $new_user_info = $this->args["newUserInfo"];
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
    }

    private function _getUserInfo() {
        $user_info_cookie = isset($_COOKIE["user_info"]) ? json_decode($_COOKIE["user_info"], 1) : ["style" => "asi-main"];
        echo json_encode(["success" => 1, "user_info_cookie" => $user_info_cookie]);
    }
}

?>