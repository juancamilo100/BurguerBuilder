import React, { Component, Fragment } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import classes from './BurgerBuilder.module.css'
import logo from '../../components/Logo/Logo'

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3,
}

const MIN_PRICE = 4

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: MIN_PRICE,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://burger-builder-353c4.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({
                    ingredients: response.data
                })
            })
            .catch(error => {
                this.setState({
                    error: true
                })            
            });
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
        this.setState({
            purchasing: isPurchasing,
        })
    }

    purchaseContinue = () => {
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Juan',
                address: {
                    street: 'SomeStreet',
                    zipCode: '345446',
                    country: 'USA',
                },
                email: 'someemail@someserver.com',
            },
            deliveryMethod: 'fastest',
        }

        this.setState({
            loading: true,
        })

        axios
            .post('/orders.json', order)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                this.setState({
                    loading: false,
                    purchasing: false
                })
            })
    }

    render() {
        let disabledInfo = {
            ...this.state.ingredients,
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        const spinner = <Spinner />
        let orderSummary = null;        
        let burger = this.state.error ? null : spinner;

        if (this.state.ingredients) {
            burger = (
                <Fragment>
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

            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    cancel={() => this.changePurchasingState(false)}
                    continue={this.purchaseContinue}
                />
            )
        }
                
        const modalContent = this.state.loading ? spinner : orderSummary;

        return (
            <Fragment>
                <Modal
                    show={this.state.purchasing}
                    hide={() => this.changePurchasingState(false)}>
                        {modalContent}
                </Modal>
                {burger}
            </Fragment>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);