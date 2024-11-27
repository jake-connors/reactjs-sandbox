<?php

namespace Autocomplete\Utilities;

class Autocomplete
{
    private $results = [];

    public function __construct($mode)
    {
        if (!isset($_GET["limit"])) {
            $_GET["limit"] = 150;
        }

        if (!isset($_GET["q"])) {
            $_GET["q"] = "";
        }

        switch ($mode) {
            case "users":
                $this->results = $this->_getUsers($mode);
                break;
            default:
                $this->results = []; 
                break;
        }
    }

    public function getAutocomplete(): array {
        return $this->results;
    }

    // autocomplete functions:

    private function _getUsers() {
        $params = [
            "limit" => $_GET["limit"],
            "search_str" => "%" . $_REQUEST["q"] . "%"
        ];
        $where = " username LIKE ?:search_str ";
        if (isset($_REQUEST["detailsOnly"])) {
            $where = " details LIKE ?:search_str ";
        } elseif (isset($_REQUEST["includeDetails"])) {
            $where .= " OR details LIKE ?:search_str ";
        }        
        $sql = "SELECT *
        FROM users
        WHERE $where
        ORDER BY username ASC
        LIMIT ?:limit
        ";
        $results = dbi_query($sql, $params);
        $this->results = $results;
        return $this->results;
    }

}

?>