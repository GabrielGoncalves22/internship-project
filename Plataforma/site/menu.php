<?php
    include_once '../site/header.php';
    $url = $_SERVER['PHP_SELF'];

    session_start();
    if (!isset($_SESSION['token'])) {
        header('Location: ../views/login.php');
    }
?>
    <section class="backend-section">
        <article class="backend-article">
            <ul class="backend-article-list">
                <li><a href="../views/employee.php" class="<?php echo (strpos($url, 'views/employee.php') != false) ? "active-link" : "" ?>">Funcionários</a></li>
                <li><a href="../views/attendance.php" class="<?php echo (strpos($url, 'views/attendance.php') != false) ? "active-link" : "" ?>">Registos</a></li>
                <li><a href="../views/closedDay.php" class="<?php echo (strpos($url, 'views/closedDay.php') != false) ? "active-link" : "" ?>">Dias fechados</a></li>
                <li><a href="../views/offDay.php" class="<?php echo (strpos($url, 'views/offDay.php') != false) ? "active-link" : "" ?>">Dias de folga</a></li>
                <li><a href="../views/login.php" onclick = "logout()"><span class="glyphicon glyphicon-off"></span>Terminar Sessão</a></li>
            </ul>
        </article>