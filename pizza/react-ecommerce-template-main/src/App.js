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

import { AuthProvider } from "./template/AuthContext"; // Assurez-vous que AuthProvider est importé correctement
import RandomPizza from "./pizza-aleatoire/RandomPizza"
import { CartProvider } from './panier/CartContext';
import Editprofile from "./profile/Editprofile" ; 
function App() {
  return (
    <AuthProvider>  {/* AuthProvider doit envelopper toute l'application */}
      <CartProvider>
        <Template>
          <Switch>
            <Route path="/products" exact>
              <ProductList />
            </Route>
            <Route path="/profileedit" exact>
              <Editprofile />
            </Route>
            <Route path="/orders" exact>
              <Order />
            </Route>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/aleatoire" exact>
              <RandomPizza/>
            </Route>
            <Route path="/panier" exact>
              <Panier />
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
    </AuthProvider>
  );
}

export default App;
