import React, { Component, Fragment } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import classes from './BurgerBuilder.module.css'

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3,
}

const MIN_PRICE = 4

export default class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: MIN_PRICE,
        purchasable: false,
        purchasing: false,
    }

    getPurchaseState(ingredients) {
        const sum = Object.values(ingredients).reduce((sum, el) => {
            return sum + el
        }, 0)

        return sum
    }

    addIngredientHandler = ingredient => {
        let newIngredients = {
            ...this.state.ingredients,
        }

        newIngredients[ingredient] = newIngredients[ingredient] + 1
        let newPrice = this.getPrice(newIngredients)
        let purchasable = this.getPurchaseState(newIngredients)

        this.setState({
            ingredients: newIngredients,
            totalPrice: newPrice.toFixed(2),
            purchasable: purchasable,
        })
    }

    removeIngredientHandler = ingredient => {
        let newIngredients = {
            ...this.state.ingredients,
        }

        if (newIngredients[ingredient] <= 0) {
            return
        }

        newIngredients[ingredient] = newIngredients[ingredient] - 1
        let newPrice = this.getPrice(newIngredients)
        let purchasable = this.getPurchaseState(newIngredients)

        this.setState({
            ingredients: newIngredients,
            totalPrice: newPrice.toFixed(2),
            purchasable: purchasable,
        })
    }

    getPrice(ingredients) {
        let price = 4.0

        for (let key in ingredients) {
            price = price + INGREDIENT_PRICES[key] * ingredients[key]
        }

        return price < MIN_PRICE ? MIN_PRICE : price
    }

    changePurchasingState = isPurchasing => {
        console.log('Changing state')

        this.setState({
            purchasing: isPurchasing,
        })  
    }

    purchaseContinue() {
        alert("Purchase Continued!");
    }

    render() {
        let disabledInfo = {
            ...this.state.ingredients,
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return (
            <Fragment>
                <Modal
                    show={this.state.purchasing}
                    hide={() => this.changePurchasingState(false)}
                >
                    <OrderSummary 
                        ingredients={this.state.ingredients} 
                        price={this.state.totalPrice}
                        cancel={() => this.changePurchasingState(false)}
                        continue={this.purchaseContinue} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <h2 className={classes.Price}>
                    Price: ${this.state.totalPrice}
                </h2>
                <BuildControls
                    add={this.addIngredientHandler}
                    remove={this.removeIngredientHandler}
                    ingredients={this.state.ingredients}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={() => this.changePurchasingState(true)}
                >
                    Build Controls
                </BuildControls>
            </Fragment>
        )
    }
}
