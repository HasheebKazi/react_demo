import React, { Component } from 'react';
import { connect } from 'react-redux';

// external packages
import axios_orders from '../../../axios-orders';

// internal packages
import withErrorHandler from '../../../HOC/withErrorHandler/withErrorHandler';
import { getOrders } from '../../../store/actions/index';

// react components
import Order from '../../../components/Order/Order';
import Spinner from '../../../components/UI/Spinner/Spinner';

// css
// import classes from './Orders.module.css';

class Orders extends Component {

    componentDidMount() {
        this.props.onGetOrders();
    }

    render() {
        let orders = <Spinner />;
        if (!this.props.loading) {
            orders = (this.props.orders.map(order => <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}  
                    />));
        }

        return (
            <React.Fragment>
                { orders }
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    console.log('adsfasd', state.orders.orders)
    return {
        orders: state.orders.orders,
        loading: state.orders.ordersPageLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetOrders: () => dispatch(getOrders())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios_orders));