import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';

class ContactData extends Component {
    state = {
        orderForm: {
            name: this.IFormElement('input', { type: 'text', placeholder: 'Your Name' }, { required: true, minLength: 3 }),
            street: this.IFormElement('input', { type: 'text', placeholder: 'Street' }, { required: true, minLength: 3 }),
            zipCode: this.IFormElement('input', { type: 'text', placeholder: 'ZIP CODE' }, { required: true, minLength: 5 }),
            country: this.IFormElement('input', { type: 'text', placeholder: 'Country' }, { required: true, minLength: 5 }),
            email: this.IFormElement('input', { type: 'email', placeholder: 'Your email' }, { required: true, minLength: 5 }),
            deliveryMethod: this.IFormElement('select', { options: [
                {value: 'fastest', displayValue: 'Fastest'},
                {value: 'cheapest', displayValue: 'Cheapest'},
            ]})
        },
        loading: false
    }

    IFormElement(type, config, validation) {
        return {
            elementType: type,
            elementConfig: config,
            value: '',
            validation: validation,
            valid: false,
            touched: false
        }
    }

    checkValidity(value, rules) {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({
            loading: true,
        })
        
        const formData = {};
        
        for(let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        
        axios.post('/orders.json', order)
            .then(response => {
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                this.setState({
                    loading: false
                })
            })
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm,
        }

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        this.setState({
            orderForm: updatedOrderForm
        })
    }

    render() {
        const formsElementsArray = [];
        
        for (const key in this.state.orderForm) {
            formsElementsArray.push({
               id: key,
               config: this.state.orderForm[key]
            });
        }

        let inputElements = formsElementsArray.map((element) => {
            return <Input 
                key={element.id} 
                elementType={element.config.elementType} 
                elementConfig={element.config.elementConfig} 
                value={element.config.value}
                invalid={!element.config.valid}
                shouldValidate={element.config.validation}
                touched={element.config.touched}
                changed={(event) => this.inputChangedHandler(event, element.id)}/>
        })

        let form = (
            <form onSubmit={this.orderHandler}>
                {inputElements}
                <Button type="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );

        if(this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter you contact data</h4>
                {form}                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients
    }
}

export default connect(mapStateToProps)(withRouter(ContactData));