import React from 'react';

// css imports
import classes from './Spinner.module.css';

const spinner = (props) => {
    return (
        <div className={classes.Loader}>Loading...</div>
    );
}

export default spinner;