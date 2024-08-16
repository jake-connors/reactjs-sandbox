<?php

require_once __DIR__ . "/utilities/user.php";
require_once __DIR__ . "/utilities/user_info_cookie.php";

use User\Utilities as Utils;

class User_User extends API_Endpoint
{
    
    public function postFunc()
    {
        $mode = $this->args["mode"];
        $result = 0;
        if ($mode === "submitUser") {
            $result = Utils\User::saveUser($this->args["username"], $this->args["details"], $this->args["isEditMode"]);
        } else if ($mode === "saveUserInfo") {
            $result = Utils\UserInfoCookie::saveUserInfoCookie($this->args["newUserInfo"]);
        }
        echo json_encode(["success" => $result]);
    }

    public function getFunc()
    {
        $mode = $this->args["mode"];
        if ($mode === "getUsers") {
            $users = Utils\User::getUsers();
            echo json_encode(["success" => 1, "users" => $users]);
        } else if ($mode === "getUserInfo") {
            $user_info_cookie = Utils\UserInfoCookie::getUserInfoCookie();
            echo json_encode(["success" => 1, "user_info_cookie" => $user_info_cookie]);
        }
    }
}

?>