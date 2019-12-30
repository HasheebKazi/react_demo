import React from 'react';

// module imports
import BuildControl from './BuildControl/BuildControl';

// css imports
import classes from './BuildControls.module.css';

const buildControls = (props) => {


    let ingredientList = Object.keys(props.ingredients);
    let controls = [];
    ingredientList.forEach((igKey) => {
        controls.push(<BuildControl label={igKey} clickMore={props.clickMore} clickLess={props.clickLess} />)
    });

    return (
        <div className={classes.BuildControls}>
            {controls}
        </div>
    );
}

export default buildControls;