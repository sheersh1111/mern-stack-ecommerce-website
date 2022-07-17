import React, { Fragment } from "react";
import { FaCheckCircle } from "react-icons/fa";
import "./OrderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const OrderSuccess= ()=>{
    return(
        <Fragment>
            <div className="orderSuccess">
                <FaCheckCircle/>
                <Typography>Your Order has been Placed</Typography>
                <Link to="/orders">View Orders</Link>
            </div>
        </Fragment>
    )
}
export default OrderSuccess;