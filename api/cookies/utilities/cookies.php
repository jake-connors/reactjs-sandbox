<?php

namespace Cookies\Utilities;

class Cookies {

    public static function getUserCookies(): array {
        $cookies = dbi_query("SELECT * FROM cookies");
        $all_cookies = [];
        foreach ($cookies as $cookie) {
            $cookie_name = $cookie["name"];
            $all_cookies[$cookie_name] = self::_getCookie($cookie_name, json_decode($cookie["default_json"], 1));
        }
        return $all_cookies;
    }

    public static function getAllCookies(): array {
        $all_cookies = dbi_query("SELECT * FROM cookies");
        return $all_cookies;
    }

    private static function _getCookie(string $cookie_name, mixed $default_value): array {
        $cookie = isset($_COOKIE[$cookie_name]) ? json_decode($_COOKIE[$cookie_name], 1) : $default_value;
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

    public static function allowAllCookies(): array {
        $all_cookies = self::getAllCookies();
        $allowed_cookies = [];
        foreach ($all_cookies as $cookie) {
            $cookie_name = $cookie["name"];
            if ($cookie_name !== "allowed_cookies") {
                $allowed_cookies[] = $cookie_name;
            }
        }
        self::saveCookie("allowed_cookies", $allowed_cookies);
        return $allowed_cookies;
    }

    public static function denyAllCookies(): int {
        $all_cookies = self::getAllCookies();
        foreach ($all_cookies as $cookie) {
            self::saveCookie($cookie["name"], [], true);
            self::removeAllowedCookie($cookie["name"]);
        }
        return 1;
    }

    public static function saveCookieSettings(array $cookies): int {
        foreach ($cookies as $cookie) {
            if ($cookie["clear"]) {
                self::saveCookie($cookie["name"], [], true);
                self::removeAllowedCookie($cookie["name"]);
            } else {
                self::saveAllowedCookie($cookie["name"]);
            }
        }
        return 1;
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