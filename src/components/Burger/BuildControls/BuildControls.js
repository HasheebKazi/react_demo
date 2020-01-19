import React from 'react';

// module imports
import BuildControl from './BuildControl/BuildControl';

// css imports
import classes from './BuildControls.module.css';

const buildControls = (props) => {

    let keyCounter = 5000;
    let ingredientList = Object.keys(props.ingredientList);
    let controls = [];
    ingredientList.forEach((igKey) => {
        controls.push(
            <BuildControl 
                key={ keyCounter++ }
                label={ props.ingredientList[igKey] } 
                clickMore={ () => props.clickMore(igKey) } 
                clickLess={ () => props.clickLess(igKey) } 
                disabled={ props.disabled[igKey] }
            />
        );
    });

    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls}
            <button 
                className={ classes.OrderButton }
                disabled={ (!props.purchaseable) }
                onClick={ props.orderNow } >
                {props.isAuthenitcated ? 'Order Now' : 'Signin to Continue'}
            </button>
        </div>
    );
}

export default buildControls;