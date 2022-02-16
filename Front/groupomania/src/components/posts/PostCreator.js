import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { addPost, getPosts } from '../../actions/post.action';
import {dateParser } from '../../utils/Date';
import '../../styles/Post.scss';
import { isEmpty } from "../Utils";

const PostCreator = () => {
    const [message, setMessage] = useState('');
    //const [postPicture, setPostPicture] = useState(null);
    const [file, setFile] = useState();
    //const userData = useSelector((state) => state.logReducer);
    const dispatch = useDispatch();

    const userData = useSelector((state) => state.userReducer);

    const handlePost = async () => {
        if (message || file) {
            const date = Date.now().toString();
            let data = {};
            if (file) {
                data = {
                    'userId': parseInt(sessionStorage.currentUser), // ça c'est pour checker l'userId dans le middleware authorize
                    'authorId': parseInt(sessionStorage.currentUser),
                    'textContent': message,
                    'imgContent': file,
                    'date': date
                }
                console.log(typeof(file));
                console.log(file);
            }
            else {
                data = {
                    'userId': parseInt(sessionStorage.currentUser), // ça c'est pour checker l'userId dans le middleware authorize
                    'authorId': parseInt(sessionStorage.currentUser),
                    'textContent': message,
                    'date': date
                }
            }

            await dispatch(addPost(data));
            dispatch(getPosts());
            
            /* const data = new FormData();
            data.append('authorId', parseInt(sessionStorage.currentUser));
            data.append('textContent', message);
            if (file) data.append('imgContent', file);
            data.append('date', date);
            await dispatch(addPost(data)); */
            //dispatch(getPosts()) */
        }
        else alert('Veuillez écrire un message');
    }

    const handlePicture = (e) => {
        //setPostPicture(URL.createObjectURL(e.target.files[0])); // Permet d'afficher l'image dans le post
        setFile(e.target.files[0]);
    }
console.log(!isEmpty(userData.imageUrl));
    return (
        <div className="post">
            <div className="post__creator__rowOne">
                <div className="post__creator__rowOne__pic">
                    <img className="post__creator__rowOne__pic--img" src={isEmpty(userData.imageUrl) ? "./imgs/user.png" : userData.imageUrl} alt=""></img>
                </div>
                <textarea className="post__creator__rowOne__input"
                    placeholder="Exprimez-vous !"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}></textarea>
                <div className="post__creator__rowOne__send">
                    <FontAwesomeIcon icon={faPaperPlane} onClick={handlePost}/>
                </div>
            </div>
            <div className="post__creator__rowTwo">
                <div className="post__creator__rowTwo__file">
                    <FontAwesomeIcon icon={faImage} className="post__creator__rowTwo__file--icon" />
                    <input className="post__creator__rowTwo__file--input"
                        type='file'
                        accept='.jpg, .jpeg, .png, .webp'
                        onChange={(e) => handlePicture(e)}></input>
                </div>
                <div className="post__creator__rowTwo__emptyDiv"></div>
            </div>
        </div>
    )
};

export default PostCreator;