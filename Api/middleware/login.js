const jwt = require('jsonwebtoken');

module.exports = () => {
    const required = (req, res, next) => {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            
            const decode = jwt.verify(token, process.env.JWT_KEY);
            req.user = decode;
            next();
        } catch (error) {
            return res.status(401).send({ mensagem: 'Falha na autenticação' });
        }    
    };

    const requiredPermission = (req, res, next) => {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            
            const decode = jwt.verify(token, process.env.JWT_KEY);

            if (decode.permission) {
                req.user = decode;
                next();
            } else {
                return res.status(401).send({ mensagem: 'Falha na autenticação' });
            }

        } catch (error) {
            return res.status(401).send({ mensagem: 'Falha na autenticação' });
        }    
    };

    return { required, requiredPermission };
};