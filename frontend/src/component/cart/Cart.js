import { Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addItemsToCart } from "../../actions/cartAction";
import "./Cart.css";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import CartItemCard from "./CartItemCard.js";
import { useHistory } from "react-router-dom";

const Cart = ()=>{
    const dispatch=useDispatch();
    const {cartItems} = useSelector((state)=>state.cart);
    const history= useHistory();
    const increaseQuantity= (id,quantity,stock)=>{
        const newQty=quantity+1;
        if(stock<=quantity){
            return;
        }        
        dispatch(addItemsToCart(id,newQty));
    }
    const decreaseQuantity= (id,quantity)=>{
        const newQty=quantity-1;
        if(quantity<=1){
            return;
        }        
        dispatch(addItemsToCart(id,newQty));
    }
    const checkoutHandler=()=>{
        history.push("/login?redirect=shipping");
    }


return(
    <Fragment>
        {cartItems.length===0 ? 
         (
            <div className="emptyCart">
                <RemoveShoppingCartIcon/>

                <Typography>No Product in your Cart</Typography>
                <Link to="/products">View Products</Link>
            </div>
         )       
        :
        <Fragment>
        <div className="cartPage">
            <div className="cartHeader">
                <p>Product</p>
                <p>Quantity</p>
                <p>Subtotal</p>
            </div>
        {cartItems && cartItems.map((item)=>(
                        <div className="cartContainer" key={item.product}>
                        <CartItemCard item={item}/>
                        <div className="cartInput">
                            <button onClick={()=>decreaseQuantity(item.product,item.quantity)}>-</button>
                            <input type="number" value={item.quantity} readOnly/>
                            <button onClick={()=>increaseQuantity(item.product,item.quantity,item.stock)}>+</button>
                        </div>
                        <p className="cartSubtotal">{`₹${item.price*item.quantity}`}</p>
                    </div>
        ))}

            <div className="cartGrossProfit">
                <div></div>
                <div className="cartGrossProfitBox">
                    <p>Gross Total</p>
                    <p>{`₹${cartItems.reduce(
                        (acc,item)=>acc+item.quantity*item.price,0
                    )}`}</p>
                </div>
                <div></div>
                <div className="checkOutBtn" onClick={checkoutHandler}>
                    <button>Check Out</button>
                </div>
            </div>
        </div>
    </Fragment>
        }
    </Fragment>
    )
}
export default Cart;