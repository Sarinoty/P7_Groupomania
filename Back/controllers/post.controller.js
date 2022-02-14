const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.addPost = async (req, res, next) => {
    /* console.log('Message de test');
    console.log(req.body); */

    try {
        const {authorId, textContent, date} = req.body;
        const Post = await prisma.posts.create({
            data: {
                authorId,
                textContent,
                date
            },
        })
        .then(res.status(200).json({message: 'Post créé'}))
        .catch (e => res.status(500).json({e}))
    }
    catch {e => res.status(501).json({e})}
}

exports.getAllPosts = async (req, res, next) => {
    const posts = await prisma.posts.findMany({
        orderBy: {
            date: 'asc'
        }
    }).then(data => {
        console.log('Voici les datas : ');
        console.log(typeof(data));
        console.log(data); // On obtient bien data dans le bash
        res.status(201).json({message : 'Pourquoi j\'arrive à envoyer ce message mais pas les data...'});
    }).catch(e => res.status(403).json({e}));
}