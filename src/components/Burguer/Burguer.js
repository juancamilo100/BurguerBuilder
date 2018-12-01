import React from 'react'
import PropTypes from 'prop-types'
import classes from './Burguer.module.css'
import BurguerIngredient from './BurguerIngredient/BurguerIngredient'

const Burguer = props => {
    const transformedIngredients = Object.keys(props.ingredients)
        .map((ingredientKey) => {
            return [...Array(props.ingredients[ingredientKey])].map((_, index) => {
                return <BurguerIngredient key={ingredientKey + index} type={ingredientKey} />;
            });
        });

    return (
        <div className={classes.Burguer}>
            <BurguerIngredient type="bread-top" />
            <BurguerIngredient type="cheese" />
            <BurguerIngredient type="meat" />
            <BurguerIngredient type="bread-bottom" />
        </div>
    )
}

Burguer.propTypes = {}

export default Burguer
