module.exports = (app) => {

    app.route('/attendance')
        .get(app.middleware.login.required, app.controllers.attendanceController.getAttendances)
        .post(app.middleware.login.required, app.controllers.attendanceController.postAttendance)
};