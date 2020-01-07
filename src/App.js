// core imports + libraries
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// components
import Layout from './HOC/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

// css imports
import classes from './App.module.css';



class App extends Component {

    render() {


        return (
            
            < div className = { classes.App } >

                < Layout >

                    <Switch>
                        
                        <Route path="/" exact component={BurgerBuilder} />
                        <Route path="/checkout" exact component={Checkout} />

                    </Switch>
            
                </Layout >

            </div >
            
        );
    }
}

export default App;
