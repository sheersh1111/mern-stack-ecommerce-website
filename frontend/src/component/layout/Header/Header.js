import React from "react";
import {ReactNavbar} from "overlay-navbar";
// import SearchIcon from '@material-ui/icons/Search';
// import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
// import AccountBoxIcon from '@material-ui/icons/AccountBox';
import logo from "./logo.jpg";
import { FaShoppingBag } from "react-icons/fa";
import {FaUserAlt,FaCartArrowDown,FaSearch} from "react-icons/fa"

const options={
        burgerColor:"#eb4034",
        burgerColorHover:"#a62d24",
        // logo:{logo},
        logoWidth:"15vmax",
        navColor1:"rgb(255,255,255)",
        logoHoverSize:"10px",
        logoHoverColor:"#eb4034",
        link1Text:"Home",
        link2Text:"Products",
        link3Text:"Contact",
        link4Text:"About",
        link1Url:"/",
        link2Url:"/products/",
        link3Url:"/contact",
        link4Url:"/about",
        link1Size:"1.3vmax",
        link1Color:"rgba(35,35,35,0.8)",
        nav1justifyContent:"flex-end",
        nav2justifyContent:"flex-end",
        nav3justifyContent:"flex-start",
        link1ColorHover:"#eb4034",
        link1Margin:"3vmax",
        link2Margin:"3vmax",
        link3Margin:"0vmax",
        link4Margin:"6vmax",   
        profileIconColor:"rgba(35,35,35,0.8)",
        searchIconColor:"rgba(35,35,35,0.8)",
        cartIconColor:"rgba(35,35,35,0.8)",
        profileIconColorHover:"#eb4034",
        searchIconColorHover:"#eb4034",
        cartIconColorHover:"#eb4034",
        cartIconMargin:"1vmax",
        profileIconUrl:"/login"
}

const Header =()=>{
    return(
        <ReactNavbar {...options}
        logo={logo}
        profileIcon={true}
        ProfileIconElement={FaUserAlt}
        searchIcon={true}
        searchIconSize="2.4vmax"
        cartIconSize="2.4vmax"
        profileIconMargin="0vmax"
        SearchIconElement={FaSearch}
        cartIcon={true}
        CartIconElement={FaShoppingBag}

        /> 

    )
}
export default Header;