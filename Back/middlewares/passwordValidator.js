const passCheck = require('../models/Password');

module.exports = (req, res, next) => {
    if(passCheck.validate(req.body.password)) {
        return next();
    }
    else {
        return res.status(400).json({message: 'Le mot de passe doit être composé de 7 à 20 caractères avec des majuscules et minuscules, au moins un chiffre et sans espace.'})
    }
};