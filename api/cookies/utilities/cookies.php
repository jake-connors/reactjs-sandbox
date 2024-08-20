<?php

namespace Cookies\Utilities;

class Cookies {

    public static function getAllCookies(): array {
        $all_cookies = dbi_query("SELECT * FROM cookies");
        return $all_cookies;
    }

    public static function getUserCookies(): array {
        $cookies = dbi_query("SELECT * FROM cookies");
        $user_cookies = [];
        foreach ($cookies as $cookie) {
            $cookie_name = $cookie["name"];
            $user_cookies[$cookie_name] = self::_getCookie($cookie);
        }
        return $user_cookies;
    }

    private static function _getCookie(array $cookie): array {
        $cookie_name = $cookie["name"];
        $cookie = isset($_COOKIE[$cookie_name]) ? $_COOKIE[$cookie_name] : $cookie["default_json"];
        $cookie = json_decode($cookie, 1);
        return $cookie;
    } 

    public static function saveCookie(string $cookie_name, array $cookie_data, bool $clear_cookie = false): int {
        $cookie_data = json_encode($cookie_data);
        $expires = time() + 60*60*24*365; // expires in a year
        if ($clear_cookie) {
            $expires *= -1;
        }
        $cookie_options = [
            "expires" => $expires
        ];
        setcookie($cookie_name, $cookie_data, $cookie_options);
        return 1;
    }

    public static function allowAllCookies(): int {
        $all_cookies = dbi_query("SELECT * FROM cookies WHERE require_consent");
        $allowed_cookies = [];
        foreach ($all_cookies as $cookie) {
            $allowed_cookies[] = $cookie["name"];
        }
        $user_cookie_settings = [
            "allowed_cookies" => $allowed_cookies,
            "allow_all" => true,
            "deny_all" => false,
        ];
        self::saveCookie("user_cookie_settings", $user_cookie_settings);
        return 1;
    }

    public static function denyAllCookies(): int {
        $all_cookies = dbi_query("SELECT * FROM cookies WHERE require_consent");
        foreach ($all_cookies as $cookie) {
            self::saveCookie($cookie["name"], [], true);
        }
        $user_cookie_settings = [
            "allowed_cookies" => [],
            "allow_all" => false,
            "deny_all" => true,
        ];
        self::saveCookie("user_cookie_settings", $user_cookie_settings);
        return 1;
    }

    public static function saveUserCookieSettings(array $cookies): int {
        $allowed_cookies = [];
        foreach ($cookies as $cookie) {
            if ($cookie["clear"]) {
                self::saveCookie($cookie["name"], [], true);
            } else {
                $allowed_cookies[] = $cookie["name"];
            }
        }
        $user_cookie_settings = [
            "allowed_cookies" => $allowed_cookies,
            "allow_all" => false,
            "deny_all" => false
        ];
        self::saveCookie("user_cookie_settings", $user_cookie_settings);
        return 1;
    }
}

?>