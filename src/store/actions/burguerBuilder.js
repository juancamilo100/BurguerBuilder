import actions from './actionTypes'
import axios from '../../axios-orders'

export const updateIngredients = (ingredients) => {
    return {
        type: actions.UPDATE_INGREDIENTS, 
        ingredients,
    }
}

export const updatePrice = (price) => {
    return {
        type: actions.UPDATE_PRICE, 
        price
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actions.FETCH_INGREDIENTS_FAILED, 
    }
}

export const fetchIngredients = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('https://burger-builder-353c4.firebaseio.com/ingredients.json')
            dispatch(updateIngredients(res.data));
        } catch (error) {
            dispatch(fetchIngredientsFailed());
        }
    }
}