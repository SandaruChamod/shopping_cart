import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import CartContainer from './containers/CartContainer/CartContainer';
import AuthContainer from './containers/AuthContainer/AuthContainer';
import ProductContainer from "./containers/ProductsContainer/ProductContainer";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/' exact component={ProductContainer}/>
          <Route path='/cart' component={CartContainer}/>
          <Route path='/login' component={AuthContainer}/>
        </Switch>
      </div>
    );
  }
}

export default App;
