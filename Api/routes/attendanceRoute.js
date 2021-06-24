module.exports = (app) => {

    app.route('/attendance')
        .get(app.middleware.login.required, app.controllers.attendanceController.getAttendances)
        .post(app.middleware.login.required, app.controllers.attendanceController.postAttendance)

    app.route('/attendance/last')
        .get(app.middleware.login.required, app.controllers.attendanceController.getLastAttendance)
    
    app.route('/attendance/date')
        .get(app.middleware.login.required, app.controllers.attendanceController.getDateAttendances)

    app.route('/attendance/all')
        .get(app.middleware.login.requiredPermission, app.controllers.attendanceController.getAllAttendances)
};