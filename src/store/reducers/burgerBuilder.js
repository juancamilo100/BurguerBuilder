import actions from '../actions/actionTypes'
import { updateObject } from '../utils'

const MIN_PRICE = 4

const initialState = {
    ingredients: null,
    price: MIN_PRICE,
    error: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.UPDATE_INGREDIENTS:
            return updateObject(state, {ingredients: action.ingredients, error:false})

        case actions.UPDATE_PRICE:
            return updateObject(state, {price: action.price})
            
        case actions.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {error: true})
    
        default:
            return {...state}
    }
}

export default reducer;