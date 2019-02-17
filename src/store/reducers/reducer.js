import actions from '../actions/actionTypes'
import { updateObject } from '../utils'

const MIN_PRICE = 4

const initialState = {
    ingredients: null,
    price: MIN_PRICE,
}

const reducer = (state = initialState, action) => {
    let newState = {}
    
    switch (action.type) {
        case actions.UPDATE_INGREDIENTS:
            return updateObject(state, {ingredients: action.ingredients})

        case actions.UPDATE_PRICE:
            return updateObject(state, {price: action.price})
    
        default:
            newState = {...state}
            break;
    }

    return newState
}

export default reducer;