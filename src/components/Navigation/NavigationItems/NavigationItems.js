import React from 'react';

// module imports
import NavigationItem from './NavigationItem/NavigationItem';

// css imports
import classes from './NavigationItems.module.css';

const navigatioItems = () => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" active>Burger Builder</NavigationItem>
            <NavigationItem link="/">Checkout</NavigationItem>
        </ul>
    );
};

export default navigatioItems;