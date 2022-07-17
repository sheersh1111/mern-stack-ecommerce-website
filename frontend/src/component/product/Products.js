import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import Product from "../Home/ProductCard";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useLocation } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { useHistory } from "react-router-dom";

// import { useParams } from "react-router-dom";
const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
]


const Products = () => {
    const history = useHistory();
    let [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [ratings, setRatings] = useState(0);
    const [category, setCategory] = useState("");
    // console.log(price);
    const location = useLocation();
    let keyword1 = location.pathname;

    if(keyword1==="/products"){
        keyword1="/products/"
    }
    let keyword=keyword1.replace("/products/","");
    const alert = useAlert();
    // const keyword = location.pathname.split("/projects/")[1]
    // const { keyword } = useParams();
    // const keyword= match.params.keyword;
    const dispatch = useDispatch();

    const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector(state => state.products)

    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
        // console.log(newPrice);
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword, currentPage, price, category, ratings));
    }, [dispatch, keyword, currentPage, price, category, ratings, alert, error])

    let count = filteredProductsCount;
    //    while(count<(currentPage-1)*resultPerPage){
    //     setCurrentPage(currentPage-1);
    // }
    let i=0;
    while(count< (currentPage-i-1)*resultPerPage){
        setCurrentPageNo(currentPage-1);
        i+=1;
    }

    console.log(currentPage);
    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <MetaData title="PRODUCTS -- ECOMMERCE" />
                <h2 className="productsHeading">Products</h2>
                <div className="products">
                    {products && products.map((product) => (
                        <Product key={product._id} product={product} />
                    ))}
                </div>

                <div className="filterBox">
                    <Typography>Price</Typography>
                    <Slider
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={0}
                        max={25000}
                    />

                    <Typography>Categories</Typography>
                    <ul className="categoryBox">
                        {categories.map((category) => (
                            <li
                                className="category-link"
                                key={category}
                                onClick={() => setCategory(category)}
                            >{category}</li>
                        ))}
                    </ul>
                    <fieldset>
                        <Typography component="legend">Ratings Above</Typography>
                        <Slider
                            value={ratings}
                            onChange={(e, newRatings) => {
                                setRatings(newRatings);
                            }}
                            aria-labelledby="continuous-slider"
                            valueLabelDisplay="auto"
                            min={0}
                            max={5}
                        />
                       

                    </fieldset>

                </div>
                {
                    resultPerPage < count && (
                        <div className="paginationBox">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                prevPageText="prev"
                                firstPageText="1st"
                                lastPageText="Last"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                            />
                        </div>
                    )
                }
            </Fragment>}

        </Fragment>

    )
}
export default Products;