import React from 'react';

// import components
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

// import css
import classes from './Toolbar.module.css';

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <div>Menu</div>
            <div className={[classes.Logo, classes.DesktopOnly].join(' ')}>
                <Logo />

            </div>
            <nav className={[classes.Toolbar__nav, classes.DesktopOnly].join(' ')}>
                <NavigationItems />
            </nav>
        </header>
    );
}

export default toolbar;