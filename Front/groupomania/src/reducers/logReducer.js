export default function logReducer(state = 0, action) {
    switch (action.type) {
        case 'ZINDEX':
            return state = 2; // En mettant "+2" on peut avoir un state à +4, +6, etc... ce qui ne convient pas puisqu'on veut un state à 0 ou 2.
        case 'DECREMENT':
            return state = 0;
        default:
            return state;
    }
}