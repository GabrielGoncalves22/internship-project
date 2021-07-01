<?php 
    include_once '../web/common.php';
    
    $url = $server . '/login';
    $data = array(
            'email' => $_REQUEST["email"],
            'password' => $_REQUEST["password"],
            'permission' => 1
    );    
    $options = array(
        'http' => array(
            'header'  => 'Content-type: application/json',
            'ignore_errors' => true,
            'method'  => 'POST',
            'content' => json_encode($data)
        )
    );
    $context  = stream_context_create($options);
    $result = @file_get_contents($url, false, $context);
    
    if (parseHeaderResponseCode($http_response_header) === 200) {
        session_start();
        $obj = json_decode($result);
        $_SESSION['token'] = $obj->{'token'};
    };

    echo parseHeaderResponseCode($http_response_header) . ' - ' . $result;
?>