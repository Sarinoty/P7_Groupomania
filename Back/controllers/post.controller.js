const { PrismaClient } = require('@prisma/client');
const { findSync } = require('@prisma/client/runtime');
const prisma = new PrismaClient();
const fs = require('fs');

exports.addPost = async (req, res, next) => {
    try {
        if (req.file) {
            const {authorId, textContent, date} = req.body; // On destructure
            const imgContent = 'http://localhost:4000/' + req.file.path;
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
            const {authorId, textContent, imgContent, date} = req.body;
            const Post = await prisma.posts.create({
                data: {
                    authorId: parseInt(authorId),
                    textContent,
                    imgContent,
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

exports.getPostsByUser = async (req, res, next) => {
    const posts = await prisma.posts.findMany({
        where: {
            authorId : parseInt(req.params.id)
        }
    })
    .then((data) => res.status(200).json(data))
    .catch(e => {res.status(500).json(e)});
}

exports.getPost = async (req, res) => {
    const post = await prisma.posts.findUnique({
        where: {
            AND: {
                authorId: parseInt(req.params.authorId),
                date: req.params.date
            }
        }
    }).then((data) => res.status(200).jsons(data))
    .catch(e => res.status(500).json(e))
}

exports.updatePost = async (req, res) => {
    const Post = await prisma.posts.findUnique({
        where : {
            postId: parseInt(req.params.id)
        }
    })
    .then(data => {
        if (data.imgContent !== null && data.imgContent !== 'noPic') {
            const fileToDelete = data.imgContent.split('/images/')[1];
                fs.unlink(`images/${fileToDelete}`, () => {
                    console.log('Image du post supprimée.')
                })
        }
    })
    try {
        if (req.file) {
            const imgContent = 'http://localhost:4000/' + req.file.path;
            const NewPost = await prisma.posts.update({
                where : {
                    postId: parseInt(req.params.id)
                },
                data : {
                    textContent: req.body.textContent,
                    imgContent: imgContent
                }
            })
            .then(() => res.status(200).json({message: 'Post modifié avec succès !'}))
            .catch(e => res.status(500).json({message: 'Erreur dans updatePost ' + e}))
        }
        else {
            const NewPost = await prisma.posts.update({
                where : {
                    postId: parseInt(req.params.id)
                },
                data : {
                    textContent: req.body.textContent,
                    imgContent: req.body.imgContent
                }
            })
            .then(() => res.status(200).json({message: 'Post modifié avec succès !'}))
            .catch(e => res.status(500).json({message: 'Erreur dans updatePost ' + e}))
        }
    }
    catch {e => res.status(501).json(e)}
}

exports.deletePost = async (req, res, next) => {
    const post = await prisma.posts.findUnique({
        where: {
            postId : parseInt(req.params.id)
        }
    })
        .then(data => {
            if(data) {
                if (data.imgContent !== null) {
                    const fileToDelete = data.imgContent.split('/images/')[1];
                    fs.unlink(`images/${fileToDelete}`, () => {
                        console.log('Image du post supprimée.')
                    })
                }
                const deletePost = prisma.posts.delete({
                    where : {
                        postId : parseInt(req.params.id)
                    }
                }).then(res.status(200).json({message: 'Post supprimé avec succès.'}
                )).catch(e => res.status(500).json(e));
            }
            else console.log("Il n'y a pas de post à supprimer")
        })
        .catch((e) => console.log('Erreur dans findUnique de deletePost' + e))

    
}