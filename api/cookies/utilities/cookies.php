<?php

namespace Cookies\Utilities;

class Cookies {

    public static function getAllCookies(): array {
        $cookies = dbi_query("SELECT * FROM cookies");
        $all_cookies = [];
        foreach ($cookies as $cookie) {
            $cookie_name = $cookie["name"];
            $all_cookies[$cookie_name] = self::_getCookie($cookie_name, json_decode($cookie["default_json"], 1));
        }
        return $all_cookies;
    }

    private static function _getCookie(string $cookie_name, mixed $default_value): array {
        $cookie = isset($_COOKIE[$cookie_name]) ? json_decode($_COOKIE[$cookie_name], 1) : $default_value;
        return $cookie;
    } 

    public static function saveCookie(string $cookie_name, array $cookie_data): int {
        $cookie_data = json_encode($cookie_data);
        $cookie_options = [
            "expires" => time() + 60*60*24*365, // expires in a year
        ];
        setcookie($cookie_name, $cookie_data, $cookie_options);
        return 1;
    }

    public static function allowAllCookies(): array {
        $all_cookies = self::getAllCookies();
        $allowed_cookies = [];
        foreach ($all_cookies as $cookie_name => $cookie_value) {
            $allowed_cookies[] = $cookie_name;
        }
        self::saveCookie("allowed_cookies", $allowed_cookies);
        return $allowed_cookies;
    }

    public static function saveAllowedCookie(string $cookie_name): int {
        $allowed_cookies = self::_getCookie("allowed_cookies", []);        
        if (!in_array($cookie_name, $allowed_cookies)) {
            $allowed_cookies[] = $cookie_name;
            $cookie_data = json_encode($allowed_cookies);
            $cookie_options = [
                "expires" => time() + 60*60*24*365, // expires in a year
            ];
            setcookie("allowed_cookies", $cookie_data, $cookie_options);
        }
        return 1;
    }

    public static function removeAllowedCookie(string $cookie_name): int {
        $allowed_cookies = self::_getCookie("allowed_cookies", []);        
        $new_allowed_cookies = [];
        foreach ($allowed_cookies as $cookie) {
            if ($cookie !== $cookie_name) {
                $new_allowed_cookies[] = $cookie;
            }
        }
        return 1;
    }
}

?>