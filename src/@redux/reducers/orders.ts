import { ACTIONS, TYPES, INITIALSTATE} from '@redux/types/orders';

const initialState: INITIALSTATE = {
    orders: null,
    errors: {},
};

export const orders = (state = initialState, action: ACTIONS) => {
    const {type, payload} = action;

    switch(type){
        case TYPES.ORDERS_FIND:
            return{
                ...state,
                orders: payload
            };
        case TYPES.ORDERS_CREATE:
            return{
                ...state,
                orders: state.orders ? [payload, ...state.orders] : [payload]
            };
        case TYPES.ORDERS_UPDATE:
            return{
                ...state,
                orders: state.orders ? state.orders.map(el => el._id === payload._id ? payload: el) : [payload]
            };
        case TYPES.ORDERS_REMOVE:
            return{
                ...state,
                orders: state.orders ? state.orders.filter(el => payload !== el._id) : []
            };
        case TYPES.ORDERS_ERRORS:
            return{
                ...state,
                errors: payload
            };
        default: 
            return state;
    }
}

export default orders;