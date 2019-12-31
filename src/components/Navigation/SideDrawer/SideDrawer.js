import React from 'react';

// module imports
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

// css imports
import classes from './Sidedrawer.module.css';

const sideDrawer = (props) => {
    return (
        <div className={classes.SideDrawer}> 
            <div className={classes.Logo}>
                <Logo/>
            </div>  
            <nav>
                <NavigationItems />
            </nav>
        </div>
    );
}

export default sideDrawer;