import React, { Component } from 'react';

// external packages
import axios_orders from '../../../axios-orders';

// internal packages
import withErrorHandler from '../../../HOC/withErrorHandler/withErrorHandler';

// react components
import Order from '../../../components/Order/Order';

// css
// import classes from './Orders.module.css';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }
    
    componentDidMount() {
        axios_orders.get('/orders.json')
        .then(res => {
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            this.setState({loading: false, orders: fetchedOrders});
        })
        .catch(err => {
            console.log(err);
            this.setState({loading: false});
        });

    }

    render() {
        return (
            <React.Fragment>
                {this.state.orders.map(order => <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}  
                />)}
            </React.Fragment>
        );
    }
}

export default withErrorHandler(Orders, axios_orders);