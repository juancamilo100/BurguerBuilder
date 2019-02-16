import actions from './actions'

const MIN_PRICE = 4

const initialState = {
    ingredients: null,
    price: MIN_PRICE,
}

const reducer = (state = initialState, action) => {
    let newState = {}
    debugger;
    switch (action.type) {
        case actions.UPDATE_INGREDIENTS:
            newState = {
                ...state,
                ingredients: action.ingredients
            }
            break;

        case actions.UPDATE_PRICE:
            newState = {
                ...state,
                price: action.price
            }
            break;
    
        default:
            newState = {...state}
            break;
    }

    return newState
}

export default reducer;