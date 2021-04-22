import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Orders from './containers/Checkout/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as action from './store/actions/index';
import { connect } from 'react-redux';

class App extends Component {
  componentDidMount(){
    this.props.onCheckAuthState();
  }
  render() {
    let routes = (
      <Switch>
            <Route exact path="/" component={BurgerBuilder}/>
            <Route path="/auth" component={Auth} />
            <Redirect to = '/' />
      </Switch>
    );
    if(this.props.isAuthenticated){
      routes = (
      <Switch>
            <Route exact path="/" component={BurgerBuilder}/>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/auth" component={Auth} />
            <Route path="/orders" component={Orders} />            
            <Route path="/logout" component={Logout} />
            <Redirect to = '/' />
      </Switch>
      );
    }
    return (
      <BrowserRouter>
      <div>
        <Layout>
          {routes}
        </Layout>
        
      </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated : state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthState : ()=> dispatch(action.checkAuthState())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
