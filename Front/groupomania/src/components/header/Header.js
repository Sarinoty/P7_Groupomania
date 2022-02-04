import React from 'react';
import '../../styles/Header.scss';
import { faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
    return (
        <div className="header">
            <img src='./imgs/icon-left-font2.png' alt='Logo de la société Groupomania' className='logoHeader__img'/>
            <nav>
                <a href='/profile'>
                    <FontAwesomeIcon icon={faUser} className='fas fas--user'/>
                </a>
                <div className='space'></div>
                <FontAwesomeIcon icon={faSignOutAlt} className='fas fas--exit'/>
            </nav>
        </div>
    );
};

export default Header;