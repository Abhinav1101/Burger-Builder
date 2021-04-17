import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Orders from './containers/Checkout/Orders/Orders';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div>
        <Layout>
          {/* <BurgerBuilder></BurgerBuilder> */}
          <Route exact path="/" component={BurgerBuilder}/>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Orders} />
        </Layout>
        
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
