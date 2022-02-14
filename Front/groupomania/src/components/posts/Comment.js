import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Comment = () => {
    return (
        <div className="comment__container">
            <div className="divider"></div>
            <div className="comment__head">
                <div className="comment__head__identity">
                    <img src="./imgs/user.png" alt="avatar" className="comment__head__avatar"></img>
                    <div className="comment__head__name">Le nom du type</div>
                </div>
                <FontAwesomeIcon icon={faTimes} className='fas-times' />
            </div>
            <div className="comment__body">Test</div>
            <div className="comment__foot">Il y a 2 minutes</div>
        </div>
    )
};

export default Comment;