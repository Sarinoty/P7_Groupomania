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
    else if (!verifMail(req.body.email))
        res.status(200).json({message: 'badInputMail'});
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
                    imageUrl: 'http://localhost:4000/images/noAvatar2.png', // En cas de modification ne pas oublier de modifier aussi updateProfile
                    bio: ''
                }
                })
                .then((data) => {
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
    return jwt.sign(
        {id},
        process.env.SECRET_WORD,
        {expiresIn: '18h'}
    )
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
                console.log('token créé ' + token) // A maintenir tant qu'on a besoin de faire des tests avec postman.
                res.status(200).json({currentUser: userData.userId, token: token});
            })
            .catch((error) => res.status(500).json({error}));;
    })
    .catch(error => res.status(500).json({error}));
};

const recupBool = (string) => {
    switch (string) {
        case 'true' :
            return true;
        case 'false' :
            return false;
    }
}

exports.updateProfile = async (req, res, next) => {
    let userProfile = null;
    const emailPrivate = recupBool(req.body.emailPrivate);
    if (req.file) {
        if (req.body.password) {
            userProfile = {
                email: req.body.email,
                emailPrivate: emailPrivate,
                password: crypting(req.body.password),
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                bio: req.body.bio
            }
        }
        else {
            userProfile = {
                email: req.body.email,
                emailPrivate: emailPrivate,
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                bio: req.body.bio
            }
        }
    }
    else if (req.body.password) {
        userProfile = {
            email: req.body.email,
            emailPrivate: emailPrivate,
            password: crypting(req.body.password),
            bio: req.body.bio
        }
    }
    else {
        userProfile = {
            email: req.body.email,
            emailPrivate: emailPrivate,
            bio: req.body.bio
        }
    }

    if (req.file) {
        const findOldImg = await prisma.user.findUnique({
            where: {
                userId: parseInt(req.params.userId)
            }
        })
        .then(data => {
            if (data.imageUrl !== 'http://localhost:4000/images/noAvatar2.png') {
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
    .catch(e => res.status(500).json({message: 'Erreur dans updateUser', e}));
};

exports.deleteProfile = async (req, res, next) => {
    const user = await prisma.user.findUnique({
        where: {
            userId: parseInt(req.params.id)
        }
    })
    .then((data) => {
        if (data.imageUrl && data.imageUrl !== 'http://localhost:4000/images/noAvatar2.png' && data.imageUrl !== 'noPic') {
            const fileToDelete = data.imageUrl.split('/images')[1];
            fs.unlink(`images/${fileToDelete}`, () => {
                console.log('Avatar supprimé')
            })
        }
    })
    .catch(e => console.log('Erreur lors de la suppression de l\'avatar : ' + e))
    const deleteProfile = await prisma.user.delete({
        where: {
            userId: parseInt(req.params.id)
        }
    })
        .then(() => res.status(200).json({message: "Utilisateur supprimé avec succès !"}))
        .catch(e => res.status(500).json({message: "Erreur dans deleteProfile"}));
};

exports.getAllUsers = async (req, res, next) => { // Nécessite l'envoie de l'userId dans le body de la requête pour passer le middleware authorize
    const getAllUsers = await prisma.user.findMany()
        .then(users => res.status(200).json(users))
        .catch(e => res.status(500).json({message: 'Echec de la requête de récupération des users'}));
}

exports.getUser = async (req, res, next) => {
    const getUser = await prisma.user.findUnique({
        where: {
            userId: parseInt(req.params.id)
        }
    }).then((user) => {
        if (user) res.status(200).json(user)
        else res.status(404).json({message: 'Il n\'y a pas d\'utilisateur ayant cet identifiant dans la base de données.'})})
    .catch(() => res.status(500).json({message: 'Echec de la requête pour récupérer 1 utilisateur'}));
}

function crypting(password) {
    try {
        const salt = bcrypt.genSaltSync(14);
        return bcrypt.hashSync(password, salt)
    } catch {(e) => console.log('Une erreur est survenue dans la fonction crypting : ' + e)}
}

function verifNames(n) {
    return /^[^@&"()!_$*€£`+=\/;?#\d]+$/.test(n);
}
/**
     * Vérifie que l'adresse e-mail saisie correspond bien au format xxx@xxx.xxx
     * @param { String } adresse 
     * @returns booléen
     */
 function verifMail(adresse) {
    return /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(adresse);
}