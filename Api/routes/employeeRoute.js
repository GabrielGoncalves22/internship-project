module.exports = (app) => {

    app.route('/employees')
        .get(app.controllers.employeeController.getEmployees)
};
