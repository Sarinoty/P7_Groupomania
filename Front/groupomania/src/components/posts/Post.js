import React, { useState } from "react";
import '../../styles/Post.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faThumbsUp, faCommentAlt, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { isEmpty } from "../Utils";
import { useSelector, useDispatch } from "react-redux";
import { dateParser } from '../../utils/Date';
import { deletePost, getPosts } from "../../actions/post.action";
import { addComment, deleteCommentByPostId, getAllComments } from "../../actions/comment.action";
import ComThread from "./ComThread";
import { addLike, deleteLike, deleteLikeByPostId, getLikes } from "../../actions/like.action";



const Post = ({post}) => {
    const usersData = useSelector((state) => state.usersReducer);
    const commentsData = useSelector((state => state.commentReducer));
    const likesData = useSelector((state) => state.likesReducer);
    const userData = useSelector((state) => state.userReducer);
    const [comText, setComText] = useState('');
    const [viewComments, setViewComments] = useState(false);
    const dispatch = useDispatch();

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

    const sendComment = async () => {
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

    return (
        <div className="post" key={post.postId}>
            <div className="post__head">
                <div className="post__head__infos">
                    <div className="post__head__infos__img">
                        <img className="post__head__infos__img--img" src={!isEmpty(usersData[0])
                             ?usersData.map((user) => {
                                if (user.userId === post.authorId) return user.imageUrl;
                                else return null;}).join('')
                            : 'http://localhost:4000/images/noAvatar2.png'}
                                alt="Avatar de l'utilisateur"></img>
                    </div>
                    <div className="post__head__infos__name">{!isEmpty(usersData[0]) && usersData.map((user) => {
                        if(user.userId === post.authorId) return user.firstName + ' ' + user.lastName
                        else return null})}</div>
                    <div className="post__head__infos__date">{'Posté le ' + dateParser(parseInt(post.date))}</div>
                </div>
                <div className="post__head__delete">
                    {(post.authorId === parseInt(sessionStorage.currentUser) || userData.isAdmin) && (
                        <FontAwesomeIcon icon={faTimes} className='fas-times' onClick={ async() => {
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
            {!isEmpty(post.textContent) && (
                <div className="post__text">{post.textContent}</div>
            )}
            {post.imgContent && (
                <div className="post__content">
                    <img className="post__content--img" src={post.imgContent} alt=""></img>
                </div>
            )}
            <div className="post__stuff">
                <div className="post__stuff__likes" onClick={sendLike}>
                    <FontAwesomeIcon
                        icon={faThumbsUp}
                        className={isLikedByUser() ? 'comAndLike comAndLike--red' : 'comAndLike'}
                    /> 
                    <p className="post__stuff__numbers">{nbLikes()}</p>
                </div>
                <div className="post__stuff__comments" onClick={() => {setViewComments(!viewComments);}}>
                    <FontAwesomeIcon icon={faCommentAlt} className='comAndLike'/>
                    <p className="post__stuff__numbers">{nbComments()}</p>
                </div>
            </div>
            <div className="post__comment">
                <input className="post__comment--input" placeholder="Ajoutez un commentaire..." onChange={(e) => setComText(e.target.value)} value={comText}></input>
                <FontAwesomeIcon icon={faPaperPlane} className="post__comment--send" onClick={sendComment}/>
            </div>
            {!viewComments ? <div className="spacediv"></div> : <ComThread postId={post.postId}/>} 
        </div>
    )
};

export default Post;