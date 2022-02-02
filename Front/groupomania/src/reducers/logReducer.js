//import { ZINDEX } from '../actions/log.action';
//import { SIGNIN } from '../actions/log.action';

const initialState = {zindex: '0'};

export default function logReducer(state = initialState, action) {
    switch (action.type) {
        case 'ZINDEX':
            return state.zindex = '2';
        /* case SIGNIN:
            return action.payload; */
        default:
            return state; // A modifier
    }
}