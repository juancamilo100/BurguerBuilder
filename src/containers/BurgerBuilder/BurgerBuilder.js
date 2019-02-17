import React, { Component, Fragment } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import classes from './BurgerBuilder.module.css'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import actions from '../../store/actions';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3,
}

const MIN_PRICE = 4

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://burger-builder-353c4.firebaseio.com/ingredients.json')
            .then(response => {
                this.props.updateIngredients(response.data);
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
            ...this.props.ingredients,
        }

        newIngredients[ingredient] = newIngredients[ingredient] + 1
        let newPrice = this.getPrice(newIngredients)

        this.props.updateIngredients(newIngredients);
        this.props.updatePrice(newPrice.toFixed(2));
    }

    removeIngredientHandler = ingredient => {
        let newIngredients = {
            ...this.props.ingredients,
        }

        if (newIngredients[ingredient] <= 0) {
            return
        }

        newIngredients[ingredient] = newIngredients[ingredient] - 1
        let newPrice = this.getPrice(newIngredients)

        this.props.updateIngredients(newIngredients);
        this.props.updatePrice(newPrice.toFixed(2));
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
        this.props.history.push('/checkout');
    }

    render() {
        let disabledInfo = {
            ...this.props.ingredients,
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        const spinner = <Spinner />
        let orderSummary = null;        
        let burger = this.state.error ? null : spinner;

        if (this.props.ingredients) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.props.ingredients} />
                        <h2 className={classes.Price}>
                            Price: ${this.props.price}
                        </h2>
                    <BuildControls
                        add={this.addIngredientHandler}
                        remove={this.removeIngredientHandler}
                        ingredients={this.props.ingredients}
                        disabled={disabledInfo}
                        purchasable={this.getPurchaseState(this.props.ingredients)}
                        ordered={() => this.changePurchasingState(true)}
                    >
                        Build Controls
                    </BuildControls>
                </Fragment>
            )

            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ingredients}
                    price={this.props.price}
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

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        price: state.price 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateIngredients: (ingredients) => dispatch({type: actions.UPDATE_INGREDIENTS, ingredients}),
        updatePrice: (price) => dispatch({type: actions.UPDATE_PRICE, price})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(BurgerBuilder, axios)));