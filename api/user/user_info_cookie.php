<?php

class User_User_Info_Cookie extends API_Endpoint
{
    // public function postFunc()
    // {
        
    // }

    public function getFunc()
    {
        $test_user_info = [
            "user_id" => 123,
            "style" => "asi-csgo",
            "cookie_expire" => "21932"
        ];
        echo json_encode(["success" => 1, "user_info_cookie" => $test_user_info]);
    }
}

?>