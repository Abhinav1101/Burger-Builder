import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Button from '../../../components/UI/Button/Button';
import * as actionTypesAuth from '../../../store/actions/index';

class Logout extends Component {

    cancelLogoutHandler = () => {
        this.props.history.goBack();
    }

    continueLogoutHandler = () => {
        this.props.onLogout();
        
    }

    render(){
        let logout = (
            <div>
                <h1>Are You Sure? Do you want to Logout?</h1>
                <Button btnType="Success" clicked={this.cancelLogoutHandler}>Cancel</Button>
                <Button btnType="Danger" clicked={this.continueLogoutHandler}>Confirm</Button>
            </div>
        );
        if(this.props.isAuthenticated){
            logout = <Redirect to ="/auth" />
        }
        return logout;
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated:state.auth.token === null
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onLogout : () => dispatch(actionTypesAuth.authLogout())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Logout);