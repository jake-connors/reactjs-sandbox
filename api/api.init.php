<?php
/*
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
*/

$host = "localhost";
$user = "u281149722_jake_user";
$pass = "SeeLotsaData123+";
$db = "u281149722_jake_db";
$connection = new mysqli($host, $user, $pass, $db) or die("Unable to connect.");

/** 
    * Executes an SQL query.
    * <b>Note:</b> Use the {@link dbi_error ()} function to get error information
    * if the connection fails.
    *
    * @param string  $sql           SQL of query to execute.
    * @param bool    $fatalOnError  Abort execution if there is a database error?
    * @param bool    $showError     Display error to user (including possibly the
    *                               SQL) if there is a database error?
    *
    * @return mixed The query result resource on queries (which can then be
    *               passed to the {@link dbi_fetch_row ()} function to obtain the
    *               results), or true/false on insert or delete queries.
*/
function dbi_query($sql, $params = []) {
    global $connection;
    
    $ref = new ReflectionClass("mysqli_stmt");
    $param_types = "";
    $params_to_bind_array = [];
    list ($sql, $param_types, $params_to_bind_array) = dbi_filter_sort_params(
        $sql,
        $params
    );

    $stmt = $connection->prepare($sql);
    if ($stmt === false){
        echo "Error preparing query.";
    }

    if (count($params_to_bind_array)) {
        $binding_array[] = $param_types;
        for ($i = 0; $i < count($params_to_bind_array); $i++) {
            $binding_array[] = &$params_to_bind_array[$i];
        }
        $ref = new ReflectionClass("mysqli_stmt");
        $method = $ref->getMethod("bind_param");
        $method->invokeArgs($stmt, $binding_array);
    }

    try {
        $execution_result = $stmt->execute();
    } catch (Exception $e) {
        echo "Error executing query. ";
        print_r($e);
        return false;
    }
    if ($execution_result === false) {
        echo "Error executing query.";
        return false;
    }

    $meta_data = $stmt->result_metadata();
    if ($meta_data != false) {
        $execution_result = $stmt->get_result();
        $res = [];
        while ($row = $execution_result->fetch_assoc()) {
            $res[] = $row;
        }
    } else {
        $res = true;
    }
    return $res;
}

function dbi_filter_sort_params($sql, $params)
{
    $tag_prefix = "?:";
    $params_in_order = [];

    if (!(array_keys($params) !== range(0, count($params) - 1))) {
        // The array is not associative, and therefore this query uses the standard "?" pattern.
        // Handle cases where there are too few params, too many, or correct #.
        $num_params_in_sql = substr_count($sql, "?");
        if (count($params) < $num_params_in_sql) {
            echo "<br>Too few parameters passed in for query.<br>";
        } elseif (count($params) > $num_params_in_sql) {
            $params_in_order = array_slice($params, 0, $num_params_in_sql);
        } else {
            $params_in_order = $params;
        }
    } else {
        // SQL Example: select * from webcal_user where cal_lastname = ?:lastname;
        // Pass params as an associative array: array("lastname" => "smith")
        // Optionally with bind type defined: array("lastname" => array("smith", "s"))
        $offset = 0;
        $orig_sql = $sql;
        while (($offset = strpos($sql, $tag_prefix, $offset)) !== false) {
            // Find the end of the tag. Tags can be alphanumeric and contain _, -, or .
            preg_match("/[^0-9_\-\.A-Za-z]+/", $sql, $matches, PREG_OFFSET_CAPTURE, $offset + 2);
            if (count($matches)) {
                $endPos = $matches[0][1];
            } else {
                $endPos = strlen($sql);
            }
            $length = $endPos - $offset;

            // Get the tag name
            $tag = substr($sql, $offset, $length);

            // Convert the tag name to "?" in the SQL statement (ex: "?:user_lastname" becomes "?")
            // and create a tag name variable stripped of the prefix
            $sql = preg_replace("/" . preg_quote($tag) . "/", " ?", $sql, 1);
            $tag_name = preg_replace("/[\{$tag_prefix}]/", "", $tag);

            // Save the parameters to an array in the correct order.
            // (We don't have to worry about saving too many params, since this is based on the sql.)
            if (array_key_exists($tag_name, $params)) {
                $params_in_order[] = $params[$tag_name];
            } else {
                echo "<br>Missing \"$tag_name\" parameter for query.<br>";
            }
        }
    }

    // Create a parameters array and a parameters type string for binding
    $params_to_bind_array = [];
    $param_types = "";
    foreach ($params_in_order as $parameter) {
        if (is_array($parameter)) {
            $param_types .= $parameter[1];
            if ($parameter[1] === "b") {
                // Blobs get sent to MySQL separately using send_long_data().
                // Use a $null variable containing NULL as a placeholder.
                // See https://blogs.oracle.com/oswald/entry/php_s_mysqli_extension_storing
                $null = null;
                $params_to_bind_array[] = $null;
            } else {
                $params_to_bind_array[] = $parameter[0];
            }
        } else {
            $param_types .= "s";
            $params_to_bind_array[] = $parameter;
        }
    }
    return [$sql, $param_types, $params_to_bind_array];
}

?>