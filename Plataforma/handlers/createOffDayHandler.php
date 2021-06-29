<?php
    include_once '../web/common.php';

    session_start();

    $url = $server . '/offday';
    $data = array(
        'employeeId' => $_REQUEST["employeeId"],
        'description' => $_REQUEST["description"],
        'date' => $_REQUEST["date"]
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