import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// internal
import { initAuth, authRedirect } from '../../store/actions/authActions';
// import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
// import axios from 'axios';


// react components
import Input from '../../components/UI/Form/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
// css
import classes from './Auth.module.css';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementLabel: 'Email',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementLabel: 'Password',
                elementConfig: {
                    type: 'password',
                    placeholder: ''
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false, // should be false
        isSignup: false

    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthPath();
        }
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup
            };
        });
    }

    checkValidity(value, rules) {
        let isValid = true;
        
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }

    loginHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in this.state.controls) {

            formData[formElementIdentifier] = this.state.controls[formElementIdentifier].value;
        }

        formData['isSignup'] = this.state.isSignup;

        this.props.onLogin(formData);

        return false;
    }

    inputChangedHandler(event, inputIdentifier) {
        const updatedOrderForm  = {
            ...this.state.controls
        };
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = formIsValid && updatedOrderForm[inputIdentifier].valid;
        }
 
        this.setState({ 
            controls: updatedOrderForm, 
            formIsValid: formIsValid 
        });
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key],
            });
        }

        let form = <Spinner />;
        if (!this.props.loading && !this.props.isAuthenticated) {
            // let errorMessage = null;
            // if (this.props.error) {
            //     errorMessage = <p> {this.props.error.message} </p>
            // }
            form = (
                <div className={ classes.LoginForm } >
                    <h4> { this.state.isSignup ? 'Enter your credentials to signup' : 'Enter your credentials to signin' } </h4>
                    <form>
                        {formElementsArray.map(formElement => (
                            <Input 
                                key={ formElement.id }
                                elementType={ formElement.config.elementType }
                                elementConfig={ formElement.config.elementConfig }
                                value={ formElement.config.value }
                                label={ formElement.config.elementLabel }
                                
                                valid={ formElement.config.valid }
                                shouldValidate={ formElement.config.validation }
                                touched={ formElement.config.touched }
                                changed={ (event) => this.inputChangedHandler(event, formElement.id) }
                            />) )}
                        <Button clicked={ this.loginHandler } btnType="Success" disabled={ !this.state.formIsValid }> { this.state.isSignup ? 'Signup' : 'Signin' } </Button>
                    </form>
                        <Button clicked={ this.switchAuthModeHandler } btnType="Danger"> { this.state.isSignup ? 'Switch to Signin' : 'Switch to Signup' } </Button>
                    
                </div>
            );
        } else if (this.props.isAuthenticated) {
            form = <Redirect to={ this.props.authRedirectPath } />
        }

        return form;
    }
}


const mapStatetoProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.authData.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirect
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (payload) =>  dispatch(initAuth(payload)),
        onSetAuthPath: () => dispatch(authRedirect({ url: '/' }))
    };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Auth);