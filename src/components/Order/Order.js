import React from 'react'
import classes from './Order.module.css'

const Order = (props) => {

    const ingredients = Object.keys(props.ingredients).map((ingredient) => {
        return (
            <span 
                key={ingredient}
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px' 
                    }}>
                {ingredient} ({props.ingredients[ingredient]})</span>
        )
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: </p>
            {ingredients}
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
}

export default Order
