module.exports = (app) => {

    app.route('/closedday')
        .get(app.middleware.login.required, app.controllers.closedDayController.getClosedDays)
        .post(app.middleware.login.requiredPermission, app.controllers.closedDayController.postClosedDay)

    app.route('/closedday/date')
        .get(app.middleware.login.required, app.controllers.closedDayController.getDateClosedDays)
};