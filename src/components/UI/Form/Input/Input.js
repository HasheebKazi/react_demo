import React from 'react';

// css
import classes from './Input.module.css';

const input = (props) => {

    let inputElem = null;

    const inputClasses = [classes.Input];

    console.log(props.elementType, 'is valid', props.valid);
    console.log(props.elementType, 'should validate', props.shouldValidate);
    console.log(props.elementType, 'is touched', props.touched);
    
    if (!props.valid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.InvalidInput);
    }

    switch (props.elementType) {
        case ('input'):
            inputElem = (<input 
                className={ props.valid ? classes.Input : inputClasses.join(' ') }
                value={ props.value } 
                onChange={ props.changed }
                { ...props.elementConfig } />);
            break;
        case ('select'):
            inputElem = (
                <select value={ props.value } className={ classes.Select } onChange={ props.changed } >
                    { props.elementConfig.options.map(option => (
                        <option key={ option.value } value={ option.value } > { option.displayValue } </option>
                    ))} 
                 </select>);
            break;
        case ('textarea'):
            inputElem = (<textarea 
                value={ props.value } 
                onChange={ props.changed }
                { ...props.elementConfig } />);
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