import React, { useEffect, useState } from "react";
import '../../styles/Post.scss';
import '../../styles/utils/media-queries.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faCommentAlt, faPaperPlane, faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { isEmpty } from "../Utils";
import { useSelector, useDispatch } from "react-redux";
import { dateParser } from '../../utils/Date';
import { deletePost, getPosts, updatePost } from "../../actions/post.action";
import { addComment, deleteCommentByPostId, getAllComments } from "../../actions/comment.action";
import ComThread from "../Comment/ComThread";
import { addLike, deleteLike, deleteLikeByPostId, getLikes } from "../../actions/like.action";



const Post = ({post}) => {
    const usersData = useSelector((state) => state.usersReducer);
    const commentsData = useSelector((state => state.commentReducer));
    const likesData = useSelector((state) => state.likesReducer);
    const userData = useSelector((state) => state.userReducer);
    const [comText, setComText] = useState('');
    const [viewCommentField, setViewCommentField] = useState(false);
    const [viewComments, setViewComments] = useState(false);
    const [modifying, setModifying] = useState(false);
    const [fileDeleted, setFileDeleted] = useState(false);
    const [file, setFile] = useState();
    const [picture, setPicture] = useState();
    const [message, setMessage] = useState(post.textContent ? post.textContent : 'Ajoutez du texte');
    const [video, setVideo] = useState('');
    const dispatch = useDispatch();

/*     useEffect(() => {
        if (!post.imgContent && (post.imgContent.includes('https://www.youtu') || post.imgContent.includes('https://youtu'))) {
            setVideo(post.imgContent);
            setPicture();
            setFile();
        }
        else return false;
    }); */

    useEffect(() => {
        handleVideo();
    }, [message, video]);

    const nbComments = () => {
        let nb = 0;
        Array.prototype.forEach.call(commentsData, comment => {
            if(comment.postId === post.postId) nb++;
        })
        return nb;
    }
    const nbLikes = () => {
        let nb = 0;
        Array.prototype.forEach.call(likesData, like => {
            if(like.postId === post.postId) nb++;
        })
        return nb;
    }
    const isLikedByUser = () => {
        const liked = Array.from(likesData).find(like => like.postId === post.postId && like.userId === parseInt(sessionStorage.currentUser));
        if (liked === undefined) return false;
        else return true;
    }

    const sendComment = async (e) => {
        e.preventDefault();
        if (comText) {
            const dataCom = {
                postId: post.postId,
                authorId: parseInt(sessionStorage.currentUser),
                textContent: comText,
                date: Date.now().toString()
            }
            await dispatch(addComment(dataCom));
            dispatch(getPosts());
            dispatch(getAllComments());
            setComText('');
            setViewComments(true);
            setViewCommentField(false);
        }
    }

    const sendLike = async () => {
        const dataDel = {
            postId: post.postId,
            userId: parseInt(sessionStorage.currentUser)
        }
        if (isLikedByUser()) {
            await dispatch(deleteLike(dataDel));
            dispatch(getLikes());
        }
        else {
            await dispatch(addLike(dataDel));
            dispatch(getLikes());
        }
    }

    const handleVideo = () => {
        let linkToFind = message.split(' ');
        for (let i = 0; i < linkToFind.length; i++) {
            if (linkToFind[i].includes('https://www.youtu') || linkToFind[i].includes('https://youtu')) {
                let embeded = linkToFind[i].replace('watch?v=', 'embed/');
                setVideo(embeded.split('&')[0]);
                linkToFind.splice(i, 1);
                setMessage(linkToFind.join(' '));
                console.log(message)
                setPicture('');
                setFile('');
            }
        }
    }

    const handlePicture = (e) => {
        setPicture(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }

    const handleModify = async () => {
        if (file || message || fileDeleted || video) {
            const data = new FormData();
            if (fileDeleted) data.append('imgContent', 'noPic');
            else if (file) data.append('imgContent', file);
            else if (video) data.append('imgContent', video);
            if (message) data.append('textContent', message);
            else data.append('textContent', post.textContent);
            await dispatch(updatePost(post.postId, data));
            dispatch(getPosts());
            setModifying(false);
            setFileDeleted(false);
            setPicture();
        }
    }

    const deletePicture = () => {
        setFileDeleted(!fileDeleted);
        setPicture();
        setFile();
        setVideo('');
    }

    const largeurVideo = () => {
        const widew = window.innerWidth;
        let hauteur = 0;
        if (widew >= 940) {
            hauteur = (860 * 56.25)/100;
        }
        else {
            hauteur = ((widew - 80)*56.25)/100;
        }
        return hauteur;
    }

    return (
        <div className="post" key={post.postId}>
            <div className="post__head">
                <div className="post__head__infos">
                    <a className="post__head__infos__img" href={`/profile${post.authorId}`}>
                        <img className="post__head__infos__img--img" src={!isEmpty(usersData[0])
                            ? usersData.map((user) => {
                                if (user.userId === post.authorId) return user.imageUrl;
                                else return null;}).join('')
                            : 'http://localhost:4000/images/noAvatar2.png'}
                                alt="Avatar de l'utilisateur"></img>
                    </a>
                    <a className="post__head__infos__name" href={`/profile${post.authorId}`}>{!isEmpty(usersData[0]) && usersData.map((user) => {
                        if(user.userId === post.authorId) return user.firstName + ' ' + user.lastName
                        else return null})}
                    </a>
                    <div className="post__head__infos__date">{'Posté le ' + dateParser(parseInt(post.date))}</div>
                </div>
                <div className="post__head__delete">
                    {(post.authorId === parseInt(sessionStorage.currentUser)) && (
                        <FontAwesomeIcon icon={faPencilAlt} className='fas-times post__head__delete__icons' onClick={() => setModifying(!modifying)}/>)}
                    {(post.authorId === parseInt(sessionStorage.currentUser) || userData.isAdmin) && (
                        <FontAwesomeIcon icon={faTimes} className='fas-times post__head__delete__icons' onClick={ async() => {
                            if (window.confirm("Etes-vous sûr(e) ?\n(Cette action est irréversible)")) {
                                await dispatch(deleteCommentByPostId(post.postId));
                                await dispatch(deleteLikeByPostId(post.postId));
                                await dispatch(deletePost(post.postId));
                                dispatch(getAllComments());
                                dispatch(getLikes());
                                dispatch(getPosts());
                            }
                        }} />
                    )}
                </div>
            </div>
            {(!isEmpty(post.textContent) && !modifying) && (
                <div className="post__text">{post.textContent}</div>
            )}
            {modifying && (
                <div className={(!picture && (!post.imgContent || post.imgContent === 'noPic')) ? "post__text__div post__text__div--2" : "post__text__div"}>
                    <textarea
                        className="post__text__textarea"
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}>
                    </textarea>
                </div>
            )}
            {((post.imgContent && post.imgContent !== 'noPic') || picture || video) && 
                <div id="reference" className="post__content">
                    {(((post.imgContent && post.imgContent !== 'noPic' && (!post.imgContent.includes('https://www.youtu') || !post.imgContent.includes('https://youtu'))) || picture) && (video && video !== '')) &&
                        <img
                            className={fileDeleted ? "post__content--img post__content--img--darken" : "post__content--img"}
                            src={!picture ? post.imgContent : picture}
                            alt="Contenu non disponible"></img>
                    }
                    {(video || (post.imgContent.includes('https://www.youtu') || post.imgContent.includes('https://youtu'))) &&
                        <iframe
                            /* id="iframe" */
                            style={{width: '100%', height: largeurVideo()}}
                            className={fileDeleted ? "post__content__video post__content__video--darken" : "post__content__video"}
                            src={video ? video : post.imgContent}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={video}></iframe>
                    }
                    {modifying &&
                        <div className="post__content__icons">
                            <FontAwesomeIcon
                                icon={faTimes}
                                className="post__content__icons__cross"
                                onClick={(post.imgContent && post.imgContent !== 'noPic') ? () => {setFileDeleted(!fileDeleted)} : deletePicture}
                                title="Supprimer l'image du post"/>
                            <FontAwesomeIcon
                                icon={faPencilAlt}
                                className="post__content__icons__pencil"
                                title="Modifier l'image"/>
                            <input
                                className="post__content__icons__input"
                                type='file'
                                accept='.jpg, .jpeg, .png, .webp'
                                onChange={(e) => handlePicture(e)}
                                title="Modifier l'image">
                            </input>
                        </div>}
                    {(modifying && fileDeleted) && (<img src="./imgs/imageSlash.png" className="post__content__imgDelete" alt="L'image sera supprimée du post"></img>)}
                </div>
            }
            {modifying && (
                <div className="post__text__div">
                    <div className="post__text__div__upload">
                        <FontAwesomeIcon
                            className={file ? "post__text__div__upload__file--red" : "post__text__div__upload__file"}
                            icon={faImage}
                            title="Uploadez une image"/>
                        <input
                            className="post__text__div__upload__input"
                            type='file'
                            accept='.jpg, .jpeg, .png, .webp'
                            title='Uploadez une image'
                            onChange={(e) => handlePicture(e)}>
                        </input>
                    </div>
                    <FontAwesomeIcon className="post__text__send" icon={faPaperPlane} title="Enregistrer vos modifications" onClick={handleModify}/>
                </div>
            )}
            <div className="post__preStuff">
                <div className="post__preStuff__likes">
                    <FontAwesomeIcon
                        icon={faThumbsUp}
                    /> 
                    <p className="post__preStuff__numbers">{nbLikes()}</p>
                </div>
                <div className="post__preStuff__coms" onClick={() => {
                    if(!isEmpty(commentsData[0])) {
                        const isThereComments = Array.from(commentsData).find(comment => comment.postId === post.postId);
                        if (isThereComments) setViewComments(!viewComments);
                    }
                }}>
                    <p className="post__preStuff__numbers">{nbComments()}</p>
                    <p className="post__preStuff__texte">commentaire{nbComments() > 1 && 's'}</p>
                </div>
            </div>
            <div className="post__stuff">
                <div className="post__stuff__likes" onClick={sendLike}>
                    <FontAwesomeIcon
                        icon={faThumbsUp}
                        className={isLikedByUser() ? 'comAndLike comAndLike--red' : 'comAndLike'}
                    /> 
                    <p className={isLikedByUser() ? "post__stuff__texte post__stuff__texte--red" : "post__stuff__texte"}>J'aime</p>
                </div>
                <div className="post__stuff__comments" onClick={() => setViewCommentField(!viewCommentField)}>
                    <FontAwesomeIcon icon={faCommentAlt} className='comAndLike'/>
                    <p className="post__stuff__texte">Commenter</p>
                </div>
            </div>
            {viewCommentField &&
                <form className="post__comment" method="get" onSubmit={sendComment}>
                    <input
                        className="post__comment--input"
                        placeholder="Ajoutez un commentaire..."
                        onChange={(e) => setComText(e.target.value)}
                        value={comText}>
                    </input>
                    <FontAwesomeIcon icon={faPaperPlane} className="post__comment--send" type="submit" onClick={e => sendComment(e)}/>
                </form>
            }
            {!viewComments ? <div className="spacediv"></div> : <ComThread postId={post.postId}/>}
        </div>
    )
};

export default Post;