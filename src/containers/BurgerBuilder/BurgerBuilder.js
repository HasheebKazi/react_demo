import React, { Component } from 'react';


// components 
// import Aux from '../../HOC/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

// css imports
// import classes from './BurgerBuilder.module.css';

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        ingredientList: {
            salad: 'Salad',
            bacon: 'Bacon',
            cheese: 'Cheese',
            meat: 'Meat'
        }, 
        prices: {
            salad: 0.5,
            cheese: 1,
            bacon: 2,
            meat: 1.5
        },
        totalPrice: 0.2,
        purchaseable: false,
        purchasing: false
    }

    purchaseHandler = () => {
        this.setState({purchasing: !this.state.purchasing});
    }

    purchaseContinueHandler = () => {
        alert('You bought this burger, Congrats!!!!!!');
        window.location.reload();
        return false;
    }

    updatePurchaseState(updatedIngredients) {
        const ingredients = {
            ...updatedIngredients
        };
        const sum = Object.keys(ingredients).map(igkey => {
            return ingredients[igkey];
        }).reduce((sum, element) => {
            return sum + element;
        }, 0);

        this.setState({purchaseable: sum > 0});
    }

    addIngredientClickListener(ig) {
        let newIgState = {...this.state.ingredients};
        let newPrice = this.state.totalPrice + 1 - 1;
        newPrice += this.state.prices[ig];
        newIgState[ig] += 1;
        this.setState({ingredients: newIgState, totalPrice: newPrice});
        this.updatePurchaseState(newIgState);
    }

    removeIngredientClickListener(ig) {
        let newIgState = {...this.state.ingredients};
        let newPrice = this.state.totalPrice + 1 - 1;
        if (newIgState[ig] > 0) {
            newIgState[ig] -= 1;
            newPrice -= this.state.prices[ig];
            this.setState({ingredients: newIgState, totalPrice: newPrice});
            this.updatePurchaseState(newIgState);
        } else {
            return
        }
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} clickBackdrop={this.purchaseHandler}>
                    <OrderSummary 
                        cancelPurchase={this.purchaseHandler}
                        continuePurchase={this.purchaseContinueHandler}
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredients={this.state.ingredients} 
                    ingredientList={this.state.ingredientList}
                    clickMore={ this.addIngredientClickListener.bind(this) } 
                    clickLess={ this.removeIngredientClickListener.bind(this) } 
                    disabled={disableInfo}
                    purchaseable={this.state.purchaseable}
                    price={this.state.totalPrice}
                    orderNow={this.purchaseHandler}
                    inOrderModal={this.state.purchasing}
                />
            </React.Fragment>
        );
    }
}

export default BurgerBuilder;
