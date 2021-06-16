module.exports = (app) => {
    let query, result;
    
    const getClosedDays = async (req, res) => {
        try {
            query = "Select closedDayId, description, date from closedDays where entityId = ?"; 
            result = await app.config.connectionDB(query, [req.user.entityId]);

            return res.status(200).send(result);

        } catch (error) {
            return res.status(500).send(error);
        }
    };

    const getDateClosedDays = async (req, res) => {
        try {
            query = "Select closedDayId, description, date from closedDays where date >= ? and date <= ? and entityId = ?";
            result = await app.config.connectionDB(query, [req.query.initialDate, req.query.finalDate, req.user.entityId]);

            return res.status(200).send(result);
            
        } catch (error) {
            return res.status(500).send(error);
        }
    };

    const postClosedDay = async (req, res) => {
        try {
            if (!req.body.date) {
                return res.status(400).send("Dados incompletos!");
            } else {
                query = "Insert into closedDays (entityId, description, date) values (?, ?, ?)";
                await app.config.connectionDB(query, [req.user.entityId, req.body.description, req.body.date]);

                return res.status(201).send("Registo inserido com sucesso!");
            }
        } catch (error) {
            return res.status(500).send(error);
        }
    };

    return { getClosedDays, getDateClosedDays, postClosedDay }
};