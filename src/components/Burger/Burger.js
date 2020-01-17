// core imports + libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';

// import { withRouter } from 'react-router-dom';

// component imports
// import Aux from '../../HOC/Aux';
import BurgerIngredients from './BurgerIngredient/BurgerIngredients';

// css imports
import classes from './Burger.module.css';

class Burger extends Component {
    render () {

        let keyCounter = 6000;
        let burgerIngredientList = [];
    
        Object.keys(this.props.ingredients).forEach((ingredientKey) => {
            let count = this.props.ingredients[ingredientKey];
            while (count > 0) {
                burgerIngredientList.push(<BurgerIngredients key={keyCounter++} type={ingredientKey}/>);
                count--;
            }
        });
    
        console.log('[BurgetBuilder]', burgerIngredientList);
    
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
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients
    };
};

// export default withRouter(burger);
export default connect(mapStateToProps)(Burger);
