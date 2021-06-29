<?php
    include_once '../web/common.php';

    session_start();

    $url = $server . '/employee';
    $data = array(
        'name' => $_REQUEST["name"],
        'email' => $_REQUEST["email"],
        'password' => $_REQUEST["password"],
        'address' => $_REQUEST["mainAddress"],
        'address2' => $_REQUEST["secondaryAddress"],
        'postalCode' => $_REQUEST["postalCode"],
        'locality' => $_REQUEST["locality"],
        'mobilePhone' => $_REQUEST["mobilePhone"],
        'telephone' => $_REQUEST["telephone"],
        'grades' => $_REQUEST["grades"],
    );
    $options = array(
        'http' => array(
            'header'  => array ('Content-type: application/json',
                                'Authorization: Bearer ' . $_SESSION['token']),                                
            "ignore_errors" => true,
            'method'  => 'POST',
            'content' => json_encode($data)
        )
    );
    $context = stream_context_create($options);
    $result = @file_get_contents($url, false, $context);
   
    echo parseHeaderResponseCode($http_response_header) . ' - ' . $result;
?>