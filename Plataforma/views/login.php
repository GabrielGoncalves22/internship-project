<?php
    include_once '../site/header.php';

    session_start();
    if (isset($_SESSION['token'])) {
        header('Location: ../views/employee.php');
    }
?>
    <div class="div-form-login">
        <div class="title-login">
            <p> Registo de Assiduidade </p>
        </div>
        <form class="form-login" id="form-login">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="text" class="form-control" id="email"/>
            </div>

            <div class="form-group">
                <label for="password">Palavra-passe</label>
                <input type="password" class="form-control" id="password"/>
            </div>

            <div>
                <p class="alert alert-danger" role="alert" id="infoLogin"></p>
            </div>

            <div class="form-group">
                <input type="submit" class="btn btn-primary" value="Entrar"/>
            </div>
        </form>
    </div>
</body>
</html>