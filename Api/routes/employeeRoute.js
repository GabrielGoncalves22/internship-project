module.exports = (app) => {

    app.route('/employee')
        .get(app.controllers.employeeController.getEmployees)
        .post(app.controllers.employeeController.postEmployee)

    app.route('/login')
        .post(app.controllers.employeeController.loginEmployee)
};