module.exports = (app) => {

    app.route('/register')
        .get(app.controllers.registerController.getRegisters)
        .post(app.controllers.registerController.postRegister)
};