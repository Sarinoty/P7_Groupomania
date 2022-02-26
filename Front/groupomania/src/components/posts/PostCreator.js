import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { addPost, getPosts } from '../../actions/post.action';
//import {dateParser } from '../../utils/Date';
import '../../styles/Post.scss';
import { isEmpty } from "../Utils";
//import { GET } from "../../utils/axios";
//import endpoints from "../../utils/endpoints";
//import { $CombinedState } from "redux";

const PostCreator = () => {
    const [message, setMessage] = useState('');
    //const [postPicture, setPostPicture] = useState(null);
    const [file, setFile] = useState();
    //const userData = useSelector((state) => state.logReducer);
    const dispatch = useDispatch();

    const userData = useSelector((state) => state.userReducer);
    //const postsData = useSelector((state) => state.postReducer);

    const handlePost = async () => {
        if (message || file) {
            const date = Date.now().toString();
            const data = new FormData();
            data.append('authorId', parseInt(sessionStorage.currentUser));
            data.append('textContent', message);
            if (file) data.append('imgContent', file);
            data.append('date', date);
            await dispatch(addPost(data));
            /* let fileName = null;
            GET(`${endpoints.GET_POST}${sessionStorage.currentUser}/${date}`)
                .then((res) => fileName = res.imgContent)
                .catch(() => console.log('Echec de la récupération du fileName'))
            console.log('Message de PostCreater')
            console.log(fileName) */
            dispatch(getPosts())
            setMessage('');
            setFile('');
            /* let i = 0;
            while (i === 0) {
                postsData.map((post) => {
                    if (post.authorId === parseInt(sessionStorage.currentUser) && post.date === date) {
                        i++;
                        console.log('On ne tourne plus');
                        dispatch(getPosts());
                    }
                    else {
                        console.log('Ensore un tour');
                        
                    }})
            } */
        }
        else alert('Veuillez écrire un message');
    }

    const handlePicture = (e) => {
        setFile(e.target.files[0]);
    }
    return (
        <div className="post">
            <div className="post__creator__rowOne">
                <div className="post__creator__rowOne__pic">
                    <img className="post__creator__rowOne__pic--img" src={userData.imageUrl} alt=""></img>
                </div>
                <textarea className="post__creator__rowOne__input"
                    placeholder="Exprimez-vous !"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}></textarea>
                <div className="post__creator__rowOne__send">
                    <FontAwesomeIcon icon={faPaperPlane} className="comAndLike" onClick={handlePost}/>
                </div>
            </div>
            <div className="post__creator__rowTwo">
                <div className="post__creator__rowTwo__file">
                    <FontAwesomeIcon icon={faImage} className="post__creator__rowTwo__file--icon" />
                    <input className="post__creator__rowTwo__file--input"
                        type='file'
                        accept='.jpg, .jpeg, .png, .webp'
                        onChange={(e) => handlePicture(e)}>
                    </input>
                </div>
                <div className="post__creator__rowTwo__emptyDiv"></div>
            </div>
        </div>
    )
};

export default PostCreator;