import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux';

class Checkout extends Component {
    // state = { 
    //     ingredients: {},
    //     totalPrice: undefined
    // }

    // componentDidMount() {
    //     this.setState({
    //         // ingredients: this.props.location.state.ingredients,
    //         // price: this.props.location.state.price
    //     })
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={() => <ContactData price={this.props.price} />} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        price: state.price
    }
}

export default connect(mapStateToProps)(withRouter(Checkout));