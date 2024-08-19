<?php

namespace Users\Utilities;

class Users {

    public static function getUsers(): array {
        $users = dbi_query("SELECT * FROM users");
        return $users;
    }

    public static function saveUser(string $username, string $details): int {
        return self::_submitUser($username, $details, true);
    }

    public static function editUser(string $username, string $details): int {
        return self::_submitUser($username, $details, false);
    }

    public static function deleteUser(string|int $user_id): int {
        return dbi_query("DELETE FROM users WHERE id = ?:id", ["id" => $user_id]);
    }
    
    private static function _submitUser(string $username, string $details, bool $isNewUser): int {
        $params = [
            "username" => $username,
            "details" => $details
        ];
        if ($isNewUser) {
            $sql = "INSERT INTO users (username, details) VALUES (?:username, ?:details)";
        } else {
            $sql = "UPDATE users SET details = ?:details WHERE username = ?:username";
        }
        return dbi_query($sql, $params);
    }
}

?>