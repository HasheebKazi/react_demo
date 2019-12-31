// core imports + libraries
import React, { Component } from 'react';

// components
import Layout from '../components/Layout/Layout';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';

// css imports
import classes from './App.module.css';

class App extends Component {
    render() {
        return (
            <div className={classes.App}>
                <Layout>
                    <BurgerBuilder />
                </Layout>
            </div>
        );
    }
}

export default App;
