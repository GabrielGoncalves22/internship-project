module.exports = (app) => {
    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');
    let query, result;

    const getAllEmployees = async (req, res) => {
        try {
            query = "Select employees.employeeId, employees.name, employees.address, employees.address2, employees.postalCode, employees.locality, employees.mobilePhone, employees.telephone, employees.grades, users.email from employees inner join users on employees.userId = users.userId inner join entitys on employees.entityId = entitys.entityId where entitys.entityId = ? order by employees.employeeId asc";
            result = await app.config.connectionDB(query, [req.user.entityId]);

            return res.status(200).send(result);
        } catch (error) {
            return res.status(500).send(error);
        }
    };

    const getEmployee = async (req, res) => {
        try {
            query = "Select employees.employeeId, employees.name, employees.address, employees.address2, employees.postalCode, employees.locality, employees.mobilePhone, employees.telephone, employees.grades, users.email from employees inner join users on employees.userId = users.userId where employeeId = ?";
            result = await app.config.connectionDB(query, [req.user.employeeId]);

            return res.status(200).send(result);
        } catch (error) {
            return res.status(500).send(error);
        }
    };

    const postEmployee = async (req, res) => {
        try {

            if (!req.body.email.trim() || !req.body.password.trim() || !req.body.name.trim() || !req.body.address.trim() || !req.body.postalCode.trim() || !req.body.locality.trim() || !req.body.mobilePhone.trim()) {
                return res.status(400).send("Dados incompletos!");
            } else {
                query = "Select * from users where email = ?";
                result = await app.config.connectionDB(query, [req.body.email.toLowerCase()]);
        
                if (result.length > 0) {
                    return res.status(409).send("Já se encontra registado um funcionário com o email indicado!");
                } else {                    
                    const hash = await bcrypt.hash(req.body.password, 10);

                    query = "Insert into users (description, email, password, creationDate) values (?, ?, ?, ?)";
                    result = await app.config.connectionDB(query, [req.body.description, req.body.email.toLowerCase(), hash, new Date()]);

                    query = "Insert into employees (name, address, address2, postalCode, locality, telephone, mobilePhone, grades, entityId, userId) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                    await app.config.connectionDB(query, [req.body.name, req.body.address, req.body.address2, req.body.postalCode, req.body.locality, req.body.telephone, req.body.mobilePhone, req.body.grades, req.user.entityId, result.insertId]);

                    return res.status(201).send("Funcionário inserido com sucesso!");
                } 
            }
           
        } catch (error) {
            return res.status(500).send(error);
        }
    };

    const putEmployeePassword = async (req, res) => {
        try {
            if (!req.body.currentPassword || !req.body.newPassword) {
                return res.status(400).send("Dados incompletos!");
            } else {

                query = "Select users.userId, users.password from users inner join employees on users.userId = employees.userId where employees.employeeID = ?";
                result = await app.config.connectionDB(query, [req.user.employeeId]);                

                if (await bcrypt.compare(req.body.currentPassword, result[0].password)) {

                    if (req.body.currentPassword === req.body.newPassword) {
                        return res.status(401).send('A nova palavra-passe é igual à atual!');
                    } else {
                        const hash = await bcrypt.hash(req.body.newPassword, 10);

                        query = "Update users set password = ? where userId = ?";
                        await app.config.connectionDB(query, [hash, result[0].userId]);

                        return res.status(201).send("Palavra-passe alterada com sucesso!");
                    }
                } else {
                    return res.status(401).send('Palavra-passe atual errada!');
                }
            }
        } catch ( error ) {
            return res.status(500).send(error);
        }
    };

    const loginEmployee = async (req, res) => {
        try {

            if (!req.body.email.trim() || !req.body.password.trim()) {
                return res.status(400).send('Dados incompletos!');
            } else {
                query = "Select employees.employeeId, employees.entityId, users.password, users.permission, users.state from employees inner join users on employees.userId = users.userId where email = ?";
                result = await app.config.connectionDB(query, [req.body.email.toLowerCase()]);

                if (result.length > 0) {

                    if (await bcrypt.compare(req.body.password, result[0].password)) {
                        
                        if (req.body.permission && req.body.permission != result[0].permission) {
                            return res.status(401).send('O utilizador não possui permissões!');
                        } else {
                            const payload = {
                                employeeId: result[0].employeeId,
                                entityId: result[0].entityId,
                                permission: result[0].permission                           
                            };

                            const token = jwt.sign(payload, process.env.JWT_KEY);

                            if (result[0].state) {
                                return res.status(200).send({message: 'Login efetuado com sucesso!', token: token});
                            } else {
                                return res.status(401).send('A conta encontra-se desativada!');
                            }   
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
    };

    return { getAllEmployees, getEmployee, postEmployee, putEmployeePassword, loginEmployee }
};