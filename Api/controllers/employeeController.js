const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (app) => {

    const getEmployees = async (req, res) => {
        try {
            const query = "Select employee.employeeId, employee.name, employee.address, employee.address2, employee.postalCode, employee.locality, employee.mobilePhone, employee.telephone, employee.grades, user.email from employee inner join user on employee.userId = user.userId";
            const result = await app.config.connectionDB(query);

            return res.status(200).send(result);
        } catch (error) {
            return res.status(500).send(error);
        }
    };

    const postEmployee = async (req, res) => {
        try {

            if (!req.body.email || !req.body.password || !req.body.name || !req.body.address || !req.body.postalCode || !req.body.locality || !req.body.mobilePhone) {
                return res.status(400).send("Dados incompletos!");
            } else {
                let query = "Select * from user where email = ?";
                let result = await app.config.connectionDB(query, [req.body.email.toLowerCase()]);
        
                if (result.length > 0) {
                    return res.status(409).send("Já se encontra registado um funcionário com o email indicado!");
                } else {                    
                    const hash = await bcrypt.hash(req.body.password, 10);

                    query = "Insert into user (description, email, password, creationDate) values (?, ?, ?, ?)";
                    result = await app.config.connectionDB(query, [req.body.description, req.body.email.toLowerCase(), hash, new Date()]);

                    query = "Insert into employee (name, address, address2, postalCode, locality, telephone, mobilePhone, grades, entityId, userId) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                    result = await app.config.connectionDB(query, [req.body.name, req.body.address, req.body.address2, req.body.postalCode, req.body.locality, req.body.telephone, req.body.mobilePhone, req.body.grades, req.body.entityId, result.insertId]);

                    return res.status(201).send("Funcionário criado com sucesso!");
                } 
            }
           
        } catch (error) {
            return res.status(500).send(error);
        }
    };

    const loginEmployee = async (req, res) => {
        try {

            if (!req.body.email || !req.body.password) {
                return res.status(400).send('Dados incompletos!');
            } else {
                const query = "Select employee.employeeId, employee.entityId, user.password, user.permission, user.state from employee inner join user on employee.userId = user.userId where email = ?";
                const result = await app.config.connectionDB(query, [req.body.email.toLowerCase()]);

                if (result.length > 0) {

                    if (await bcrypt.compare(req.body.password, result[0].password)) {
                        const payload = {
                            employeeId: result[0].employeeId,
                            entityId: result[0].entityId,
                            permission: result[0].permission                           
                        };

                        const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 300 });

                        if (result[0].state) {
                            return res.status(200).send({message: 'Login efetuado com sucesso!', token: token});
                        } else {
                            return res.status(401).send('A conta encontra-se desativada!');
                        }                        

                    } else {
                        return res.status(401).send('A palavra-passe encontra-se inválida!');
                    }
                } else {
                    return res.status(401).send('Dados inválidos!');                   
                }
            }
        } catch (error) {
            return res.status(500).send(error);
        }
    }

    return { getEmployees, postEmployee, loginEmployee }
};