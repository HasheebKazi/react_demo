import React from 'react';

// module imports
import NavigationItem from './NavigationItem/NavigationItem';

// css imports
import classes from './NavigationItems.module.css';

const navigatioItems = (props) => {
    let navigatioItems = null;

    if (props.isAuthenticated) {
        navigatioItems = (
            <ul className={classes.NavigationItems}>
                <NavigationItem link="/" exact>Burger Builder</NavigationItem>
                <NavigationItem link="/orders">Orders</NavigationItem>
                <NavigationItem link="/signout">Signout</NavigationItem>
            </ul>
        );
    } else {
        navigatioItems = (
            <ul className={classes.NavigationItems}>
                <NavigationItem link="/" exact>Burger Builder</NavigationItem>
                <NavigationItem link="/signin">Signin</NavigationItem>
            </ul>
        );
    }

    return (
        <React.Fragment>
            { navigatioItems }
        </React.Fragment>
    );
};

export default navigatioItems;