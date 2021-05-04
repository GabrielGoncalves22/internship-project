module.exports = (app) => {

    const getEntitys = async (req, res) => {
        try {
            const query = "Select * from entity";
            const result = await app.config.connectionDB(query);

            return res.status(200).send(result);
        } catch (error) {
            return res.status(500).send(error);
        }
    }

    const postEntity = async (req, res) => {
        try {

            if (!req.body.name || !req.body.address || !req.body.postalCode || !req.body.locality || !req.body.telephone || !req.body.email) {
                return res.status(400).send("Dados incompletos!");
            } else {
                const query = "Insert into entity (name, address, address2, postalCode, locality, telephone, fax, email) values (?, ?, ?, ?, ?, ?, ?, ?)";
                const result = await app.config.connectionDB(query, [req.body.name, req.body.address, req.body.address2, req.body.postalCode, req.body.locality, req.body.telephone, req.body.fax, req.body.email]);

                return res.status(201).send("Entidade inserida com sucesso!");
            }
            
        } catch (error) {
            return res.status(500).send(error);
        }
    }

    return { getEntitys, postEntity }
};