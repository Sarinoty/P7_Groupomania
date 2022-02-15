const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // A ce stade on ne reçoit pas de req.file et on reçoit un req.body dont req.body.imgContent de type objet mais vide.
    // Si on utilise la méthode avec form-data, req.body est un objet vide.
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