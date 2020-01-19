import React, { Component } from 'react';
import { connect } from 'react-redux';

// library imports
import axios_orders from '../../axios-orders';

// components 
// import Aux from '../../HOC/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

// internal
import { addIngredient, removeIngredient, initIngredients, authRedirect } from '../../store/actions/index';

// HOC 
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler'; 

// css imports
// import classes from './BurgerBuilder.module.css';

class BurgerBuilder extends Component {

    state = {
        ingredientList: {
            salad: 'Salad',
            bacon: 'Bacon',
            cheese: 'Cheese',
            meat: 'Meat'
        }, 
        purchasing: false
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState((previousState) => {
                return { purchasing: !previousState.purchasing }
            });
        } else {
            this.props.onSetRedirectToPath('/checkout');
            this.props.history.push('/signin');
        }
    }

    // purchaseContinueHandler = () => {

    //     const queryParams = [];
    //     for (let i in this.props.ingredients) {
    //         queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]));
    //     }
    //     queryParams.push('price=' + this.props.totalPrice);
    //     const queryString = queryParams.join('&');
    //     this.props.history.push({
    //         pathname: '/checkout', 
    //         search: queryString
    //     });

    // }
    componentDidMount() {
        this.props.onInitIngredients();
    }

    purchaseContinueHandler = () => {
        this.props.history.push({
            pathname: '/checkout'
        });

    }

    updatePurchaseState(ings) {
        const ingredients = {
            ...ings
        };
        const sum = Object.keys(this.props.ingredients).map(igkey => {
            return ingredients[igkey];
        }).reduce((sum, element) => {
            return sum + element;
        }, 0);

        return sum > 0;
    }

    render() {
        const disableInfo = {
            ...this.props.ingredients
        };

        let orderSummary = null;

        let burger = this.props.error ? <p style={{textAlign: "center", margin: "50px", fontSize: "20px"}}>Catastrophic Failure</p> : <Spinner />;
        if (this.props.ingredients) {
            burger = (
                <React.Fragment>
                    <Burger />
                    <BuildControls 
                        ingredients={ this.props.ingredients } 
                        ingredientList={ this.state.ingredientList }
                        clickMore={ this.props.onAddIngredient } 
                        clickLess={ this.props.onRemoveIngredient } 
                        disabled={ disableInfo }
                        purchaseable={ this.updatePurchaseState(this.props.ingredients) }
                        price={ this.props.totalPrice }
                        orderNow={this.purchaseHandler}
                        inOrderModal={this.state.purchasing}
                        isAuthenticated={ this.props.isAuthenticated }
                    />
                </React.Fragment>
            );

            orderSummary = <OrderSummary 
                cancelPurchase={this.purchaseHandler}
                continuePurchase={this.purchaseContinueHandler}
                ingredients={this.props.ingredients}
                price={this.props.totalPrice}
            />;
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

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.error,
        isAuthenticated: state.auth.authData.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingredientName) => dispatch(addIngredient({ ingredientName: ingredientName })),
        onRemoveIngredient: (ingredientName) => dispatch(removeIngredient({ ingredientName: ingredientName })),
        onInitIngredients: () => dispatch(initIngredients()),
        onSetRedirectToPath: (url) => dispatch(authRedirect({ url: url }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios_orders));
