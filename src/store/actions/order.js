import * as actions from './actionTypes'
import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actions.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData
    }
}

export const purchaseBurgerFailed = (error) => {
    return {
        type: actions.PURCHASE_BURGER_FAILED,
        error
    }
}

export const purchaseBurgerStart = (orderData) => {
    return async (dispatch, getState) => {
        dispatch(startLoading())
        try {
            const response = await axios.post('/orders.json?auth=' + getState().auth.token, orderData)
            dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        } catch (error) {
            dispatch(purchaseBurgerFailed(error));
        }
    }
}

export const startLoading = () => {
    return {
        type: actions.START_LOADING
    }
}

export const finishedLoading = () => {
    return {
        type: actions.FINISHED_LOADING
    }
}

export const purchaseInit = () => {
    return {
        type: actions.PURCHASE_INIT
    }
}

export const updateOrders = (orders) => {
    return {
        type: actions.UPDATE_ORDERS,
        orders
    }
}

export const fetchOrdersFailed = (error) => {
    return {
        type: actions.FETCH_ORDERS_FAILED,
        error
    }
}

export const fetchOrders = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(startLoading())
            const response = await axios.get('/orders.json?auth=' + getState().auth.token)
            const fetchedOrders = [];

            for (const key in response.data) {
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                })
            }

            dispatch(updateOrders(fetchedOrders));
        } catch (error) {
            dispatch(fetchOrdersFailed(error));
        }
        dispatch(finishedLoading())
    }
}