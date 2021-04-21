import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
// import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux';
import *  as actionTypesOrder from '../../../store/actions/index';


class ContactData extends Component{
    state={
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Name'
                },
                value:'',
                validation:{
                    required: true,
                },
                valid:false,
                touched:false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required: true,
                },
                valid:false,
                touched:false
            },
            zipcode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Zip Code'
                },
                value:'',
                validation:{
                    required: true,
                },
                valid:false,
                touched:false
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                validation:{
                    required: true,
                },
                valid:false,
                touched:false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'E-mail'
                },
                value:'',
                validation:{
                    required: true,
                },
                valid:false,
                touched:false
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[{value:"fastest",displayValue:"Fastest"},
                             {value:"cheapest",displayValue:"Cheapest"},
                            ]
                },
                value:'fastest'
            },

        },
        formIsValid:false,
        
    }

    orderHandler = (event) => {
        // to prevent the page from reloading which is default behavior of form
        event.preventDefault();
        // console.log(this.props.ingredients);
        // console.log(this.props.price);
        const formData = {}
        for(let formElement in this.state.orderForm){
            formData[formElement] = this.state.orderForm[formElement].value;
            // if(this.state.orderForm.validation && (!this.state.orderForm[formElement].valid)){
            //     alert("can't submit");
            //     return;
            // }
        }
        // this.setState({loading:true});
        const order = {
            ingredients: this.props.ingredient,
            price : this.props.totalPrice.toFixed(2),
            userId : this.props.userId,
            orderData:formData,
        }
        // NOT NEEDED AFTER REDUX ASYNC
        // axios.post("/orders.json",order)
        // .then(response=>{
        //     this.setState({loading:false});
        //     this.props.history.push('/')
        // })
        // .catch(error=>{
        //     this.setState({loading:false});
        // })
        this.props.onBurgerOrder(order,this.props.token);
        
        if(!this.props.loading){
            this.props.clearState();
            this.props.history.replace("/");
        }
        
    }

    checkValidity = (value,rules) =>{
        let valid=false;
        // we are checking if rules is true as for deliveryMethod rules is undefined and so false
        if(rules&&rules.required){
            valid = value.trim() !== '';
        }
        return valid;
    }

    inputChangedHandler = (event,inputId) =>{
        // console.log(event.target.value);
        const updatedOrderForm = {...this.state.orderForm};
        const updatedInput = {...updatedOrderForm[inputId]};
        updatedInput.value = event.target.value;
        updatedInput.valid = this.checkValidity(updatedInput.value,updatedInput.validation);
        updatedInput.touched = true;
        // console.log(updatedInput);
        updatedOrderForm[inputId]=updatedInput;
        let formIsValid=true;
        for(let inputElement in updatedOrderForm){
            if(inputElement!=="deliveryMethod"){
                formIsValid = updatedOrderForm[inputElement].valid && formIsValid;
            }
        }
        console.log(formIsValid);
        this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid});
        
    }

    render(){
        let formElementArray=[];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }



        let form=(
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(formElement=>(
                    <Input 
                        key={formElement.id}
                        inputType={formElement.config.elementType}
                        elementConfig = {formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation&&formElement.config.touched}
                        />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        )
        if(this.props.loading){
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h3>Enter Your Details</h3>
                {form}
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        ingredient:state.burgerBuilder.ingredients,
        totalPrice:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        purchased:state.order.purchased,
        token : state.auth.token,
        userId : state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onBurgerOrder: (orderData,token) => dispatch(actionTypesOrder.purchaseBurger(orderData,token)),
        clearState : () => dispatch(actionTypesOrder.clearState())
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(ContactData);