<?php
    include_once "../site/menu.php";
    include_once "../handlers/employeeHandler.php";
?>
        <aside class="backend-aside">
            <h3>Criar folga</h3>
            <form id="form-create-offDay" enctype="multipart/form-data" method="POST">
                <div class="form-group">
                    <label>Funcionário: * </label>
                    <select class="form-control" id="offDayEmployeeId" name="offDayEmployeeId">
                        <?php
                            foreach ($result as $employee) {
                        ?>
                            <option value="<?= $employee->employeeId?>"> <?= $employee->name?></option>
                        <?php   }   ?>
                    </select>
                </div>
                <div class="form-group">
                    <label>Descrição: </label>
                    <input type="text" class="form-control" id="offDayDescription" name="offDayDescription">
                </div>
                <div class="form-group">
                    <label>Data: * </label>
                    <input type="date" class="form-control" id="offDayDate" name="offDayDate">
                </div>
                <div class="form-group">
                    <p class="alert" role="alert"></p>
                </div>
                <div class="form-group">
                    <input type="submit" class="btn btn-primary" value="Submeter"/>
                    <a href="offDay.php" class="btn btn-danger">Cancelar</a>
                </div> 
            </form>
        </aside>
    </section>
</body>
</html>