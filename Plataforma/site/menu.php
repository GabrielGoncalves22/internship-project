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
                <li><a href="../views/employee.php" class="<?php echo (strpos($url, 'Views/employee.php') != false) ? "active-link" : "" ?>">Funcionários</a></li>
                <li><a href="../views/login.php">Terminar Sessão</a></li>
            </ul>
        </article>