import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label:'Salad', type:'salad'},
    {label:'Meat', type:'meat'},
    {label:'Cheese', type:'cheese'},
    {label:'Bacon', type:'bacon'}
];

const buildControls = (props) => {
    
    return (
        <div className={classes.BuildControls}>
            <p>Total Price = <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(control => (
            <BuildControl 
            key={control.label} 
            label={control.label} 
            add = {() => props.add(control.type)}
            remove = {()=> props.remove(control.type)}
            disabled={props.disabled[control.type]}/>
            ))}
            <button 
            className={classes.OrderButton} 
            disabled={!props.purchasable}
            onClick={props.purchasing}>ORDER NOW</button>
        </div>
    )
}

export default buildControls;