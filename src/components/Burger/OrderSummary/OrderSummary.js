import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';



const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
                              .map(igKey =>{
                                  return (
                                      <li key={igKey}>
                                          <span style={{textTransform:'capitalize'}}>{igKey}</span>:{props.ingredients[igKey]}
                                      </li>
                                  );
                              });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>The Burger Contains following Ingredients:-</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total Price=<strong>{props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
        </Aux>
    );
}
export default orderSummary;