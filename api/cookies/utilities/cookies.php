<?php
namespace Cookies\Utilities;

require_once __DIR__ . "/ip_lookup.php";

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

    public static function getUserIpAddress(array $user_cookies): array {
        $ip = [
            "ip_address" => "",
            "display_location" => ""
        ];
        $user_cookie_settings = $user_cookies["cookie_settings"] ?? [];
        $allowed_cookies = $user_cookie_settings["allowed_cookies"] ?? [];
        $user_cookie_settings_expires = $user_cookie_settings["expires"] ?? -1;
        $allowed_to_get_ip = $user_cookie_settings_expires == -1;
        foreach ($allowed_cookies as $cookie) {
            if ($cookie === "ip_address") {
                $allowed_to_get_ip = true;
            }
        }
        if ($allowed_to_get_ip) {
            $ip = \IpLookup::getIpAndLocation();
        }
        return $ip;
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
            $expires = 1;
        }
        $cookie_options = [
            "expires" => $expires,
            "samesite" => "None"
        ];
        setcookie($cookie_name, $cookie_data, $cookie_options);
        return 1;
    }

    public static function allowAllCookies(): array {
        $all_cookies = dbi_query("SELECT * FROM cookies WHERE require_consent");
        $allowed_cookies = [];
        foreach ($all_cookies as $cookie) {
            $allowed_cookies[] = $cookie["name"];
        }
        $user_cookie_settings = [
            "allowed_cookies" => $allowed_cookies,
            "allow_all" => true,
            "deny_all" => false,
            "expires" => time() + 60*60*24*365 // expires in a year
        ];
        self::saveCookie("cookie_settings", $user_cookie_settings);
        return $user_cookie_settings;
    }

    public static function denyAllCookies(): array {
        $all_cookies = dbi_query("SELECT * FROM cookies WHERE require_consent");
        foreach ($all_cookies as $cookie) {
            self::saveCookie($cookie["name"], [], true);
        }
        $user_cookie_settings = [
            "allowed_cookies" => [],
            "allow_all" => false,
            "deny_all" => true,
            "expires" => time() + 60*60*24*365 // expires in a year
        ];
        self::saveCookie("cookie_settings", $user_cookie_settings);
        return $user_cookie_settings;
    }

    public static function saveUserCookieSettings(array $cookies): array {
        $allowed_cookies = [];
        foreach ($cookies as $cookie) {
            if ($cookie["allowed"]) {
                $allowed_cookies[] = $cookie["name"];
            } else {
                self::saveCookie($cookie["name"], [], true);
            }
        }
        $user_cookie_settings = [
            "allowed_cookies" => $allowed_cookies,
            "allow_all" => false,
            "deny_all" => false,
            "expires" => time() + 60*60*24*365 // expires in a year
        ];
        self::saveCookie("cookie_settings", $user_cookie_settings);
        return $user_cookie_settings;
    }
}

?>