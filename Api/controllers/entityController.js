module.exports = (app) => {
    let query, result;

    const getEntitys = async (req, res) => {
        try {
            query = "Select * from entity where entityId = ?";
            result = await app.config.connectionDB(query, [req.user.entityId]);

            return res.status(200).send(result);
        } catch (error) {
            return res.status(500).send(error);
        }
    };

    const postEntity = async (req, res) => {
        try {

            if (!req.body.name.trim() || !req.body.address.trim() || !req.body.postalCode.trim() || !req.body.locality.trim() || !req.body.telephone.trim() || !req.body.email.trim()) {
                return res.status(400).send("Dados incompletos!");
            } else {
                query = "Insert into entity (name, address, address2, postalCode, locality, telephone, fax, email) values (?, ?, ?, ?, ?, ?, ?, ?)";
                await app.config.connectionDB(query, [req.body.name, req.body.address, req.body.address2, req.body.postalCode, req.body.locality, req.body.telephone, req.body.fax, req.body.email]);

                return res.status(201).send("Entidade inserida com sucesso!");
            }
            
        } catch (error) {
            return res.status(500).send(error);
        }
    };

    return { getEntitys, postEntity }
};