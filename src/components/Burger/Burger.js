import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';

const burger = (props) => {
    const transformedIngredients = Object.entries(props.ingredients);
    const changedIngredients=[];
    for(let i=0;i<transformedIngredients.length;i++){
        // console.log(transformedIngredients[i][1]);
        for(let j=0;j<transformedIngredients[i][1];j++){
            changedIngredients.push(transformedIngredients[i][0]);
        }
    }
    // console.log(changedIngredients.length);
    const assigning = changedIngredients.map((key,index) =>{
            return (               
                <BurgerIngredient type={key} key={index} />
            );
        }
    );
    // console.log(transformedIngredients);
    return (
        <div className={classes.Burger}>
            
            <BurgerIngredient type="bread-top"/>
            {
            changedIngredients.length>0?
            assigning:
            <p>Please start adding ingredients!!!</p>
            }
            
            <BurgerIngredient type="bread-bottom"/>

        </div>
    );
}

export default burger;