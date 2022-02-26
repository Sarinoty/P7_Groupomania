import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../../styles/ProfileCard.scss';
import { GET } from "../../utils/axios";
import endpoints from "../../utils/endpoints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { updateUser } from "../../actions/user.action";
import { getUser } from "../../actions/user.action";

const ProfileCard = () => {
    const userData = useSelector((state) => state.userReducer);
    const postsData = useSelector((state) => state.postReducer);
    const userToSeeId = window.location.toString().split('profile')[1];
    const [infos, setInfos] = useState({});
    const [locked, setLocked] = useState(true);
    const [mail, setMail] = useState(userData.email);
    const [bio, setBio] = useState('');
    const [file, setFile] = useState();
    const [privateMail, setPrivateMail] = useState(false);
    const [picture, setPicture] = useState();
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const dispatch = useDispatch();
    
    useEffect(() => {
        setPrivateMail(userData.privateMail);
        if (userToSeeId !== sessionStorage.currentUser) {
            GET(`${endpoints.GET_USER}${userToSeeId}`)
                .then((res) => {
                    setInfos(res.data);
                })
                .catch(e => console.log(e))
        }
    }, [userToSeeId, userData.privateMail], [])

    const handlePicture = (e) => {
        setPicture(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }

/*     const handleMail = (e) => {
        const errorMail = document.getElementById('errorMail');
        console.log(e)
        setMail(e)
        if (verifMail(mail)) errorMail.innerText = '';
        else errorMail.innerText = 'Entrez une adresse valide !';
    }

    const handlePass1 = (/* e) => {
        //setPassword1(e);
        const errorPass1 = document.getElementById('errorPass1');
        console.log(password1)
        console.log(password2)
        if (verifPass(password1) || (!password1 && !password2)) errorPass1.innerText = '';
        else errorPass1.innerText = 'Le mot de passe avoir au moins\n- une majuscule\n- une minuscule\n- un chiffre\n- entre 7 et 20 caractères\n- aucun espace';
    }

    const handlePass2 = (e) => {
        const errorPass2 = document.getElementById('errorPass2');
        setPassword2(e);
        if (password1 === password2) errorPass2.innerText('');
        else errorPass2.innerText = "Vous n'avez pas saisi 2 fois le même mot de passe";
    } */

    // Echec pour mettre à jour le profil. On dirait qu'aucune info n'arrive.
    // Au chargement l'e-mail n'est pas celui du state, il est vide.

    const handleProfile = async () => {
        if (file || mail !== userData.email || bio || (password1 && password2) || (privateMail !== userData.emailPrivate)) {
            const errorMail = document.getElementById('errorMail');
            const errorPass1 = document.getElementById('errorPass1');
            const errorPass2 = document.getElementById('errorPass2');
            const data = new FormData();
            // On refait les vérifications car avec le onInput on peut ne pas saisir le changement avant que l'utilisateur clique sur valider
            if (file) data.append('imageUrl', file);
            if (mail) {
                if (verifMail(mail)) data.append('email', mail);
                else {
                    errorMail.innerText = 'Entrez une adresse valide !';
                    return false;
                }
            }
            else data.append('email', userData.email);
            data.append('emailPrivate', privateMail);
            if (password1) {
                if (verifPass(password1)) {
                    if (password1 === password2) {
                        data.append('password', password1);

                    }
                    else {
                        errorPass2.innerText = "Vous n'avez pas saisi 2 fois le même mot de passe";
                        return false;
                    }
                }
                else {
                    errorPass1.innerText = "Le mot de passe avoir au moins\n- une majuscule\n- une minuscule\n- un chiffre\n- entre 7 et 20 caractères\n- aucun espace"
                    return false;
                }
            }
            
            if (bio) data.append('bio', bio);
            else data.append(userData.bio);
            await dispatch(updateUser(userData.userId, data));
            setMail('');
            setPassword1('');
            setPassword2('');
            setBio('');
            dispatch(getUser(parseInt(sessionStorage.currentUser)));
            setLocked(true);
        }
    }

    const nbPosts = (id) => {
        let nb = 0;
        //postsData.forEach(post => { // Les forEach font planter...
        Array.prototype.forEach.call(postsData, post => {
            if(post.authorId === id) nb++;
        })
        if (nb <= 1) return nb + ' post';
        else return nb + ' posts';
    }

    /**
     * Vérifie que l'adresse e-mail saisie correspond bien au format xxx@xxx.xxx
     * @param { String } adresse 
     * @returns booléen
     */
     function verifMail(adresse) {
        return /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(adresse);
    }
    /**
     * Vérifie que le mot de passe saisi correspond bien au format model (Back/Models/password)
     * @param { String } adresse 
     * @returns booléen
     */
     function verifPass(mdp) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d[\]{};:=<>_+^#$@!%*?&]{7,20}$/.test(mdp);
    }


    

    if (!locked) {
        return (
            <div className="profileCard">
                <div className="profileCard__img">
                    <img className="profileCard__img--img" src={picture ? picture : userData.imageUrl} alt='Avatar' />
                    
                </div>
                <input
                    className="profileCard__inputs__avatar"
                    type='file'
                    accept='.jpg, .jpeg, .png, .webp'
                    onChange={(e) => {handlePicture(e)}}> 
                </input>
                <h1 className="profileCard__name">{userData.firstName + ' ' + userData.lastName}</h1>
                <div className="profileCard__inputs__blockMail">
                    <input
                        className="profileCard__inputs__blockMail__email"
                        type="email"
                        placeholder={userData.email}
                        onChange={(e) => setMail(e.target.value)}
                        value={mail}>
                    </input>
                    <div className="profileCard__inputs__blockMail--eyes">
                        {privateMail
                            ? <FontAwesomeIcon
                            icon={faEyeSlash}
                            className="profileCard__inputs__blockMail__eyes"
                            title="Rendre votre adresse e-mail VISIBLE par les autres utilisateurs"
                            onClick={() => setPrivateMail(false)}/>
                            : <FontAwesomeIcon
                            icon={faEye}
                            className="profileCard__inputs__blockMail__eyes"
                            title="Rendre votre adresse e-mail INVISIBLE par les autres utilisateurs"
                            onClick={() => setPrivateMail(true)}/>}
                    </div>
                </div>
                <p className="profileCard__inputs__error" id="errorMail"></p>
                <input
                    className="profileCard__inputs__passwords profileCard__inputs__passwords__password1"
                    type="password"
                    placeholder="Nouveau mot de passe"
                    onInput={(e) => setPassword1(e.target.value)}
                    value={password1}>
                </input>
                <p className="profileCard__inputs__error" id="errorPass1"></p>
                <input
                    className="profileCard__inputs__passwords profileCard__inputs__passwords__password2"
                    type="password"
                    placeholder="Répétez le mot de passe"
                    onInput={(e) => setPassword2(e.target.value)}
                    value={password2}>
                </input>
                <p className="profileCard__inputs__error" id="errorPass2"></p>
                <textarea
                    className="profileCard__inputs__bio"
                    placeholder={userData.bio === '' ? 'Ecrivez quelques mots pour vous présenter !' : userData.bio}
                    onInput={(e) => setBio(e.target.value)}
                    value={bio}> 
                </textarea>
                <div>    
                    <div className='profileCard__butt' onClick={handleProfile}>Valider</div>
                </div> 
            </div>
        )
    }
    else if (userToSeeId !== sessionStorage.currentUser) {
        return (
            <div className="profileCard">
                <div className="profileCard__img">
                    <img className="profileCard__img--img" src={infos.imageUrl} alt='Avatar' />
                </div>
                <h1 className="profileCard__name">{infos.firstName + ' ' + infos.lastName}</h1>
                {!infos.emailPrivate && <p className="profileCard__email">{infos.email}</p>}
                <p className="profileCard__bio">{infos.bio ? '"' + infos.bio + '"' : 'Vous n\'avez pas renseigné votre biographie. Pourtant quelques mots seraient du plus bel effet ici...'}</p>
                <p className="profileCard__posts">{'Auteur de ' + nbPosts(infos.userId)}</p> 
            </div>
        )
    }
    else {
        return (
            <div className="profileCard">
                <div className="profileCard__img">
                    <img className="profileCard__img--img" src={userData.imageUrl} alt='Avatar' />
                </div>
                <h1 className="profileCard__name">{userData.firstName + ' ' + userData.lastName}</h1>
                <p className="profileCard__email">{userData.email}</p>
                <p className="profileCard__bio">{userData.bio ? '"' + userData.bio + '"' : 'Vous n\'avez pas renseigné votre biographie. Pourtant quelques mots seraient du plus bel effet ici...'}</p>
                <p className="profileCard__posts">{'Auteur de ' + nbPosts(userData.userId)}</p>
                <div>    
                    <div className='profileCard__butt' onClick={() => setLocked(false)}>Modifier le profil</div>
                    <div className='profileCard__butt'>Supprimer le compte</div>
                </div> 
            </div>
        )
    }
};

export default ProfileCard;