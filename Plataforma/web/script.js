$(document).ready(function(){

    $("#form-login").unbind().submit(function(){
        let email = $("#email").val();
        let password = $("#password").val();

        if (!email || !password) {
            
            $("#infoLogin").text("Dados Vazios!")
            $(".info-login").show()
        
        } else {
            
            $.ajax({
                url: "../handlers/loginHandler.php",
                type: "POST",
                data: {email, password},
                dataType: "html",
                success: function(response) {  

                    switch(response) {
                        case 'Insucesso':
                            $("#infoLogin").text("Dados inválidos!")
                            $(".info-login").show()
                            break;
                        case 'Sucesso':
                            window.location.href = "./employee.php"
                            break;
                    }
                }
            });
        }
        return false;
    });  
});

function logout(){
    $.ajax({
        url: "../handlers/logoutHandler.php",
        success: function(response) {
        }                        
    });
};