// import { createStore, combineReducers, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
import productReducer, { newProductReducer, newReviewReducer, productDetailsReducer, productReviewsReducer, reviewReducer }  from "./reducers/productReducer";
import {configureStore} from "@reduxjs/toolkit"
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import localStorage from "localStorage";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./reducers/orderReducer";
import productsReducer from "./reducers/productReducer";


let initialState = {
    cart:{
        cartItems:localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            :[],
        shippinginfo:localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        :{},
    },
};

// const middleware = [thunk];

const store = configureStore({
    reducer: {
        products: productsReducer,
        productDetails:productDetailsReducer,
        user:userReducer,
        profile:profileReducer,
        forgotPassword:forgotPasswordReducer,
        cart:cartReducer,
        newOrder:newOrderReducer,
        myOrders:myOrdersReducer,
        orderDetails:orderDetailsReducer,
        newReview:newReviewReducer,
        newProduct:newProductReducer,
        product:productReducer,
        allOrders:allOrdersReducer,
        order:orderReducer,
        allUsers:allUsersReducer,
        userDetails:userDetailsReducer,
        productReviews:productReviewsReducer,
        review:reviewReducer,
    },preloadedState:initialState,
});

export default store;

