import React from 'react';

// module imports
import Backdrop from '../Backdrop/Backdrop';

// css imports
import classes from './Modal.module.css';

const modal = (props) => {
    return (
        <React.Fragment>
            <Backdrop show={props.show} clicked={props.clickBackdrop} />
            <div className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)}', 
                opacity: props.show ? '1': '0'
            }}>
                { props.children }
            </div>
        </React.Fragment>
    );
}

export default modal;