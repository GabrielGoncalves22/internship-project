module.exports = (app) => {

    app.route('/schedule')
        .get(app.middleware.login.required, app.controllers.scheduleController.getSchedules)
        .post(app.middleware.login.requiredPermission, app.controllers.scheduleController.postSchedule)

    app.route('/schedule/employee')
        .post(app.middleware.login.requiredPermission, app.controllers.scheduleController.postEmployeeSchedule)
};