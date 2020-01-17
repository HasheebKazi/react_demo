import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions/orderActions';

class Checkout extends Component {

    componentWillMount() {
        this.props.onInitPurchase();
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/" />;
        if (this.props.ingredients) {
            summary = (
                <React.Fragment>
                    <CheckoutSummary 
                        ingredients={ this.props.ingredients } 
                        checkoutCancelled={ this.checkoutCancelledHandler }
                        checkoutContinued={ this.checkoutContinuedHandler }
                        />
                        <Route 
                            path={ this.props.match.path + '/contact-data' }  
                            component={ ContactData } />
                </React.Fragment>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitPurchase: () => dispatch(actions.purchaseInit())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);