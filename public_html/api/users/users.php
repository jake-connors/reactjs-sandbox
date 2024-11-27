<?php

require_once __DIR__ . "/utilities/users.php";

use Users\Utilities as Utils;

class Users_Users extends API_Endpoint
{
    
    public function postFunc()
    {
        $mode = $this->args["mode"];
        $result = 0;
        if ($mode === "saveUser") {
            $result = Utils\Users::saveUser($this->args["username"], $this->args["details"]);
        } else if ($mode === "editUser") {
            $result = Utils\Users::editUser($this->args["username"], $this->args["details"]);  
        } else if ($mode === "deleteUser") {
            $result = Utils\Users::deleteUser($this->args["userId"]);
        }
        echo json_encode(["success" => $result]);
    }

    public function getFunc()
    {
        $mode = $this->args["mode"];
        if ($mode === "getUsers") {
            $users = Utils\Users::getUsers();
            echo json_encode(["success" => 1, "users" => $users]);
        }
    }
}

?>