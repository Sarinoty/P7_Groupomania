const passCheck = require('../models/Password');

module.exports = (req, res, next) => {
    if(passCheck.validate(req.body.password)) {
        return next();
    }
    else {
        return res.status(200).json({message: 'invalidPassword'})
    }
};