const bcrypt = require('bcrypt');

module.exports = (app) => {

    const getEmployees = async (req, res, next) => {
        try {
            const query = "Select * from employee";
            const result = await app.config.connectionDB(query);

            return res.status(200).send(result);
        } catch (error) {
            return res.status(500).send(error);
        }
    };

    const postEmployee = async (req, res, next) => {
        try {

            let query = "Select * from employee where email = ?";
            let result = await app.config.connectionDB(query, [req.body.email]);
    
            if (result.length > 0) {
                return res.status(409).send("Já se encontra registado um funcionário com o email indicado!");
            } else {
                const hash = await bcrypt.hash(req.body.password, 10);

                query = "Insert into employee (name, email, password) values (?, ?, ?)";
                result = app.config.connectionDB(query, [req.body.name, req.body.email, hash]);
                
                return res.status(201).send("Funcionário criado com sucesso");
            }            
        } catch (error) {
            return res.status(500).send(error);
        }
    };

    return { getEmployees, postEmployee }
};