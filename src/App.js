// core imports + libraries
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { authCheckState } from './store/actions/index';

// components
import Layout from './HOC/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Checkout/Orders/Orders';
import Auth from './containers/auth/Auth';
import Logout from './containers/auth/Logout/Logout'

// css imports
import classes from './App.module.css';



class App extends Component {

    componentDidMount() {
        this.props.onStart();
    }

    render() {


        return (
            
            < div className = { classes.App } >

                < Layout >

                    <Switch>
                        <Route path="/signout" exact component={Logout } />
                        <Route path="/signin" exact component={Auth } />
                        <Route path="/checkout" component={Checkout } />
                        <Route path="/orders" component={Orders } />
                        <Route path="/" exact component={BurgerBuilder } />
                    </Switch>
            
                </Layout >

            </div >
            
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onStart: () => dispatch(authCheckState())
    };
};

export default connect(null, mapDispatchToProps)(App);
