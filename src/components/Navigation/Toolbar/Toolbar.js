import React from 'react';

// import components
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Hamburger from '../../UI/Hamburger/Hamburger';

// import css
import classes from './Toolbar.module.css';

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <div className={classes.MobileOnly} >
                <Hamburger
                    hbClick={props.drawerToggleClicked} 
                />
            </div>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={[classes.Toolbar__nav, classes.DesktopOnly].join(' ')}>
                <NavigationItems isAuthenticated={ props.isAuthenticated } />
            </nav>
        </header>
    );
}

export default toolbar;