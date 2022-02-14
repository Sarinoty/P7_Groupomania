const { PrismaClient } = require('@prisma/client')
const Prisma = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const prisma = new PrismaClient()

exports.signup = async (req, res, next) => {
    if (!verifNames(req.body.firstName))
        res.status(200).json({message: 'badInputFirstName'});
    else if (!verifNames(req.body.lastName))
        res.status(200).json({message: 'badInputLastName'});
    else {
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
                .then((data) => {
                    console.log(data)
                    const token = createToken(data.userId);
                    res.status(201).json({message: 'success', user: data.userId, token: token});
                })
                .catch (e => {
                    if (e instanceof Prisma.PrismaClientKnownRequestError) {
                        if (e.code === 'P2002') {
                        console.log('There is a unique constraint violation, a new user cannot be created with this email');
                        res.status(200).json({message : 'exists'});
                        }
                    }
                    throw e
                });
        }
        catch {error => res.status(500).json({error})};
    }
};

const createToken = (id) => {
    return jwt.sign({id}, process.env.SECRET_WORD, {expiresIn: '18h'})
};

exports.login = async (req, res, next) => {
    const user = await prisma.user.findUnique({
        where: {
            email: req.body.email
        },
    })
    .then(userData => {
        if(!userData) {
            return res.status(200).json({message: 'unknown'})}
        bcrypt.compare(req.body.password, userData.password)
            .then(valid => {
                if(!valid) {
                    return res.status(200).json({message: 'mdpIncorrect'});
                }
                const token = createToken(userData.userId);
                res.status(200).json({currentUser: userData.userId, token: token});
            })
            .catch((error) => res.status(500).json({error}));;
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

function verifNames(n) {
    return /^[^@&"()!_$*€£`+=\/;?#\d]+$/.test(n);
}