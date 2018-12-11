import React, { Fragment } from 'react'
import Button from '../../UI/Button/Button'

const orderSummary = props => {
    const ingredientsList = Object.keys(props.ingredients).map((ingredient, index) => {
        return (
            <li key={index}>
                <span style={{textTransform: 'capitalize'}}>{ingredient}</span>: {props.ingredients[ingredient]}
            </li>
        )
    })
    
    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsList}
            </ul>
            <p><strong>Total Price: </strong>${props.price}</p>
            <p>Continue to Checkout?</p>
            <Button type='Danger' clicked={props.cancel}>CANCEL</Button>
            <Button type='Success' clicked={props.continue}>CONTINUE</Button>
        </Fragment>
    )
}

export default orderSummary
