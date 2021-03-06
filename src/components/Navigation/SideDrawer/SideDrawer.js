import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Aux from '../../../hoc/Aux/Aux';
import BackDrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.css';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer,classes.Open];
    if(!props.open){
        attachedClasses = [classes.SideDrawer,classes.Close];
    }
    return (
        <Aux>
            <BackDrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                
                <nav>
                    <NavigationItems isAuthenticated = {props.isAuth}/>
                </nav>
            </div>
        </Aux>
    )
}
export default sideDrawer;