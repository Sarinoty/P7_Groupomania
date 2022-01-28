
import { store } from '../index';
export const ZINDEX = 'ZINDEX';


export const zIndex = (i) => {
    return () => {
        store.dispatch({type: ZINDEX, payload: {zindex: i}});
    }
};