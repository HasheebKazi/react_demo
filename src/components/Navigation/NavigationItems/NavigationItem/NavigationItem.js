import React from 'react';

// css imports
import classes from './NavigationItem.module.css';

const navigationItem = (props) => {
    return (
        <li className={classes.NavigationItem}>
            <a 
                href={props.link} 
                className={props.active ? classes.active : null}> 
                { props.children } </a>
        </li>
    );
}

export default navigationItem;