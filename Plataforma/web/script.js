$(document).ready(function(){

    $("#form-login").unbind().submit(function(){
        let email = $("#email").val();
        let password = $("#password").val();

        if (!email || !password) {
            
            $(".alert").text("Dados Vazios!")
            $(".alert").show()
        
        } else {
            
            $.ajax({
                url: "../handlers/loginHandler.php",
                type: "POST",
                data: {email, password},
                dataType: "html",
                success: function(response) {  

                    response = response.split(' - ');    

                    if (response[0] === '200') {
                        window.location.href = "./employee.php"
                    } else {
                        $(".alert").text(response[1])
                        $(".alert").show()
                    }
                }
            });
        }
        return false;
    });

    $("#form-create-employee").unbind().submit(function(){
        let name = $("#employeeName").val();
        let email = $("#employeeEmail").val();
        let password = $("#employeePassword").val();
        let mainAddress = $("#employeeMainAddress").val();
        let secondaryAddress = $("#employeeSecondaryAddress").val();
        let postalCode = $("#employeePostalCode").val();
        let locality = $("#employeeLocality").val();
        let mobilePhone = $("#employeeMobilePhone").val();
        let telephone = $("#employeeTelephone").val();
        let grades = $("#employeeGrades").val();

        if (!name || !email || !password || !mainAddress || !postalCode || !locality || !mobilePhone) {
            $(".alert").removeClass("alert-success").addClass("alert-danger");
            $(".alert").text("Existem campos de preenchimento obrigatório por preencher!");
            $(".alert").show();
        } else {
            $.ajax({
                url: "../handlers/createEmployeeHander.php",
                type: "POST",
                data: {name, email, password, mainAddress, secondaryAddress, postalCode, locality, mobilePhone, telephone, grades},
                dataType: 'html',
                success: function(response) {

                    response = response.split(' - ');                   
                    $(".alert").text(response[1]);
                    $(".alert").show();

                    if (response[0] === '201') {
                        $(".alert").removeClass("alert-danger").addClass("alert-success");
                        
                        setTimeout(function() {
                            window.location.href = "../views/employee.php";
                        }, 1000);
                    } else {
                        $(".alert").removeClass("alert-success").addClass("alert-danger");
                    }
                }
            }); 
        };        
        return false;
    });

    $("#form-create-closedDay").unbind().submit(function(){
        let description = $("#closedDayDescription").val();
        let date = $("#closedDayDate").val();   
        
        if (!date) {
            $(".alert").removeClass("alert-success").addClass("alert-danger");
            $(".alert").text("Existem campos de preenchimento obrigatório por preencher!");
            $(".alert").show();
        } else {
            date = new Date(date);
        
            const currentData = new Date();
            
            date.setHours(0, 0, 0, 0)
            currentData.setHours(0, 0, 0, 0)   
                
            if (currentData > date) {
                $(".alert").removeClass("alert-success").addClass("alert-danger");
                $(".alert").text("A data não deve ser inferior à data atual!");
                $(".alert").show();
            } else { 
                $.ajax({
                    url: "../handlers/createClosedDayHandler.php",
                    type: "POST",
                    data: {description, date: $("#closedDayDate").val()},
                    dataType: "html",
                    success: function(response) {

                        response = response.split(' - ');    
                        $(".alert").text(response[1]);
                        $(".alert").show();

                        if (response[0] === '201') {
                            $(".alert").removeClass("alert-danger").addClass("alert-success");
                            
                            setTimeout(function() {
                                window.location.href = "../views/closedDay.php";
                            }, 1000);
                        } else {
                            $(".alert").removeClass("alert-success").addClass("alert-danger");
                        }
                    }
                });
            }
        };
        return false;
    });

    $("#form-create-offDay").unbind().submit(function(){
        let employeeId = $("#offDayEmployeeId").val();
        let description = $("#offDayDescription").val();
        let date = $("#offDayDate").val(); 

        alert(!employeeId)
        alert(!date)

        if (!employeeId || !date) {
            $(".alert").removeClass("alert-success").addClass("alert-danger");
            $(".alert").text("Existem campos de preenchimento obrigatório por preencher!");
            $(".alert").show();
        } else {
            date = new Date(date);
        
            const currentData = new Date();
            
            date.setHours(0, 0, 0, 0)
            currentData.setHours(0, 0, 0, 0) 
    
            if (currentData > date){
                $(".alert").removeClass("alert-success").addClass("alert-danger");
                $(".alert").text("A data não deve ser inferior à data atual!");
                $(".alert").show();
            } else {
                $.ajax({
                    url: "../handlers/createOffDayHandler.php",
                    type: "POST",
                    data: {employeeId, description, date: $("#offDayDate").val()},
                    dataType: "html",
                    success: function(response) {

                        response = response.split(' - ');                    
                        $(".alert").text(response[1]);
                        $(".alert").show();

                        if (response[0] === '201') {
                            $(".alert").removeClass("alert-danger").addClass("alert-success");
                            
                            setTimeout(function() {
                                window.location.href = "../views/offDay.php";
                            }, 2000);
                        } else {
                            $(".alert").removeClass("alert-success").addClass("alert-danger");
                        }
                    }   
                });
            }
        };
        return false
    });
});

function logout(){
    $.ajax({
        url: "../handlers/logoutHandler.php",
        success: function(response) {
        }                        
    });
};