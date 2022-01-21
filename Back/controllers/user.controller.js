const { PrismaClient } = require('@prisma/client')
const Prisma = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const prisma = new PrismaClient()

exports.signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(14);
        const passwordHashed = bcrypt.hashSync(req.body.password, salt)

        const User = await prisma.user.create({
            data: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: passwordHashed,
                imageUrl: '',
                bio: ''
            }
            })
            .then(() => res.status(201).json({message: 'Utilisateur créé avec succès.'}))
            .catch (e => {
                if (e instanceof Prisma.PrismaClientKnownRequestError) {
                    // The .code property can be accessed in a type-safe manner
                    if (e.code === 'P2002') {
                      console.log('There is a unique constraint violation, a new user cannot be created with this email');
                      res.status(401).json({message : 'Il existe déjà un utilisateur ayant cette adresse e-mail !'});
                    }
                  }
                  throw e
            });
    }
    catch {error => res.status(500).json({error})};
};

exports.login = async (req, res, next) => {
    const user = await prisma.user.findUnique({
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

exports.updateProfile = async (req, res, next) => {
    const userProfile = req.file ?
    {
        ...JSON.parse(req.body.user),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};

    if (req.file) {
        const findOldImg = await prisma.user.findUnique({
            where: {
                userId: parseInt(req.params.userId)
            }
        })
        .then(data => {
            if (data.imageUrl !== '') {
                const fileToDelete = data.imageUrl.split('/images/')[1];
                fs.unlink(`images/${fileToDelete}`, () => {
                    console.log("Ancienne image supprimée.");
                })
            }
        })
        .catch (e => res.status(500).json({message: 'Erreur dans findOldImg'}));
    }

    const updateUser = await prisma.user.update({
        where: {
            userId: parseInt(req.params.userId)
        },
        data: userProfile
    })
    .then(() => res.status(200).json({message: 'Profil modifié avec succès'}))
    .catch(e => res.status(500).json({message: 'Erreur dans updateUser'}));
};

exports.deleteProfile = async (req, res, next) => {
    const deleteProfile = await prisma.user.delete({
        where: {
            userId: parseInt(req.params.userId)
        }
    })
        .then(() => res.status(200).json({message: "Utilisateur supprimée avec succès !"}))
        .catch(e => res.status(500).json({message: "Erreur dans deleteProfile"}));
};