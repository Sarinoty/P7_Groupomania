const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getLikes = async(req, res) => {
    try {
        const like = await prisma.likes.findMany()
            .then((data) => res.status(200).json(data))
            .catch(e => res.status(500).json(e))
    }
    catch {e => res.status(500).json(e)}
}

exports.deleteLike = async (req, res) => {
    try {
        const delLike = await prisma.likes.deleteMany({
            where: {
                AND: {
                    postId: parseInt(req.params.postId),
                    userId: parseInt(req.params.userId)
                }
            }
        })
        .then(res.status(200).json({message: 'like supprimé'}))
        .catch(res.status(500).json(e))
    }
    catch {e => res.status(500).json(e)}
}

exports.deleteLikeByPostId = async (req, res) => {
    try {
        const delLike = await prisma.likes.deleteMany({
            where: {
                postId: parseInt(req.params.id)
            }
        })
        .then(res.status(200).json({message: 'like supprimé'}))
        .catch(res.status(500).json(e))
    }
    catch {e => res.status(500).json(e)}
}

exports.addLike = async (req, res) => {
    try {
        const newLike = await prisma.likes.create({
            data: {
                postId: parseInt(req.params.postId),
                userId: parseInt(req.params.userId)
            }
        })
        .then(res.status(200).json({message: 'Like ajouté'}))
        .catch(e => res.status(500).json(e))
    }
    catch {e => res.status(500).json(e)}
}