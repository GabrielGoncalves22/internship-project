<?php 
    include_once '../web/common.php';
    
    $url = $server . '/login';
    $data = array(
            'email' => $_REQUEST["email"],
            'password' => $_REQUEST["password"]
    );    
    $options = array(
        'http' => array(
            'header'  => 'Content-type: application/json',
            'method'  => 'POST',
            'content' => json_encode($data)
        )
    );
    $context  = stream_context_create($options);
    $result = @file_get_contents($url, false, $context);

    if($result === false) {
        echo 'Insucesso';
    } else {
        session_start();
        $obj = json_decode($result);
        $_SESSION['token'] = $obj->{'token'};
        
        echo 'Sucesso';        
    }
?>