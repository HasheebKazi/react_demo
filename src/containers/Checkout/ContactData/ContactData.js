import React, { Component } from 'react';

// dependencies
import axios_orders from '../../../axios-orders';

// components
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Form/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';

// css
import classes from './ContactData.module.css';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
         
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'test_name',
                country: 'test_country',
            },
            deliveryMethod: 'fastest'
        };

        axios_orders.post('/orders.json', order)
        .then(response => {
            this.setState({loading: false, purchasing: false});
            this.props.history.push('/');
            console.log(response);
        })
        .catch(error => {
            this.setState({loading: false, purchasing: false});
            console.log(error);
        });
        // window.location.reload();
        return false;
    }

    render() {
        let form = (
            <form action="">
                <Input inputtype='input' type="text" name="name" placeholder="Your Name" label="Name" />
                <Input inputtype='input' type="email" name="email" placeholder="Your Email" label="Email" />
                <Input inputtype='input' type="text" name="street" placeholder="Street Address" label="Street" />
                <Input inputtype='input' type="text" name="postalcode" placeholder="Postal Code" label="Postal Code" />
                <Button clicked={ this.orderHandler } btnType="Success">ORDER</Button>
            </form>
        );
        
        if (this.state.loading) {
            form = <Spinner />;
        }

        return (
            <div className={ classes.ContactData } >
                <h4> Enter your contact data </h4>
                {form}
            </div>
        );
    }
}

export default ContactData;