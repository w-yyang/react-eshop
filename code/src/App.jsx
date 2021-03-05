import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

import store from './stores/stores';
import Header from './components/header/header.jsx';
import Tabbar from './components/tabbar/tabbar.jsx';
import Home from './pages/home/home.jsx';
import User from './pages/user/user.jsx';
import Shop from './pages/shop/shop.jsx';
import Cart from './pages/cart/cart.jsx';
import Login from './pages/login/login.jsx';
import Buy from './pages/buy/buy.jsx';
import Detail from './pages/detail/detail.jsx';
import './App.less';

class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="wrapper">
        <BrowserRouter>
          <Header />
          <div className="main-content">
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/shop" component={Shop}/>
                <Route path="/login" component={Login}/>
                <Provider store={store}>
                  <Route path="/user" component={User}/>
                  <Route path="/cart" component={Cart}/>
                  <Route path="/detail/:shopid" component={Detail}/>
                  <Route path="/buy/:id" component={Buy}/>
                </Provider>
              </Switch>
              <Tabbar />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
