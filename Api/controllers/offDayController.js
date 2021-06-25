module.exports = (app) => {
    let query, result;

    const getAllOffDays = async (req, res) => {
        try {
            query = "Select offDays.offDayId, concat(employees.employeeId, ' - ', employees.name) As 'infoEmployee', offDays.description, offDays.date from offDays inner join employees on offDays.employeeId = employees.employeeId where employees.entityId = ? order by date asc";
            result = await app.config.connectionDB(query, [req.user.entityId]);

            return res.status(200).send(result);

        } catch (error) {
            return res.status(500).send(error);
        }
    };

    const getAllDateOffDays = async (req, res) => {
        try {
            query = "Select offDays.offDayId, concat(employees.employeeId, ' - ', employees.name) As 'infoEmployee', offDays.description, offDays.date from offDays inner join employees on offDays.employeeId = employees.employeeId where offDays.date >= ? and offDays.date <= ? and employees.entityId = ? order by date asc";
            result = await app.config.connectionDB(query, [req.query.initialDate, req.query.finalDate, req.user.entityId]);

            return res.status(200).send(result);

        } catch (error) {
            return res.status(500).send(error);
        }
    };

    const getOffDays = async (req, res) => {
        try {
            query = "Select offDayId, description, date from offDays where employeeId = ? order by date asc"; 
            result = await app.config.connectionDB(query, [req.user.employeeId]);

            return res.status(200).send(result);

        } catch (error) {
            return res.status(500).send(error);
        }
    };

    const getDateOffDays = async (req, res) => {
        try {
            query = "Select offDayId, description, date from offDays where date >= ? and date <= ? and employeeId = ? order by date asc";
            result = await app.config.connectionDB(query, [req.query.initialDate, req.query.finalDate, req.user.employeeId]);

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
                query = "Insert into offDays (employeeId, description, date) values (?, ?, ?)";
                await app.config.connectionDB(query, [req.body.employeeId, req.body.description, req.body.date]);

                return res.status(201).send("Registo inserido com sucesso!");
            }
        } catch (error) {
            return res.status(500).send(error);
        }
    };

    return { getAllOffDays, getAllDateOffDays, getOffDays, getDateOffDays, postOffDays }
};