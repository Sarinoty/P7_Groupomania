import React from "react";
import '../../styles/Post.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faThumbsUp, faCommentAlt, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Comment from "./Comment";
import { isEmpty } from "../Utils";
import { useSelector, useDispatch } from "react-redux";
import { dateParser } from '../../utils/Date';
import { deletePost, getPosts } from "../../actions/post.action";

const Post = ({post}) => {
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    //console.log(userData.imageUrl);
    //console.log(!isEmpty(usersData[0]));
    //console.log(usersData.map((user) => {if (user.userId === post.authorId) return user.imageUrl;}).join(''));
    // Sur thispersondoesnotexist ça sert à rien de copier un lien d'image, ça fournira tjs une image aléatoire. Vaut mieux les copier et éventuellement les héberger ailleurs.

    return (
        <div className="post" key={post.postId}>
            <div className="post__head">
                <div className="post__head__infos">
                    <div className="post__head__infos__img">
                        <img className="post__head__infos__img--img" src={!isEmpty(usersData[0]) &&
                            usersData.map((user) => {if (user.userId === post.authorId) return user.imageUrl;}).join('')} alt="Avatar de l'utilisateur"></img>
                    </div>
                    <div className="post__head__infos__name">{!isEmpty(usersData[0]) && usersData.map((user) => {if(user.userId === post.authorId) return user.firstName + ' ' + user.lastName})}</div>
                    <div className="post__head__infos__date">{'Posté le ' + dateParser(parseInt(post.date))}</div>
                </div>
                <div className="post__head__delete">
                    {post.authorId === parseInt(sessionStorage.currentUser) && (
                        <FontAwesomeIcon icon={faTimes} className='fas-times' onClick={ async() => {
                            if (window.confirm("Etes-vous sûr(e) ?\n(Cette action est irréversible)")) {
                                await dispatch(deletePost(post.postId));
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
                    <img className="post__content--img" src=/*" https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Alfa_Romeo_Giulia_Quadrifoglio_Leonberg_2019_IMG_0106.jpg/1280px-Alfa_Romeo_Giulia_Quadrifoglio_Leonberg_2019_IMG_0106.jpg */"https://www.thispersondoesnotexist.com/image" alt=""></img>
                </div>
            )}
            
            <div className="post__stuff">
                <div className="post__stuff__likes">
                    <FontAwesomeIcon icon={faThumbsUp} /> {/* Pour les icones vides c'est "far" au lieu de "fas" */}
                    <p className="post__stuff__numbers">0</p> {/* Comprendre comment fonctionne les relations entre tables pour retrouver le nbre de commentaires */}
                </div>
                <div className="post__stuff__comments">
                    <FontAwesomeIcon icon={faCommentAlt} />
                    <p className="post__stuff__numbers">0</p>
                </div>
            </div>
            <div className="post__comment">
                <input className="post__comment--input" placeholder="Ajoutez un commentaire..."></input>
                <FontAwesomeIcon icon={faPaperPlane} className="post__comment--send"/>
            </div>
            <Comment />
            
        </div>
    )
};

export default Post;