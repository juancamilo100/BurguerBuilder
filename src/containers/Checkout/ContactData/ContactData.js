import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: this.IFormElement('input', { type: 'text', placeholder: 'Your Name' }),
            street: this.IFormElement('input', { type: 'text', placeholder: 'Street' }),
            zipCode: this.IFormElement('input', { type: 'text', placeholder: 'ZIP CODE' }),
            country: this.IFormElement('input', { type: 'text', placeholder: 'Country' }),
            email: this.IFormElement('input', { type: 'email', placeholder: 'Your email' }),
            deliveryMethod: this.IFormElement('select', { options: [
                {value: 'fastest', displayValue: 'Fastest'},
                {value: 'cheapest', displayValue: 'Cheapest'},
            ]})
        },
        loading: false
    }

    IFormElement(type, config) {
        return {
            elementType: type,
            elementConfig: config,
            value: ''
        }
    }

    orderHandler = (event) => {
        event.preventDefault();

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
        }
        
        this.setState({
            loading: true,
        })

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
                changed={(event) => this.inputChangedHandler(event, element.id)}/>
        })

        let form = (
            <form>
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

export default withRouter(ContactData);