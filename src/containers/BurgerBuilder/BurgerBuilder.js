import React,{ Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionTypes from '../../store/action';
import { connect } from 'react-redux';


class BurgerBuilder extends Component{
    state = {  
        purchasable: true,
        purchasing: false,
        loading:false,
    }

    componentDidMount(){
        axios.get("https://react-burger-builder-7b496-default-rtdb.firebaseio.com/ingredients.json")
        .then(response=>{
            this.setState({ingredient:response.data});
        });
    }

    updatePurchaseState = () => {
        let sum=0;
        for(let key in this.props.ingredient){
            sum+=this.props.ingredient[key];
        }
        console.log("sum = ",sum);
        this.setState({purchasable:sum>0});
        return sum>0;
    }

    purchasingHandler = () => {
        console.log("het");
        this.setState({purchasing:true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () => {
        // console.log("eyyy");
        
        // QUERYPARAMS WAS NEEDED WHEN STATE WAS MAINTED BY COMPONENT BUT WITH REDUX THERE IS 
        // NO NEED OF USING QUERY PARAMS

        // const queryParams=[];
        // for(let i in this.state.ingredient){
        //     queryParams.push(encodeURIComponent(i)+ "=" + encodeURIComponent(this.props.ingredient[i]));
        // }
        // queryParams.push(encodeURIComponent('price')+'='+encodeURIComponent(this.props.totalPrice.toFixed(2)));
        // const queryString = queryParams.join('&');
        this.props.history.push({
            pathname:"/checkout",
            // search:'?'+queryString
        });
    }


    render(){
        const disableButtonInfo={...this.props.ingredient};
        for(let key in disableButtonInfo){
            disableButtonInfo[key] = disableButtonInfo[key]<=0;
        }
        // console.log(disableButtonInfo);
        let orderSummary=null;
        
        let burger=<Spinner />
        if(this.props.ingredient){
                burger=(
                    
                    <Aux>
                        <Burger ingredients ={this.props.ingredient}/>
                        <BuildControls 
                        add={this.props.addIngredientHandler}
                        remove={this.props.removeIngredientHandler}
                        disabled={disableButtonInfo}
                        price={this.props.totalPrice}
                        purchasable={this.state.purchasable}
                        purchasing={this.purchasingHandler}/>
                    </Aux>
                )
                orderSummary = <OrderSummary 
                    ingredients = {this.props.ingredient} 
                    price={this.props.totalPrice}
                    purchaseCancelled = {this.purchaseCancelHandler}
                    purchaseContinue = {this.purchaseContinueHandler}
                    />
            
                
            
        }

        if(this.state.loading){
            orderSummary=<Spinner />
        }

        return(
        <Aux>
            <Modal show={this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            
            {burger}
        </Aux>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        ingredient:state.ingredients,
        totalPrice:state.totalPrice
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        addIngredientHandler : (item) => dispatch({type:actionTypes.ADD_INGREDIENTS, ingredientName:item}),
        removeIngredientHandler : (item) => dispatch({type:actionTypes.REMOVE_INGREDIENTS, ingredientName:item})
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder);