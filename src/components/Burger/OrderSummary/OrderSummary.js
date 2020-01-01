import React, { Component } from 'react';

// component import
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    componentDidUpdate() {
        console.log('[OrderSummary.js] componentDidUpdate');
    }

    render() {
        const ingredientSummary  = Object.keys(this.props.ingredients).map(igKey => {
            return (
                <li key={igKey}>
                    <span>{igKey.charAt(0).toUpperCase() + igKey.slice(1)}</span>: {this.props.ingredients[igKey]}
                </li>
            );
        });

        
        return (
            <React.Fragment>
                <h3>Your Order</h3>
                <p>ReAl FOOD with rEaL ingredients from the farm:</p>
                <ul>
                    { ingredientSummary }
                </ul>
                <p><strong>Total Price: {this.props.price}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.cancelPurchase}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.continuePurchase}>Continue</Button>
            </React.Fragment>
        );    
    }
}

export default OrderSummary;