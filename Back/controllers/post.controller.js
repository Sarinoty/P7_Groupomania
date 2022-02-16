const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.addPost = async (req, res, next) => {
    try {
        // Ici il n'y a pas de req.file et le req.body.imgContent est un objet vide.
        const {authorId, textContent, date} = req.body; // On déstructure
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
            date: 'desc'
        }
    }).then((data) => {
        //const donnees = JSON.stringify(data);
        res.status(200).json(data);
    }).catch(e => {
        res.status(403).json({e});
        console.log(e);
    });
}

exports.deletePost = async (req, res, next) => {
    console.log(typeof(req.params.id));
    console.log(req.params.id);
    const deletePost = await prisma.posts.delete({
        where : {
            postId : parseInt(req.params.id)
        }
    }).then(res.status(200).json({message: 'Post supprimé avec succès.'}
    )).catch(e => res.status(500).json(e));
}