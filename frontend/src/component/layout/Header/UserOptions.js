import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial,SpeedDialAction} from "@material-ui/lab";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useHistory } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { Backdrop } from "@material-ui/core";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const UserOptions=({user})=>{
    const [open,setOpen] = useState(false);
    const {cartItems} =useSelector((state)=>state.cart);
    const history=useHistory();
    const dispatch=useDispatch();
    const alert=useAlert();
    const options=[
        {icon:<ListAltIcon/>,name:"Orders",func:orders},
        {icon:<PersonIcon/>,name:"Profile",func:account},
        {icon:<ShoppingCartIcon style={{color:cartItems.length>0? "tomato":"unset"}}/>,name:`Cart(${cartItems.length})`,func:cart},
        {icon:<ExitToAppIcon/>,name:"Logout",func:logoutUser},
    ];

    if(user.role==="admin"){
        options.unshift({
            icon:<DashboardIcon/>,
            name:"Dashboard",
            func:dashboard,
        })
    }

    function dashboard(){
        console.log("dashboard me aa gya")
        history.push("/admin/dashboard");
    }
    function orders(){
        history.push("/orders");
    }
    function account(){
        history.push("/account");
    }
    function cart(){
        history.push("/cart");
    }
    function logoutUser(){
        dispatch(logout());
        alert.success("Logout Successfully");
    }


    return(
    <Fragment>
        <Backdrop open={open} style={{zIndex:"10"}} />
        <SpeedDial
            ariaLabel="SpeedDial tooltip example"
            className="speedDial"
            onClose={()=>setOpen(false)}
            onOpen={()=>setOpen(true)}
            open={open}
            style={{zIndex:"11"}}
            direction="down"
            icon={
                <img
                    className="speedDialIcon"
                    src={user.avatar.url ? user.avatar.url : "https://adrp.memberclicks.net/assets/Events/2020_Virtual_Event/Design/Missing_Photo-01.png"}
                    alt="Profile"
                />
            }
        >
            {options.map((item)=>(
                
            <SpeedDialAction 
            key={item.name}
            icon={item.icon} 
            tooltipTitle={item.name}
            tooltipOpen 
            onClick={item.func}/>
            ))}
            </SpeedDial>
        
    </Fragment>
    )
}
export default UserOptions;