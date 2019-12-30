import React from 'react';

// css imports
import classes from './BuildControl.module.css';

const buildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button className={classes.Less} onClick={ () => { props.clickLess(props.label) }}>Less</button>
            <button className={classes.More} onClick={ () => { props.clickMore(props.label) }}>More</button>
        </div>
    );
}

export default buildControl;