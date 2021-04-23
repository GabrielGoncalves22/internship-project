module.exports = (app) => {
    
    const getRegisters = async (req, res, next) => {
        try {
            const query = "Select * from register";
            const result = await app.config.connectionDB(query);

            return res.status(200).send(result);
        } catch (error) {
            return res.status(500).send(error);
        }
    };

    const postRegister = async (req, res, next) => {
        try {

            const query = "Insert into register (employeeId, dateRegister, typeRegisterId) values (?, ?, ?)";
            const result = app.config.connectionDB(query, [req.body.employeeId, new Date(), req.body.typeRegisterId]);
            
            return res.status(201).send("Registo inserido com sucesso!");
                       
        } catch (error) {
            return res.status(500).send(error);
        }
    };

    return { getRegisters, postRegister }
};