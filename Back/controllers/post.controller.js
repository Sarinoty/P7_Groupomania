const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.addPost = async (req, res, next) => {
    try {
        if (req.file) {
            const {authorId, textContent, date} = req.body; // On destructure
            const imgContent = 'http://localhost:4000/' + req.file.path; // Quelle url faut-il ?
            const Post = await prisma.posts.create({
                data: {
                    authorId: parseInt(authorId),
                    textContent,
                    imgContent,
                    date
                }
            })
            .then(res.status(200).json({message: 'Post créé'}))
            .catch (e => res.status(500).json({e}))
        }
        else {
            const {authorId, textContent, date} = req.body;
            const Post = await prisma.posts.create({
                data: {
                    authorId: parseInt(authorId),
                    textContent,
                    date
                },
            })
            .then(res.status(200).json({message: 'Post créé'}))
            .catch (e => res.status(500).json({e}))
        }
    }
    catch {e => res.status(501).json({e})}
}

exports.getAllPosts = async (req, res, next) => {
    const posts = await prisma.posts.findMany({
        orderBy: {
            date: 'desc'
        }
    }).then((data) => {
        res.status(200).json(data);
    }).catch(e => {
        res.status(403).json({e});
        console.log(e);
    });
}

exports.deletePost = async (req, res, next) => {
    const deletePost = await prisma.posts.delete({
        where : {
            postId : parseInt(req.params.id)
        }
    }).then(res.status(200).json({message: 'Post supprimé avec succès.'}
    )).catch(e => res.status(500).json(e));
}