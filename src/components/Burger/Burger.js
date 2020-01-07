// core imports + libraries
import React from 'react';
// import { withRouter } from 'react-router-dom';

// component imports
// import Aux from '../../HOC/Aux';
import BurgerIngredients from './BurgerIngredient/BurgerIngredients';

// css imports
import classes from './Burger.module.css';

const burger = (props) => {
    let keyCounter = 6000;
    let burgerIngredientList = [];
    Object.keys(props.ingredients).forEach((ingredientKey) => {
        let count = props.ingredients[ingredientKey];
        while (count > 0) {
            burgerIngredientList.push(<BurgerIngredients key={keyCounter++} type={ingredientKey}/>);
            count--;
        }
    });

    if (burgerIngredientList.length === 0) {
        burgerIngredientList = (<p>Please start adding ingredients.</p>);
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top"/>
            {burgerIngredientList}
            <BurgerIngredients type="bread-bottom"/>
        </div>
    );
}

// export default withRouter(burger);
export default burger;
