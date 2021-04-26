const jwt = require('jsonwebtoken');

module.exports = () => {
    const required = (req, res, next) => {
        try {
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]
            
            const decode = jwt.verify(token, process.env.JWT_KEY);
            req.user = decode;
            next();
        } catch (error) {
            return res.status(401).send({ mensagem: 'Falha na autenticação' });
        }    
    }

    return { required }
}