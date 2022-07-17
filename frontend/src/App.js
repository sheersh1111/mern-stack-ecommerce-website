import './App.css';
import { useState,useEffect } from 'react';
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Webfont from "webfontloader";
import React from 'react';
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/product/ProductDetails.js";
import Products from "./component/product/Products.js";
import Search from "./component/product/Search.js";
import LoginSignUp from './component/user/LoginSignUp';
// import Loader from './component/layout/Loader/Loader';
import store from "./store";
import {loadUser} from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from 'react-redux';
import Profile from "./component/user/Profile.js";
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from "./component/user/UpdateProfile.js";
import UpdatePassword from "./component/user/UpdatePassword.js";
import ForgotPassword from "./component/user/ForgotPassword.js";
import ResetPassword from "./component/user/ResetPassword.js";
import Cart from "./component/cart/Cart.js"
import Shipping from "./component/cart/Shipping.js"
import ConfirmOrder from "./component/cart/ConfirmOrder.js"
import axios from 'axios';
import Payment from "./component/cart/Payment.js"
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import OrderSuccess from "./component/cart/OrderSuccess.js";
import MyOrders from "./component/orders/MyOrders.js" ;
import OrderDetails from "./component/orders/OrderDetails.js";
import Dashboard from "./component/admin/Dashboard.js";
import ProductList from "./component/admin/ProductList.js";
import NewProduct from "./component/admin/NewProduct";
import UpdateProduct from "./component/admin/UpdateProduct.js";
import OrderList from "./component/admin/OrderList.js";
import ProcessOrder from "./component/admin/ProcessOrder.js";
import UserList from './component/admin/UserList';
import UpdateUser from './component/admin/UpdateUser';
import ProductReviews from './component/admin/ProductReviews';
import NotFound from './component/layout/NotFound';

function App() {
  const {user,isAuthenticated} = useSelector(state=>state.user);
  
  const [stripeApiKey,setSrtripeApiKey]=useState("");

  async function getStripeApiKey(){
    console.log("yha aa gya")
    const {data} = await axios.get("/api/v1/stripeapikey");

    setSrtripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    Webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    
  store.dispatch(loadUser())
    getStripeApiKey();
}, []);

  window.addEventListener("contextmenu",(e)=>e.preventDefault());
  return (
    <Router>
      <Header/>

      {isAuthenticated && <UserOptions user={user}/>}
      
      {stripeApiKey &&(
                <Elements stripe={loadStripe(stripeApiKey)}>
                <ProtectedRoute exact path="/process/payment" component={Payment}/>
                </Elements>
        )}
      
      <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/product/:id" component={ProductDetails}/>
      <Route exact path="/products" component={Products}/>
      <Route path="/products/:keyword" component={Products}/>
      <Route exact path="/search" component={Search}/>
      <ProtectedRoute exact path="/account" component={Profile}/>
      <ProtectedRoute exact path="/me/update" component={UpdateProfile}/>
      <ProtectedRoute exact path="/password/update" component={UpdatePassword} />
      <Route 
        exact
        path="/password/forgot"
        component={ForgotPassword}
      />
      <Route exact path="/password/reset/:token" component={ResetPassword}/>
      <Route exact path="/login" component={LoginSignUp}/>
      <Route exact path="/cart" component={Cart}/>
      <ProtectedRoute exact path="/shipping" component={Shipping}/>
      
        
        <ProtectedRoute exact path="/success" component={OrderSuccess}/>
        
        <ProtectedRoute exact path="/orders" component={MyOrders}/>
        
        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder}/>
        <ProtectedRoute exact path="/order/:id" component={OrderDetails}/>    
            
        <ProtectedRoute isAdmin={true} exact path="/admin/dashboard" component={Dashboard}/>
        <ProtectedRoute isAdmin={true} exact path="/admin/products" component={ProductList}/>
        <ProtectedRoute isAdmin={true} exact path="/admin/product" component={NewProduct}/>
        <ProtectedRoute isAdmin={true} exact path="/admin/product/:id" component={UpdateProduct}/>
        
        <ProtectedRoute isAdmin={true} exact path="/admin/orders" component={OrderList}/>
        
        <ProtectedRoute isAdmin={true} exact path="/admin/users" component={UserList}/>
        <ProtectedRoute isAdmin={true} exact path="/admin/order/:id" component={ProcessOrder}/>
        <ProtectedRoute isAdmin={true} exact path="/admin/user/:id" component={UpdateUser}/>
        <ProtectedRoute isAdmin={true} exact path="/admin/reviews" component={ProductReviews}/>
        <Route  
          component={
            window.location.pathname==="/process/payment" ? null :NotFound
          }
        />
        </Switch>
        <Footer/>
    </Router>
  );
}

export default App;
