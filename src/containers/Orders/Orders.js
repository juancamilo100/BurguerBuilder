import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import {
    fetchOrders,
} from '../../store/actions'
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    componentDidMount() {
        this.props.fetchOrders();
    }

    render() {
        let orders = <Spinner />;
        if (this.props.orders && !this.props.loading) {
            orders = this.props.orders.map((order) => {
                return (
                    <Order 
                        key={order.id} 
                        price={order.price}
                        ingredients={order.ingredients}/>
                );
            });
        };

        if(!this.props.isLoggedIn) {
            orders = <Redirect to='/login' />
        }

        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading,
        isLoggedIn: state.auth.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrders: () => dispatch(fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
