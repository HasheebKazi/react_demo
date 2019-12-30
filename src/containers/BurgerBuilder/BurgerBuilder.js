import React, { Component } from 'react';

/* ===========
    components 
   =========== */
// import Aux from '../../HOC/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

/* ============
    css imports
   ============ */
// import classes from './BurgerBuilder.module.css';

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 2,
            meat: 2
        }
    }

    addIngredientClickListener(ig) {
        let newIgState = {...this.state.ingredients};
        newIgState[ig] += 1;
        this.setState({ingredients: newIgState});
    }

    removeIngredientClickListener(ig) {
        let newIgState = {...this.state.ingredients};
        if (newIgState[ig] > 0) {
            newIgState[ig] -= 1;
        }
        this.setState({ingredients: newIgState});
    }

    render() {
        return (
            <React.Fragment>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredients={this.state.ingredients} 
                    clickMore={ this.addIngredientClickListener.bind(this) } 
                    clickLess={ this.removeIngredientClickListener.bind(this) } />
            </React.Fragment>
        );
    }
}

export default BurgerBuilder;
