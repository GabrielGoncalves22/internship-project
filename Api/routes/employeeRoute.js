module.exports = (app) => {

    app.route('/employee')
        .get(app.middleware.login.required, app.controllers.employeeController.getEmployee)
        .post(app.middleware.login.requiredPermission, app.controllers.employeeController.postEmployee)

    app.route('/employee/password')
        .put(app.middleware.login.required, app.controllers.employeeController.putEmployeePassword)

    app.route('/employee/all')
        .get(app.middleware.login.requiredPermission, app.controllers.employeeController.getAllEmployees)

    app.route('/login')
        .post(app.controllers.employeeController.loginEmployee)
};