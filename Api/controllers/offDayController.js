module.exports = (app) => {
    
    const getOffDays = async (req, res) => {
        try {
            const query = "Select offDayId, description, date from offDay where employeeId = ?"; 
            const result = await app.config.connectionDB(query, [req.user.employeeId]);

            return res.status(200).send(result);

        } catch (error) {
            return res.status(500).send(error);
        }
    };

    const postOffDays = async (req, res) => {
        try {
            if (!req.body.employeeId || !req.body.date) {
                return res.status(400).send("Dados incompletos!");
            } else {
                const query = "Insert into offDay (employeeId, description, date) values (?, ?, ?)";
                const result = await app.config.connectionDB(query, [req.body.employeeId, req.body.description, req.body.date]);

                return res.status(201).send("Registo inserido com sucesso!");
            }
        } catch (error) {
            return res.status(500).send(error);
        }
    };

    return { getOffDays, postOffDays }
};