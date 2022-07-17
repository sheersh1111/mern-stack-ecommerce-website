import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux"
import Product   from "./ProductCard.js"
import MetaData from "../layout/MetaData.js";
import { clearErrors, getProduct } from "../../actions/productAction.js";
import "./Home.css"
import Loader from "../layout/Loader/Loader.js";
import { useAlert } from "react-alert";
// const product = {
//     name: "Blue Shirt",
//     images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
//     price: "$300",
//     _id: "sheersh"
// };
const Home = () => {
    const alert=useAlert();
    const dispatch = useDispatch();
    const { loading,error,products} = useSelector((state) => state.products);

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    }, [dispatch,error,alert]);

    return (
        <Fragment>
            {loading ? <Loader/>:
            <Fragment>
            <MetaData title="Home Page is Working" />
            <div className="banner">
                <p>Welcome to Ecommerce</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>
                <a href="#container">
                    <button>
                        Scroll <CgMouse />
                    </button>
                </a>
            </div>
            <div className="homeHeading">Featured Products</div>
            <div className="container" id="container">
                {products && products.map((product) => (<Product product={product} />
                ))}
            </div>
        </Fragment>
        }
        </Fragment>
    )
}
export default Home;