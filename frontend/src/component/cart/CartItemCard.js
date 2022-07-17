import React from "react";
import { Link } from "react-router-dom";
import "./CartItemCard.css";
import { useDispatch } from "react-redux";
import { removeItemsFromCart } from "../../actions/cartAction";

const CartItemCard = ({item})=>{
    const dispatch = useDispatch();

    const deleteCartItems = (id)=>{
        dispatch(removeItemsFromCart(id));
    };

    return(
        <div className="cartItemCard">
            <img src={item.image} alt="ssa"/>
            <div>
                <Link to={`/product/${item.product}`}>{item.name}</Link>
                <span>{`Price : ₹${item.price}`}</span>
                <p onClick={()=>deleteCartItems(item.product)}>Remove</p>
            </div>

        </div>
    )
}
export default CartItemCard;