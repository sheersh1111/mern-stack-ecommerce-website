import React from "react";
import { Link } from "react-router-dom";
import "./notFound.css"

const NotFound=()=>{
    return(
        <div className="notFound">
            <p>!</p>
            <h1>Page not found</h1>
            <Link to="/"><button className="notFoundButton">Home</button></Link>
        </div>
    )
}
export default NotFound;