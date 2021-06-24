<?php
    include_once '../site/menu.php';
    include_once '../handlers/attendanceHandler.php';
?>
        <aside class="backend-aside">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Id de Registo</th>
                        <th scope="col">Funcionário</th>
                        <th scope="col">Data</th>
                        <th scope="col">Tipo de Registo</th>
                    </tr>
                </thead>
                <tbody>
                    <?php 
                        foreach ($result as $attendance) {
                    ?>                
                    <tr>
                        <td><?= $attendance->attendanceId ?></td>
                        <td><?= $attendance->infoEmployee ?></td>
                        <td><?= date_format(date_create($attendance->dateAttendance), 'd/m/Y H:i:s') ?></td>
                        <td><?= $attendance->typeAttendance ?></td>
                    </tr>
                    <?php } ?>
                </tbody>
            </table>
        </aside>
    <section>
<body>
<html>