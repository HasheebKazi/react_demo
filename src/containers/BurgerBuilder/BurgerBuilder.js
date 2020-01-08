import React, { Component } from 'react';

// library imports
import axios_orders from '../../axios-orders';

// components 
// import Aux from '../../HOC/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

// HOC 
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler'; 

// css imports
// import classes from './BurgerBuilder.module.css';

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
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
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios_orders.get('https://react-burger-builder-b96cb.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data});
        })
        .catch(error => {
            this.setState({error: true});
            console.log(error);
        });
    }

    purchaseHandler = () => {
        this.setState({purchasing: !this.state.purchasing});
    }

    purchaseContinueHandler = () => {

        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout', 
            search: queryString
        });

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

        let orderSummary = null;

        let burger = this.state.error ? <p style={{textAlign: "center", margin: "50px", fontSize: "20px"}}>Catastrophic Failure</p> : <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <React.Fragment>
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

            orderSummary = <OrderSummary 
                cancelPurchase={this.purchaseHandler}
                continuePurchase={this.purchaseContinueHandler}
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
            />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }


        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} clickBackdrop={this.purchaseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios_orders);
