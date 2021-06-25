<?php
    include_once '../web/common.php';

    $date = date('Y-m-d');

    $url = $server . '/closedday/date?initialDate=' . $date . '&finalDate=' . date('Y-m-d', strtotime($date . ' + 365 days'));

    $options = array(
        'http' => array(
            'header'  => 'Authorization: Bearer ' . $_SESSION['token'],
            'method'  => 'GET'
        )
    );
    $context = stream_context_create($options);
    $result = json_decode(@file_get_contents($url, false, $context));
?>