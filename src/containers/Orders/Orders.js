import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        this.getOrdersData();
    }

    async getOrdersData() {
        const response = await axios.get('/orders.json');        
        const fetchedOrders = [];

        for (const key in response.data) {
            console.log(response.data[key]);
            
            fetchedOrders.push({
                ...response.data[key],
                id: key
            })
        }

        this.setState({
            orders: fetchedOrders,
            loading: false
        });      
    }

    render() {
        let orders = null;
        if (this.state.orders) {
            orders = this.state.orders.map((order) => {
                console.log(order.ingredients);
                
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

export default withErrorHandler(Orders, axios)
