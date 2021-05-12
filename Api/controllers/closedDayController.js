module.exports = (app) => {
    
    const getClosedDays = async (req, res) => {
        try {
            const query = "Select closedDayId, description, date from closedDay where entityId = ?"; 
            const result = await app.config.connectionDB(query, [req.user.entityId]);

            return res.status(200).send(result);

        } catch (error) {
            return res.status(500).send(error);
        }
    };

    const postClosedDay = async (req, res) => {
        try {
            if (!req.body.date.trim()) {
                return res.status(400).send("Dados incompletos!");
            } else {
                const query = "Insert into closedDay (entityId, description, date) values (?, ?, ?)";
                const result = await app.config.connectionDB(query, [req.user.entityId, req.body.description, req.body.date]);

                return res.status(201).send("Registo inserido com sucesso!");
            }
        } catch (error) {
            return res.status(500).send(error);
        }
    };

    return { getClosedDays, postClosedDay }
};