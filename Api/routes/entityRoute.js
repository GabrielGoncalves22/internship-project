module.exports = (app) => {

    app.route('/entity')
        .get(app.controllers.entityController.getEntitys)
        .post(app.controllers.entityController.postEntity)
}