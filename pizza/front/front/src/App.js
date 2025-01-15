import React from 'react';
import Template from "./template/Template";
import ProductDetail from "./products/detail/ProductDetail";
import { Switch, Route } from "react-router-dom";
import Landing from "./landing/Landing";
import ProductList from "./products/ProductList";
import Signup from "./login/Signup";
import Login from "./login/Login";
import Panier from "./panier/Panier";
import Order from "./orders/Orders";

import { CartProvider } from './panier/CartContext';

function App() {
  return (
    <CartProvider>  {/* Envelopper l'ensemble de l'application avec le CartProvider */}
      <Template>
        <Switch>
          <Route path="/products" exact>
            <ProductList />
          </Route>
          <Route path="/orders" exact>
            <Order />
          </Route>
          <Route path="/login" exact>
            <Login/>
          </Route>
          <Route path="/panier" exact>
            <Panier/>
          </Route>
          <Route path="/signup" exact> 
            <Signup /> 
          </Route>
          <Route path="/products/:id" exact>
            <ProductDetail />
          </Route>
          <Route path="/" exact>
            <Landing />
          </Route>
        </Switch>
      </Template>
    </CartProvider>
  );
}

export default App;
