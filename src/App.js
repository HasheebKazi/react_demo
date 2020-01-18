// core imports + libraries
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// components
import Layout from './HOC/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Checkout/Orders/Orders';
import Auth from './containers/auth/Auth';

// css imports
import classes from './App.module.css';



class App extends Component {

    render() {


        return (
            
            < div className = { classes.App } >

                < Layout >

                    <Switch>

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

export default App;
