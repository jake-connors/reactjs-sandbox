<?php

require_once $_SERVER["DOCUMENT_ROOT"] . "/api/classes/curl.php";

class IpLookup {
    public static function getIpAndLocation(): array {
        $url_ip_lookup = "https://api.ipify.org?format=json";
        $resp_ip_lookup = \Curl\Curl::doGet($url_ip_lookup);
        $ip_address = $resp_ip_lookup["ip"] ?? "";
        $display_location = "";
        if ($ip_address !== "") {
            $url_location_lookup = "http://ip-api.com/json/" . $ip_address;
            $resp_location_lookup = \Curl\Curl::doGet($url_location_lookup);
            $resp_status = $resp_location_lookup["status"] ?? "";
            if ($resp_status === "success") {
                $display_city = $resp_location_lookup["city"] ?? "city_not_found";
                $display_region = $resp_location_lookup["region"] ?? "region_not_found";
                $displayZip = $resp_location_lookup["zip"] ?? "zip_not_found";
                $display_location = $display_city . " " . $display_region . ", " . $displayZip;
            }
        }
        $ip = [
            "ip_address" => $ip_address,
            "display_location" => $display_location
        ];
        return $ip;
    }
}

?>