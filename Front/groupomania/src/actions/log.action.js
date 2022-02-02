
//import { store } from '../index';
export const ZINDEX = 'ZINDEX';


export const zIndex = () => {
    return {type: ZINDEX, payload: {zindex: 0}};
}
// L'action renvoie un objet