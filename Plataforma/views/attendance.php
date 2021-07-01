<?php
    include_once '../site/menu.php';
    include_once '../handlers/attendanceHandler.php';

    $selectEmployee = null;
    if(isset($_POST['selectEmployee'])){
        $selectEmployee = $_POST['selectEmployee'];
    }
?>
        <aside class="backend-aside">
            <h3>Registos</h3>
            <form id="form-create-employee" enctype="multipart/form-data" method="POST">
                <div class="employee-filter">
                    <label>Filtar: </label>
                    <select class="form-control" name="selectEmployee" onchange="this.form.submit()">
                        <option value="" select>Todos os funcionários </option>
                        <?php
                            $uniques = [];
                            foreach ($result as $attendance) {
                                if (!in_array($attendance->employeeId, $uniques)){
                                    $uniques[] = $attendance->employeeId;                           
                        ?>
                            <option value="<?= $attendance->employeeId?>" <?php if($selectEmployee == $attendance->employeeId)  { echo " selected"; }?>> <?= $attendance->name?></option>
                        <?php } } ?>
                    </select>
                </div>
            </form>
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
                            if ($selectEmployee != null && $attendance->employeeId != $selectEmployee) {
                                $attendance = null;
                            }
                            
                            if ($attendance != null) {
                    ?>                
                        <tr>
                            <td><?= $attendance->attendanceId ?></td>
                            <td><?= $attendance->employeeId . ' - ' . $attendance->name?></td>
                            <td><?= date_format(date_create($attendance->dateAttendance), 'd/m/Y H:i:s') ?></td>
                            <td><?= $attendance->typeAttendance ?></td>
                        </tr>                           
                    
                    <?php } 
                        } ?>
                </tbody>
            </table>
        </aside>
    <section>
<body>
<html>