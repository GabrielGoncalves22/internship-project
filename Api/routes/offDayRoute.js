module.exports = (app) => {

    app.route('/offday')
        .get(app.middleware.login.required, app.controllers.offDayController.getOffDays)
        .post(app.middleware.login.requiredPermission, app.controllers.offDayController.postOffDays)
    
    app.route('/offday/date')
        .get(app.middleware.login.required, app.controllers.offDayController.getDateOffDays)
    
    app.route('/offday/all')
        .get(app.middleware.login.requiredPermission, app.controllers.offDayController.getAllOffDays)

    app.route('/offday/all/date')
        .get(app.middleware.login.requiredPermission, app.controllers.offDayController.getAllDateOffDays)
};