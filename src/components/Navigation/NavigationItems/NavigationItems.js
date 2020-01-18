import React from 'react';

// module imports
import NavigationItem from './NavigationItem/NavigationItem';

// css imports
import classes from './NavigationItems.module.css';

const navigatioItems = () => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>
            <NavigationItem link="/signin">Signin</NavigationItem>
        </ul>
    );
};

export default navigatioItems;