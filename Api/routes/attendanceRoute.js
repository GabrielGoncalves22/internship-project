module.exports = (app) => {

    app.route('/attendance')
        .get(app.middleware.login.required, app.controllers.attendanceController.getAllAttendances)
        .post(app.middleware.login.required, app.controllers.attendanceController.postAttendance)
    
    app.route('/attendance/date')
    .get(app.middleware.login.required, app.controllers.attendanceController.getDateAttendances)
};