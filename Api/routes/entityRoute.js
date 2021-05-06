module.exports = (app) => {

    app.route('/entity')
        .get(app.middleware.login.required, app.controllers.entityController.getEntitys)
        .post(app.controllers.entityController.postEntity)
};