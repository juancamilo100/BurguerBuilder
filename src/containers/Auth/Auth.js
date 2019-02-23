import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css'
import { auth } from '../../store/actions/'
import { connect } from 'react-redux';

class Auth extends Component {
    state = {
        controls: {
            email: this.getFormInput('input', { type: 'email', placeholder: 'Email Address' }, { required: true, minLength: 3, isEmail: true }),
            password: this.getFormInput('input', { type: 'password', placeholder: 'Password' }, { required: true, minLength: 6 })
        },
        isSignUp: true
    }

    getFormInput(type, config, validation) {
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

    getFormElements() {
        const formsElementsArray = [];
        
        for (const key in this.state.controls) {
            formsElementsArray.push({
               id: key,
               config: this.state.controls[key]
            });
        }

        return formsElementsArray;
    }

    onAuthSubmit = () => {
        this.props.signUp(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }

        this.setState({
            controls: updatedControls
        })
    }

    switchAuthMode = () => {
        this.setState((prevState) => {
            return {
                ...this.state,
                isSignUp: !prevState.isSignUp   
            }
        })
    }

    render() {
        let inputElements = this.getFormElements().map((element) => {
            const { id, config } = element
            const { elementType, elementConfig, value, valid, validation, touched } = config;

            return <Input 
                key={id} 
                elementType={elementType} 
                elementConfig={elementConfig} 
                value={value}
                invalid={!valid}
                shouldValidate={validation}
                touched={touched}
                changed={(event) => this.inputChangedHandler(event, id)}/>
        })

        let form = (
            <form onSubmit={this.onAuthSubmit}>
                {inputElements}
            </form>
        );
        
        return (
            <div className={classes.Auth}>
                {form}
                <Button type="Success" clicked={this.onAuthSubmit}>SUBMIT</Button>
                <Button type="Danger" clicked={this.switchAuthMode}>Switch to {this.state.isSignUp ? 'Sign In' : 'Sign Up'}</Button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (email, password, isSignup) => dispatch(auth(email, password, isSignup))
    }
}

export default connect(null, mapDispatchToProps)(Auth);