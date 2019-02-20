import actions from '../actions/actionTypes'
import { updateObject } from '../utils'

const MIN_PRICE = 4

const initialState = {
    ingredients: null,
    price: MIN_PRICE,
    error: false
}

const burgerBuilderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.UPDATE_INGREDIENTS:
            return updateObject(state, {
                ingredients: action.ingredients, 
                price: 4,
                error:false
            });

        case actions.UPDATE_PRICE:
            return updateObject(state, {price: action.price, error:false})
            
        case actions.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {error: true})
    
        default:
            return {...state}
    }
}

export { burgerBuilderReducer };