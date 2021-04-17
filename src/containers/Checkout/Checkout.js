import React ,{ Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{
    state ={
        ingredients:{
            salad:1,
            cheese:1,
            meat:1,
            bacon:1
        },
        totalPrice:0,

    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search).get("salad");
        console.log(query);
        const ingredients = {};
        let price=new URLSearchParams(this.props.location.search).get("price");
        for(let ing in this.state.ingredients){
            ingredients[ing] = new URLSearchParams(this.props.location.search).get(ing);
        }
        this.setState({ingredients:ingredients,totalPrice:price});
        console.log("price =",price);
    }

    cancelledCheckoutHandler=()=>{
        // console.log(this.props)
        this.props.history.goBack();
    }
    continuedCheckoutHandler=()=>{
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        console.log(this.props);
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients} 
                    cancelled={this.cancelledCheckoutHandler}
                    continued={this.continuedCheckoutHandler}
                    />
                <Route 
                path={this.props.match.path+'/contact-data'} 
                render={(props)=>(<ContactData ingredients={this.state.ingredients} 
                    price={this.state.totalPrice}
                    {...props}/>)} />
            </div>
        )
    }
}
export default Checkout;