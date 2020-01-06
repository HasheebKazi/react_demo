// core imports + libraries
import React, { Component } from 'react';

// components
import Layout from '../components/Layout/Layout';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';

// css imports
import classes from './App.module.css';



class App extends Component {

    state = {
        show: true
    }

    // componentDidMount() {
    //     setTimeout(() => {
    //         this.setState({show: false});
    //     }, 3000);
    // }

    render() {


        return (
            <div className={classes.App}>
                <Layout>
                    {this.state.show ? <BurgerBuilder /> : null}
                </Layout>
            </div>
        );
    }
}

export default App;
