import * as actions from '../actions/actionTypes'
import { updateObject } from '../utils';

const initialState = {
    orders: [],
    loading: false,
    error: false,
    purchased: false
}

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder),
            };

        case actions.PURCHASE_BURGER_FAILED:
            return {
                ...state,
                loading: false,
            };

        case actions.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }

        case actions.UPDATE_ORDERS:
            return updateObject(state, { orders: action.orders });            

        case actions.START_LOADING:
            return updateObject(state, {loading: true, error: false});              

        case actions.FINISHED_LOADING:
            return updateObject(state, {loading: false});              

        case actions.FETCH_ORDERS_FAILED:
            return updateObject(state, {error: true}); 
            
        default:
            return state;
    }
}

export { ordersReducer as orders }