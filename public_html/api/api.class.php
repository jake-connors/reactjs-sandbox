<?php
require_once "./api.abstract.class.php";
require_once "./api.endpoint.class.php";

class API extends API_ABSTRACT
{
    public function __construct($request)
    {
        parent::__construct($request);

        header("Access-Control-Allow-Orgin: *");
        header("Access-Control-Allow-Methods: *");
        header("Content-Type: application/json");

        if (!is_array($this->request)) {
            if (is_string($this->request) && $this->_isJson($this->request)) {
                $request = json_decode($this->request, 1);
            } else {
                $request = [];
            }
        } else {
            $request = $this->request;
        }

        $this->args = array_merge($this->args, $request);
        unset($this->args["request"]);

        // this unpacks multi-dimensional array objects being sent over
        // the sending program should label it "json" so that the api can unpack it properly
        foreach ($this->args as $key => $arg) {
            if ($key === "json" && $this->method == "GET") {
                $this->args[$key] = json_decode($arg, 1);
            }
        }

        if (
            array_key_exists("json", $this->args) &&
            $this->args["json"] === null &&
            json_last_error() !== JSON_ERROR_NONE
        ) {
            echo "\n\API error: json decoding error (" . json_last_error_msg() . ")\n\n";
            exit();
        }
    }

    public function processAPI()
    {
        // add checks for file, class, method -- to fail nicely
        require_once $this->endpoint . "/" . $this->verb . ".php";

        $cls_nm = str_replace("/", "_", $this->endpoint) . "_" . $this->verb;
        if (class_exists($cls_nm)) {
            $obj = new $cls_nm($this->args);
            header("HTTP/1.1 200 OK");

            if ($this->method == "GET") {
                $obj->getFunc();
            } elseif ($this->method == "POST") {
                $obj->postFunc();
            } elseif ($this->method == "PUT") {
                $obj->putFunc();
            } elseif ($this->method == "DELETE") {
                $obj->deleteFunc();
            }
        } else {
            header("HTTP/1.1 500 Internal Server Error");
            echo "Error: The class name of the php class you are calling should be \"$cls_nm\" in lower or upper case";
        }

        //echo $this->_response("No Endpoint: $this->endpoint", 404);
    }

    private function _isJson($string): bool
    {
        json_decode($string);
        return json_last_error() === JSON_ERROR_NONE;
    }
}