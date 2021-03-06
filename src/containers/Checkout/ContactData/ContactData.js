import React, { Component } from 'react';
import { connect } from 'react-redux';  
import { Redirect } from 'react-router-dom';

// dependencies
import axios_orders from '../../../axios-orders';
import * as actions from '../../../store/actions/index';

// components
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Form/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../HOC/withErrorHandler/withErrorHandler';
// css
import classes from './ContactData.module.css';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                    minLength: 3
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false
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

    orderHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            order: formData,
            userId: this.props.userId
        };
        this.props.onOrderBurger({
            orderData: order,
            authToken: this.props.authToken
        });
        return false;
    }

    inputChangedHandler(event, inputIdentifier) {
        const updatedOrderForm  = {
            ...this.state.orderForm
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
 
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    }

    render() {

        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
            });
        }

        let form = (
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
                <Button clicked={ this.orderHandler } btnType="Success" disabled={ !this.state.formIsValid }>ORDER</Button>
            </form>
        );
        
        if (this.props.loading) {
            form = <Spinner />;
        }

        if (this.props.purchased) {
            form = <Redirect to="/" />;
        }

        return (
            <div className={ classes.ContactData } >
                <h4> Enter your contact data </h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.orders.loading,
        purchased: state.orders.purchased,
        authToken: state.auth.authData.token,
        userId: state.auth.authData.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios_orders));