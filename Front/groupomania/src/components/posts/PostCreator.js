import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { addPost, getPosts } from '../../actions/post.action';
import '../../styles/Post.scss';

const PostCreator = () => {
    const [message, setMessage] = useState('');
    const [file, setFile] = useState('');
    const [video, setVideo] = useState('');
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer);
    const iVideo = document.getElementById('infoVideo');

    useEffect(() => {
        handleVideo();
    }, [message]);

    const handlePost = async () => {
        if (message || file || video) {
            const date = Date.now().toString();
            const data = new FormData();
            data.append('authorId', parseInt(sessionStorage.currentUser));
            data.append('textContent', message);
            if (video) data.append('imgContent', video);
            else if (file) data.append('imgContent', file);
            else data.append('imgContent', 'noPic');
            data.append('date', date);
            await dispatch(addPost(data));
            dispatch(getPosts())
            setMessage('');
            setFile('');
            setVideo('');
            iVideo.innerText = '';
        }
        else alert('Veuillez écrire un message');
    }

    const handleVideo = () => {
        let linkToFind = message.split(' ');
        for (let i = 0; i < linkToFind.length; i++) {
            if (linkToFind[i].includes('https://www.youtu') || linkToFind[i].includes('https://youtu')) {
                let embeded = linkToFind[i].replace('watch?v=', 'embed/');
                setVideo(embeded.split('&')[0]);
                linkToFind.splice(i, 1);
                setMessage(linkToFind.join(' '));
                iVideo.innerText = 'Vidéo Youtube chargée. Pour annuler rafraîchissez la page.';
                setFile('');
            }
        }
    }

    const handlePicture = (e) => {
        setFile(e.target.files[0]);
        setVideo('');
        iVideo.innerText = '';
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
            </div>

            <div className="post__creator__rowTwo">
                <p id="infoVideo" className="post__creator__rowTwo__info"></p>
                <div className="post__creator__rowTwo__icons">
                    <div className="post__creator__rowTwo__icons__file">
                        <FontAwesomeIcon icon={faImage} className={file ? "post__creator__rowTwo__icons__file--icon post__creator__rowTwo__icons__file--icon--red" : "post__creator__rowTwo__icons__file--icon"} />
                        <input className="post__creator__rowTwo__icons__file--input"
                            type='file'
                            accept='.jpg, .jpeg, .png, .webp'
                            onChange={(e) => handlePicture(e)}>
                        </input>
                    </div>
                    <div className="post__creator__rowTwo__icons__send">
                        <FontAwesomeIcon icon={faPaperPlane} className="comAndLike" onClick={handlePost}/>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PostCreator;