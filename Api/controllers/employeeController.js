module.exports = (app) => {

    const getEmployees = async (req, res, next) => {
        app.config.connectionDB().query('Select * from employees', function (err, result, fields) {
            res.send(result);
        });
    };

    return { getEmployees }
};