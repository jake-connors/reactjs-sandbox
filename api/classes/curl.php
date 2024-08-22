<?php

namespace Curl;

class Curl
{
    private static $maxRetryAttempts = 5;
    private static $retryDelaySeconds = 3;
    private static $connectTimeoutSeconds = 30;

    public static function doGet(string $url, array $headers = [], array $curlOptions = []) {
        $ch = curl_init($url);
        $streamVerboseHandle = fopen("php://temp", "w+");
        $chOptions = [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_STDERR => $streamVerboseHandle,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_HTTPHEADER => $headers
        ];
        foreach ($curlOptions as $option => $value) {
            $chOptions[$option] = $value;
        }
        curl_setopt_array($ch, $chOptions);
        return self::_executeCurl($ch, $streamVerboseHandle);
    }

    public static function doPost(
        string $url,
        mixed $data,
        array $headers = [],
        array $curlOptions = []
    ): array {
        return self::_doCurlWithData($url, "POST", $data, $headers, $curlOptions);
    }

    public static function doPut(
        string $url,
        mixed $data,
        array $headers = [],
        array $curlOptions = []
    ): array {
        return self::_doCurlWithData($url, "PUT", $data, $headers, $curlOptions);
    }

    public static function doDelete(
        string $url,
        mixed $data,
        array $headers = [],
        array $curlOptions = []
    ): array {
        return self::_doCurlWithData($url, "DELETE", $data, $headers, $curlOptions);
    }

    private static function _doCurlWithData(
        string $url,
        string $method,
        mixed $data,
        array $headers,
        array $curlOptions
    ): array {

        $ch = curl_init($url);
        $streamVerboseHandle = fopen("php://temp", "w+");
        $chOptions = [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_STDERR => $streamVerboseHandle,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_POSTFIELDS => $data,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_CONNECTTIMEOUT => self::$connectTimeoutSeconds,
        ];
        foreach ($curlOptions as $option => $value) {
            $chOptions[$option] = $value;
        }
        return self::_executeCurl($ch, $streamVerboseHandle);
    }

    private static function _executeCurl($ch, $streamVerboseHandle): mixed
    {
        // loop x times to retry
        $success = false;
        $attempts = 0;
        while ($success === false && $attempts < self::$maxRetryAttempts) {
            if ($attempts > 0) {
                // pause for x seconds, then retry
                sleep(self::$retryDelaySeconds);
            }
            $response = curl_exec($ch);
            $response_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            $success = self::_reachedServer($response_code);
            $attempts++;
        }

        if ($success === false) {
            echo json_encode(["error" => $response, "curl" => $ch, "streamVerboseHandle" => $streamVerboseHandle]);
        }
        curl_close($ch);
        $success = $response_code >= 200 && $response_code < 300;
        // $http_response_code = $response_code;
        json_decode($response);
        $result_is_json = json_last_error() === JSON_ERROR_NONE;
        $result = $result_is_json ? json_decode($response, true) : $response;
        return $result;
    }

    /** Returns true if we made a connection to the server.
     *
     * Success is defined as reaching the server, not whether the server returned a success code.
    */
    private static function _reachedServer(int $response_code): bool
    {
        if ($response_code === 0) {
            return false;
        }
        return true;
    }
}
?>