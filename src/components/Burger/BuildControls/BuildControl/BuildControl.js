import React from 'react';

// css imports
import classes from './BuildControl.module.css';

const buildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button 
                className={[classes.BuildControl__button, classes.Less].join(' ')} 
                onClick={ props.clickLess }
                disabled={props.disabled}
            >
                Less
            </button>
            <button 
                className={[classes.BuildControl__button, classes.More].join(' ')} 
                onClick={ props.clickMore } 
            >
                More
            </button>
        </div> 
    );
}

export default buildControl;