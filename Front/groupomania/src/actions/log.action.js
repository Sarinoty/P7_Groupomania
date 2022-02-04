
/* //import { store } from '../index';
export const ZINDEX = 'ZINDEX';


export const zIndex = () => {
    return {type: ZINDEX, payload: {zindex: 0}};
}
// L'action renvoie un objet */

/**
 * 
 * export const increment = () => {
    return {
        type: 'INCREMENT'
     }
};
 */

export function changeIndex() {
    return {
       type: 'ZINDEX'
    }
 }

 export function decrement() {
   return {
      type: 'DECREMENT'
   }
}