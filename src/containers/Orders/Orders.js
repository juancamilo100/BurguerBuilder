import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import {
    fetchOrders,
} from '../../store/actions/'
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

        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapPropsToState = (state) => {
    return {
        orders: state.orderReducer.orders,
        loading: state.orderReducer.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrders: () => dispatch(fetchOrders())
    }
}

export default connect(mapPropsToState, mapDispatchToProps)(withErrorHandler(Orders, axios));
