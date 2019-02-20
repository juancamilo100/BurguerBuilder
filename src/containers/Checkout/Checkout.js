import React, { Component } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux';

class Checkout extends Component {
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to='/' />;
        if(this.props.ingredients && !this.props.purchased) {
            summary = (
                <div>
                    <CheckoutSummary 
                        ingredients={this.props.ingredients}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        component={ContactData} />
                </div>
            );
        }

        return summary;
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilderReducer.ingredients,
        purchased: state.orderReducer.purchased
    }
}

export default connect(mapStateToProps)(withRouter(Checkout));