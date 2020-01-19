import React from 'react';

// module imports
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

// css imports
import classes from './Sidedrawer.module.css';

const sideDrawer = (props) => {
    const attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses[1] = "classes.Open";
    }
    
    return (
        <React.Fragment>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}  onClick={ props.closed } > 
                <div className={classes.Logo}>
                    <Logo/>
                </div>  
                <nav>
                    <NavigationItems isAuthenticated={ props.isAuthenticated } />
                </nav>
            </div>
        </React.Fragment>
    );
}

export default sideDrawer;