import { DELETE, GET, POST } from "../utils/axios";
import ENDPOINTS from '../utils/endpoints';

export const GET_LIKES = "GET_LIKES";
export const DELETE_LIKE = "DELETE_LIKE";

export const getLikes = () => {
    return (dispatch) => {
        return GET(ENDPOINTS.GET_LIKES)
            .then((res) => {
                dispatch({type: GET_LIKES, payload: res.data})
            })
            .catch (e => console.log ('Erreur : ' + e))
    }
}

export const deleteLike = (data) => {
    return () => {
        // En passant 2 paramètres dans l'url on n'envoie pas de data avec la requête.
        // Si on veut ajouter des datas à la reqête il faudra aussi le spécifier dans axios.
        return DELETE(`${ENDPOINTS.DELETE_LIKE}${data.postId}/${data.userId}`)
            .catch(e => console.log('Erreur : ' + e))
    }
}

export const deleteLikeByPostId = (id) => {
    return () => {
        return DELETE(`${ENDPOINTS.DELETE_LIKE_BYPOSTID}${id}`)
            .catch(e => console.log('Erreur : ' + e))
    }
}

export const addLike = (data) => {
    return () => {
        return POST(`${ENDPOINTS.ADD_LIKE}${data.postId}/${data.userId}`)
            .catch(e => console.log('Erreur : ' + e))
    }
}