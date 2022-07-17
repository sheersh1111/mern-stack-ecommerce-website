import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartConstants";
import axios from "axios";
import loacalStorage from "localStorage";
import store from "../store"

//Add to Cart
export const addItemsToCart =(id,quantity)=> async(dispatch)=>{
    
        const {data}= await axios.get(`/api/v1/admin/products/${id}`)
    dispatch({
        type:ADD_TO_CART,
        payload:{
            product:data.product._id,
            name:data.product.name,
            price:data.product.price,
            image:data.product.images[0].url,
            stock:data.product.stock,
            quantity,
        }
    });
loacalStorage.setItem("cartItems",JSON.stringify(store.getState().cart.cartItems));
};
//Remove from CArt
export const removeItemsFromCart = (id) => async(dispatch)=>{
    dispatch({
        type:REMOVE_CART_ITEM,
        payload:id,

    });
    loacalStorage.setItem("cartItems",JSON.stringify(store.getState().cart.cartItems));
};
//save shipping info
export const saveShippingInfo=(data) =>async(dispatch)=>{
    dispatch({
        type:SAVE_SHIPPING_INFO,
        payload:data
    });
    localStorage.setItem("shippingInfo",JSON.stringify(data));
};