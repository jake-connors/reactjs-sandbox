<?php

require_once __DIR__ . "/utilities/autocomplete.php";

use Autocomplete\Utilities as Utils;

class Autocomplete_Autocomplete extends API_Endpoint
{
    public function getFunc()
    {
        if (!isset($this->args["mode"])) {
            return;
        }

        $Autocomplete = new Utils\Autocomplete($this->args["mode"]);
        $results = $Autocomplete->getAutocomplete();
        echo json_encode(["success" => 1, "results" => $results]);
    }
}
?>
