import React, { Component } from 'react';
import  Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actionTypesAuth from '../../store/actions/index'; 
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router';

class Auth extends Component{
    state = {
        control:{
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'E-Mail'
                },
                value:'',
                validation:{
                    required: true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Password'
                },
                value:'',
                validation:{
                    required: true,
                    minLength:6
                },
                valid:false,
                touched:false
            },
        },
        isSignUp:true,
    }

    componentDidMount() {
        if(!this.props.buildingBurger&&this.props.redirectedPath!=='/'){
            this.props.onSetAuthRedirectPath();
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

    inputChangedHandler = (event,controlName)=>{
        const updatedControl = {
            ...this.state.control,
        };
        const updatedItem = {...updatedControl[controlName]};
        updatedItem.value = event.target.value;
        updatedItem.valid = this.checkValidity(updatedItem.value,updatedItem.validation);
        updatedItem.touched=true;
        updatedControl[controlName]=updatedItem;
        this.setState({control:updatedControl});

    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.control.email.value,this.state.control.password.value,this.state.isSignUp);
        
    }

    switchAuthModeHandler = () =>{
        this.setState(prevState=>{
            return {isSignUp:!prevState.isSignUp}
        })
    }

    render(){
        let formElementArray=[];
        for(let key in this.state.control){
            formElementArray.push({
                id:key,
                config:this.state.control[key]
            });
        }
        let form = formElementArray.map(formElement=>(
            <Input 
                key = {formElement.id}
                inputType={formElement.config.elementType}
                elementConfig = {formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation&&formElement.config.touched}

            />
        ));
        if(this.props.loading){
            form = <Spinner />
        }

        let errorMessage = null;
        if(this.props.error){
            errorMessage = <p>{this.props.error.message}</p>
        }
        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to = {this.props.redirectedPath} />;
            
        }

        return(
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.onSubmitHandler}>
                    {form}
                    <Button btnType="Success">{this.state.isSignUp?'SIGN UP':'SIGN IN'}</Button>
                </form>
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
                    SWITCH TO {this.state.isSignUp?'SIGNIN':'SIGNUP'}
                </Button>
            </div>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        error:state.auth.error,
        loading:state.auth.loading,
        isAuthenticated: state.auth.token!==null,
        redirectedPath:state.auth.authRedirectPath,
        buildingBurger : state.burgerBuilder.building
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth : (email,password,isSignUp) => dispatch(actionTypesAuth.auth(email,password,isSignUp)),
        onSetAuthRedirectPath : () => dispatch(actionTypesAuth.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);