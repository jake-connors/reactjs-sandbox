<?php
class API_Endpoint
{
    public $args = [];
    
    public function __construct($args)
    {
        $this->args = $args;
    }

    public function getFunc()
    {
        return "No GET option for this API";
    }

    public function postFunc()
    {
        return "No POST option for this API";
    }

    public function putFunc()
    {
        return "No PUT option for this API";
    }

    public function deleteFunc()
    {
        return "No DELETE option for this API";
    }
}

?>