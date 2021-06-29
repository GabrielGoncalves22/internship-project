<?php
    include_once '../site/menu.php';
?>
        <aside class="backend-aside">
            <h3>Criar Funcionário</h3>
            <form id="form-create-employee" enctype="multipart/form-data" method="POST">
                <div class="form-group">
                    <label>Nome: * </label>
                    <input type="text" class="form-control" id="employeeName" name="employeeName">
                </div>  
                <div class="form-group">
                    <label>Email: * </label>
                    <input type="text" class="form-control" id="employeeEmail" name="employeeEmail">
                </div>        
                <div class="form-group">
                    <label>Palavra-passe: * </label>
                    <input type="text" class="form-control" id="employeePassword" name="employeePassword">
                </div> 
                <div class="form-group">
                    <label>Morada Principal: * </label>
                    <input type="text" class="form-control" id="employeeMainAddress" name="employeeMainAddress">
                </div> 
                <div class="form-group">
                    <label>Morada Secundária: </label>
                    <input type="text" class="form-control" id="employeeSecondaryAddress" name="employeeSecondaryAddress">
                </div> 
                <div class="form-group">
                    <label>Código-Postal: * </label>
                    <input type="text" class="form-control" id="employeePostalCode" name="employeePostalCode">
                </div> 
                <div class="form-group">
                    <label>Localidade: * </label>
                    <input type="text" class="form-control" id="employeeLocality" name="employeeLocality">
                </div>                 
                <div class="form-group">
                    <label>Telemóvel: * </label>
                    <input type="text" class="form-control" id="employeeMobilePhone" name="employeeMobilePhone">
                </div> 
                <div class="form-group">
                    <label>Telefone: </label>
                    <input type="text" class="form-control" id="employeeTelephone" name="employeeTelephone">
                </div>
                <div class="form-group">
                    <label>Notas: </label>
                    <textarea cols="15" rows="5" style="resize:none" class="form-control" id="employeeGrades" name="employeeGrades"></textarea>
                </div>
                <div class="form-group">
                    <p class="alert" role="alert"></p>
                </div>
                <div class="form-group">
                    <input type="submit" class="btn btn-primary" value="Submeter"/>
                    <a href="employee.php" class="btn btn-danger">Cancelar</a>
                </div>           
            </form>
        </aside>
    </section>
</body>
<html>