module.exports = (app) => {

    app.route('/register')
        .get(app.controllers.registerController.getRegisters)
        .post(app.middleware.login.required, app.controllers.registerController.postRegister)
};