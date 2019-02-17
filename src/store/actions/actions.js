import actions from './actionTypes'

export const updateIngredients = (ingredients) => {
    return {
        type: actions.UPDATE_INGREDIENTS, 
        ingredients
    }
}

export const updatePrice = (price) => {
    return {
        type: actions.UPDATE_PRICE, 
        price
    }
}