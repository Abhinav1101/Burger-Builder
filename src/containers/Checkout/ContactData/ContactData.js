import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component{
    state={
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:'',
        },
        loading:false
    }

    orderHandler = (event) => {
        // to prevent the page from reloading which is default behavior of form
        event.preventDefault();
        // console.log(this.props.ingredients);
        // console.log(this.props.price);

        this.setState({loading:true});
        const order = {
            ingredients: this.props.ingredients,
            price : this.props.price,
            customer:{
                name:'Abhi',
                address:'syndicate',
                zipcode:'25668',
                country:'India'
            }
        }
        axios.post("/orders.json",order)
        .then(response=>{
            this.setState({loading:false});
            this.props.history.push('/');
        })
        .catch(error=>{
            this.setState({loading:false});
        })
    }

    render(){
        let form=(
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Name" />
                <input className={classes.Input} type="email" name="email" placeholder="Email" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="postalCode" placeholder="Postal Code" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        )
        if(this.state.loading){
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
export default ContactData;