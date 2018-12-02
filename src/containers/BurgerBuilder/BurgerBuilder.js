import React, { Component, Fragment } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

export default class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 1
        },
    }

    addIngredientHandler = (ingredient) => {
        let newIngredients = {
            ...this.state.ingredients
        }

        newIngredients[ingredient] = newIngredients[ingredient] + 1;
        
        this.setState({
            ingredients: newIngredients
        })
    }

    removeIngredientHandler = (ingredient) => {
        let newIngredients = {
            ...this.state.ingredients
        }

        if(newIngredients[ingredient] > 0) {
            newIngredients[ingredient] = newIngredients[ingredient] - 1;
        }
        
        this.setState({
            ingredients: newIngredients
        })
    }
    

    render() {
        return (
            <Fragment>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                        add={this.addIngredientHandler} 
                        remove={this.removeIngredientHandler}
                        ingredients={this.state.ingredients}>
                    Build Controls
                </BuildControls>
            </Fragment>
        )
    }
}
