const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (app) => {

    const getEmployees = async (req, res) => {
        try {
            const query = "Select employeeId, name, email from employee";
            const result = await app.config.connectionDB(query);

            return res.status(200).send(result);
        } catch (error) {
            return res.status(500).send(error);
        }
    };

    const postEmployee = async (req, res) => {
        try {

            let query = "Select * from employee where email = ?";
            let result = await app.config.connectionDB(query, [req.body.email.toLowerCase()]);
    
            if (result.length > 0) {
                return res.status(409).send("Já se encontra registado um funcionário com o email indicado!");
            } else {
                const hash = await bcrypt.hash(req.body.password, 10);

                query = "Insert into employee (name, email, password) values (?, ?, ?)";
                result = app.config.connectionDB(query, [req.body.name, req.body.email.toLowerCase(), hash]);
                
                return res.status(201).send("Funcionário criado com sucesso");
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
                const query = "Select * from employee where email = ?";
                const result = await app.config.connectionDB(query, [req.body.email.toLowerCase()]);

                if (result.length > 0) {
                    if (await bcrypt.compare(req.body.password, result[0].password)) {
                        const payload = {
                            employeeId: result[0].employeeId, 
                        };

                        const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 300 });

                        return res.status(200).send({message: 'Login efetuado com sucesso!', token: token});

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