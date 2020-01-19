// core imports + libraries
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authCheckState } from './store/actions/index';

// components
import Layout from './HOC/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/auth/Logout/Logout'

// lazy loading
import asyncComponent from './HOC/asyncComponent/asynComponent';

// css imports
import classes from './App.module.css';

// initialize async components for lazy loading
const asyncCheckout = asyncComponent(() => {
    return import('./containers/Checkout/Checkout');
});
const asyncOrders = asyncComponent(() => {
    return import('./containers/Checkout/Orders/Orders');
});
const asyncAuth = asyncComponent(() => {
    return import('./containers/auth/Auth');
});

class App extends Component {

    componentDidMount() {
        this.props.onStart();
    }

    render() {

        let routes = (
            <Switch>
                <Route path="/signin" exact component={asyncAuth } />
                <Route path="/" exact component={BurgerBuilder } />
                <Redirect to="/" />
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/signin" exact component={asyncAuth } />
                    <Route path="/signout" exact component={Logout } />
                    <Route path="/checkout" component={asyncCheckout } />
                    <Route path="/orders" component={asyncOrders } />
                    <Route path="/" exact component={BurgerBuilder } />
                    <Redirect to="/" />
                </Switch>
            );
        }

        return (
            
            < div className = { classes.App } >

                < Layout >

                    { routes }
            
                </Layout >

            </div >
            
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.authData.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onStart: () => dispatch(authCheckState())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
