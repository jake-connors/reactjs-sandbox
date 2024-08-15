<?php

namespace User\Utilities;

class User {

    public static function getUsers(): array {
        $users = dbi_query("SELECT * FROM users");
        return $users;
    }
    
    public static function saveUser(string $username, string $details, int|bool $isEdit): int {
        $params = [
            "username" => $username,
            "details" => $details
        ];
        if ($isEdit) {
            $sql = "UPDATE users SET details = ?:details WHERE username = ?:username";
        } else {
            $sql = "INSERT INTO users (username, details) VALUES (?:username, ?:details)";
        }
        return dbi_query($sql, $params);
    }
}

?>