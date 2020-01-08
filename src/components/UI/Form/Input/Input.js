import React from 'react';

// css
import classes from './Input.module.css';

const input = (props) => {

    let inputElem = null;

    switch (props.inputtype) {
        case ('input'):
            inputElem = (<input 
                className={ classes.Input } 
                { ...props } />);
            break;
        case ('textarea'):
            inputElem = (<textarea { ...props } />);
            break;
        default:
            inputElem = (<p>Invalid Component</p>);
    }

    return (
        <div className={ classes.InputContainer }>
            <label className={ classes.Label }> { props.label } </label>
            { inputElem }
        </div>
    );

}

export default input;