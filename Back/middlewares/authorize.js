const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const tokenRecupere = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(tokenRecupere, process.env.SECRET_WORD);
        const userId = decodedToken.id; // Ne pas hésiter à decoder le 2e morceau du token (decode base64) pour voir ce qu'il contient
        if (req.body.userId && req.body.userId !== userId) {
            throw res.status(403).json({message: 'User ID incorrect.'});
        }
        else {
            next();
        }
        
    } catch (error) {res.status(401).json({error: 'Requête non authentifiée.'})}
};