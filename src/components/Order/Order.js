import React from 'react';
import classes from './Order.css';

const order = (props) => {
    const ingredient = [];
    for(let ingredientName in props.ingredients){
        // console.log(props.ingredients[ingredientName]);
        ingredient.push({
            name:ingredientName,
            amount:props.ingredients[ingredientName]});
        // ingredient.push(ingredientName);
    }
    // console.log(ingredient);
    const ingredientOutput = ingredient.map(ig=>{
        // console.log(ig);
        return <span style={{
            textTransform:"capitalize",
            display:"inline-block",
            margin:'0px 8px',
            padding:'5px',
            border:'1px solid #ccc'
            }} key={ig.name}> {ig.name} = {ig.amount}</span>;
    })

    return(
        <div className={classes.Order}>
            <p>{ingredientOutput}</p>
            <p><strong>INR = {props.price}</strong> </p>
        </div>
    )
}
export default order;