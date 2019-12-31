import React from 'react';

// component import
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    
    const ingredientSummary  = Object.keys(props.ingredients).map(igKey => {
        return (
            <li key={igKey}>
                <span>{igKey.charAt(0).toUpperCase() + igKey.slice(1)}</span>: {props.ingredients[igKey]}
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
            <p><strong>Total Price: {props.price}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.cancelPurchase}>Cancel</Button>
            <Button btnType="Success" clicked={props.continuePurchase}>Continue</Button>
        </React.Fragment>
    );
}

export default OrderSummary;