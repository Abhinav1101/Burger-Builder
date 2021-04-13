import React,{ Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../hoc/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICE = {
    salad: 2.0,
    meat: 5.2,
    cheese: 4.3,
    bacon: 2.6
}


class BurgerBuilder extends Component{
    state = {
        ingredient : {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon : 0,
        },
        totalPrice : 2.0,
        purchasable: false,
        purchasing: false,
    }


    updatePurchaseState = (updatedIngredient) => {
        let sum=0;
        for(let key in updatedIngredient){
            sum+=updatedIngredient[key];
        }
        this.setState({purchasable:sum>0});
    }


    addIngredientHandler = (type) => {
        // console.log(type);
        const updatedIngredient = {...this.state.ingredient};
        updatedIngredient[type]++;
        const updatedPrice = this.state.totalPrice+INGREDIENT_PRICE[type];
        this.setState({ingredient:updatedIngredient,totalPrice:updatedPrice});
        this.updatePurchaseState(updatedIngredient);
        
    }
    removeIngredientHandler = (type) => {
        if(this.state.ingredient[type]>0){
            const updatedIngredient = {...this.state.ingredient};
            updatedIngredient[type]--;
            const updatedPrice = this.state.totalPrice-INGREDIENT_PRICE[type];
            this.setState({ingredient:updatedIngredient,totalPrice:updatedPrice});
            this.updatePurchaseState(updatedIngredient);
        }
        
    }

    purchasingHandler = () => {
        this.setState({purchasing:true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () => {
        alert('You continue!!!');
    }


    render(){
        const disableButtonInfo={...this.state.ingredient};
        for(let key in disableButtonInfo){
            disableButtonInfo[key] = disableButtonInfo[key]<=0;
        }
        // console.log(disableButtonInfo);
        
        return(
        <Aux>
            <Modal show={this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                <OrderSummary 
                ingredients = {this.state.ingredient} 
                price={this.state.totalPrice}
                purchaseCancelled = {this.purchaseCancelHandler}
                purchaseContinue = {this.purchaseContinueHandler}
                />
            </Modal>
            <Burger ingredients ={this.state.ingredient}/>
            <BuildControls 
            add={this.addIngredientHandler}
            remove={this.removeIngredientHandler}
            disabled={disableButtonInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            purchasing={this.purchasingHandler}/>
            
        </Aux>
        );
    }
}
export default BurgerBuilder;