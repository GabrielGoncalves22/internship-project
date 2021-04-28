module.exports = (app) => {
    
    const getRegisters = async (req, res) => {
        try {
            const query = "Select * from register where employeeId = ? order by dateRegister desc";
            const result = await app.config.connectionDB(query, [req.user.employeeId]);

            return res.status(200).send(result);
        } catch (error) {
            return res.status(500).send(error);
        }
    };

    const postRegister = async (req, res) => {
        try {

            let query = "Select typeRegisterId from register where employeeId = ? order by dateRegister desc Limit 1";
            let result = await app.config.connectionDB(query, [req.user.employeeId])
            let nextTypeRegisterId;

            if (result.length > 0 && result[0].typeRegisterId === 1) {
                nextTypeRegisterId = 2;
            } else {
                nextTypeRegisterId = 1;
            }

            query = "Insert into register (employeeId, dateRegister, typeRegisterId) values (?, ?, ?)";
            result = app.config.connectionDB(query, [req.user.employeeId, new Date(), nextTypeRegisterId]);
            
            return res.status(201).send("Registo inserido com sucesso!");
                       
        } catch (error) {
            return res.status(500).send(error);
        }
    };

    return { getRegisters, postRegister }
};