import React, { Component } from 'react';

// module imports
import Backdrop from '../Backdrop/Backdrop';

// css imports
import classes from './Modal.module.css';

class Modal extends Component {

    componentDidUpdate() {
        console.log('[Modal.js] componentDidUpdate');
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.show !== this.props.show || nextProps.children !== this.props.children);
    }

    render() {
        return (
            <React.Fragment>
                <Backdrop show={this.props.show} clicked={this.props.clickBackdrop} />
                <div className={classes.Modal}
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)}', 
                    opacity: this.props.show ? '1': '0',
                    // display: !this.props.show ? 'none' : 'block'
                }}>
                    { this.props.children }
                </div>
            </React.Fragment>
        );
    }
}

export default Modal;