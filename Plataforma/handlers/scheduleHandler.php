<?php
    include_once '../web/common.php';

    $url = $server . '/schedule/all';
    
    $options = array(
        'http' => array(
            'header'  => 'Authorization: Bearer ' . $_SESSION['token'],
            'method'  => 'GET'            
        )
    );
    $context = stream_context_create($options);
    $result = json_decode(@file_get_contents($url, false, $context));
?>