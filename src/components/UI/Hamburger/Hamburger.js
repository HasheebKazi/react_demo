import React from 'react';

// css imports
import classes from './hamburger.module.css';

const hamburger = (props) => {

    let buttonStyles = [classes.hamburger, classes.hamburger____3dx];
    return (
        <button 
            className={buttonStyles.join(' ')} 
            type="button" 
            onClick={props.hbClick}
        >
            <span className={classes.hamburger___box}>
                <span className={classes.hamburger___inner}></span>
            </span>
        </button>
    );
}

export default hamburger;