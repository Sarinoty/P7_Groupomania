import React from "react";
import '../../styles/Post.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faThumbsUp, faCommentAlt, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Comment from "./Comment";
import { isEmpty } from "../Utils";
import { useSelector } from "react-redux";

const Post = ({post}) => {
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    return (
        <li className="post" key={post._id}>
            <div className="post__head">
                <div className="post__head__infos">
                    <div className="post__head__infos__img">
                        <img className="post__head__infos__img--img" src={!isEmpty(usersData[0]) &&
                            usersData.map((user) => {if (user.userId === post.authorId) return user.imageUrl;}).join('')} alt="Avatar de l'utilisateur"></img>
                    </div>
                    <div className="post__head__infos__name">Yohann Brionne</div>
                    <div className="post__head__infos__date">Posté le 27/01/1981</div>
                </div>
                <div className="post__head__delete">
                    <FontAwesomeIcon icon={faTimes} className='fas-times' />
                </div>
            </div>
            <div className="post__text">Ceci est un post de test !</div>
            <div className="post__content">
                <img className="post__content--img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Alfa_Romeo_Giulia_Quadrifoglio_Leonberg_2019_IMG_0106.jpg/1280px-Alfa_Romeo_Giulia_Quadrifoglio_Leonberg_2019_IMG_0106.jpg" alt=""></img>
            </div>
            <div className="post__stuff">
                <div className="post__stuff__likes">
                    <FontAwesomeIcon icon={faThumbsUp} /> {/* Pour les icones vides c'est "far" au lieu de "fas" */}
                    <p className="post__stuff__numbers">0</p>
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
            <Comment />
        </li>
    )
};

export default Post;