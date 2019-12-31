import React from 'react';

// css imports
import classes from './Backdrop.module.css';

const backdrop = (props) => (
    props.show? <div onClick={props.clicked} className={classes.Backdrop}></div> : null
)

export default backdrop;