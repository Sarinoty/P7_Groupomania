const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient()

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 14)
    .then(hash => {
        const newUser = prisma.user.create({ // await est refusé
            data: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
                avatar: '',
                bio: ''
            },
        });
        return res.status(201).json({message: 'Utilisateur créé avec succès.'})
    })
    .catch(error => res.status(500).json({error}));
};

exports.login = (req, res, next) => {
    const user = prisma.user.findUnique({
        where: {
            email: req.body.email
        },
    })
    .then(userData => {
        if(!userData) {return res.status(401).json({error: 'Utilisateur non présent dans la base de données.'})}
        bcrypt.compare(req.body.password, userData.password)
            .then(valid => {
                if(!valid) {
                    return res.status(401).json({error: 'Mot de passe incorrect.'});
                }
                res.status(201).json({
                    userId: userData.userId,
                    token: jwt.sign(
                        {userId : userData.userId},
                        process.env.SECRET_WORD,
                        {expiresIn: '18h'}
                    )
                });
            })
            .catch(error => res.status(500).json({error}));;
    })
    .catch(error => res.status(500).json({error}));
};

exports.updateProfile = (req, res, next) => {
    const updateUser = prisma.user.update({
        where: {

        },
        data: {

        },
    })
};