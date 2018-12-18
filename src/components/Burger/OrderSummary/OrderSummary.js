import React, { Fragment, Component } from 'react'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    componentWillUpdate() {
        console.log("[OrderSummart]: componentWillUpdate");
    }

    render() {
        const ingredientsList = Object.keys(this.props.ingredients).map(
            (ingredient, index) => {
                return (
                    <li key={index}>
                        <span style={{ textTransform: 'capitalize' }}>
                            {ingredient}
                        </span>
                        : {this.props.ingredients[ingredient]}
                    </li>
                )
            }
        )

        return (
            <Fragment>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>{ingredientsList}</ul>
                <p>
                    <strong>Total Price: </strong>${this.props.price}
                </p>
                <p>Continue to Checkout?</p>
                <Button type="Danger" clicked={this.props.cancel}>
                    CANCEL
                </Button>
                <Button type="Success" clicked={this.props.continue}>
                    CONTINUE
                </Button>
            </Fragment>
        )
    }
}

export default OrderSummary
