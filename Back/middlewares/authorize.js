const jwt = require('jsonwebtoken');

// Vérification que l'utilisateur utilise un token/userId valide.
module.exports = (req, res, next) => {
    try {
        const tokenRecupere = req.headers.authorization.split(' ')[1];
        //console.log(tokenRecupere);
        const decodedToken = jwt.verify(tokenRecupere, process.env.SECRET_WORD);
        const userId = decodedToken.userId;
        req.auth = {userId};
        if (req.body.userId && req.body.userId !== userId) {
            throw res.status(403).json({message: 'User ID incorrect.'});
        }
        else {
            next();
        }
        
    } catch (error) {res.status(401).json({error: error | 'Requête non authentifiée.'})}
};