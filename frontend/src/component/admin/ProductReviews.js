import React,{Fragment,useEffect} from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductReviews.css";
import { useSelector,useDispatch } from "react-redux";
import {
clearErrors,
getAllReviews,
deleteReview 
}from "../../actions/productAction";
import {useHistory} from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import DeleteIcon from "@material-ui/icons/Delete";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";
import Star from "@material-ui/icons/Star"
const ProductReviews=()=>{
    const dispatch=useDispatch();
    const history=useHistory();
    const [productId,setProductId]=useState("");
    const alert= useAlert();
    const {error:deleteError,isDeleted,loading}=useSelector(state=>state.review);

    const {error,reviews}=useSelector(
        state=>state.productReviews
    );
    const deleteReviewHandler=(reviewId)=>{
        dispatch(deleteReview(reviewId,productId));
    }
    const productReviewsSubmitHandler=(e)=>{
        e.preventDefault();
        dispatch(getAllReviews(productId));
    }

    useEffect(()=>{
        if(productId.length===24){
            dispatch(getAllReviews(productId));        
        }
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(deleteError){
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if(isDeleted){
            alert.success("Review deleted successfully");
            history.push("/admin/reviews");
            dispatch({type:DELETE_REVIEW_RESET});
        }
    },[dispatch,alert,error,deleteError,history,isDeleted,productId])

    const columns=[
        {field:"id",headerName:"Review ID",minWidth:200 ,flex:0.5},
        
        {
            field:"user",
            headerName:"User",
            minWidth:150,
            flex:0.3
        },
        {
            field:"comment",
            headerName:"Comment",
            minWidth:350,
            flex:1
        },
        {
            field:"rating",
            headerName:"Rating",
            type:"number",
            minWidth:270,
            flex:0.5,
            cellClassname:(params)=>{
                return (params.getValue(params.id,"rating")>=3
                ? "greenColor": "redColor");
            }
        },
        {
            field:"actions",
            flex:0.3,
            headerName:"Actions",
            minWidth:150,
            type:"number",
            sortable:false,
            renderCell:(params)=>{
                return(
                    <Fragment>
                        <Button onClick={((e)=>deleteReviewHandler(params.getValue(params.id,"id")))}>
                            <DeleteIcon/>
                        </Button>
                    </Fragment>
                )
            }
        }
    ]
    const rows=[];
    let len = reviews.length;
    console.log(len);
    for(let i=0;i<len;i++){
        rows.push({
            id:reviews[i]._id,
            comment:reviews[i].comment,
            rating:reviews[i].rating,
            user:reviews[i].name,
        })
    }
    console.log(rows);

        

    return(
        <Fragment>
            <MetaData title={`ALL REVIEWS --Admin`} />
            <div className="dashboard">
                <Sidebar/>
                <div className="productReviewsContainer">

                <form 
                        className="productReviewsForm"
                        encType="multipart/form-data"
                        onSubmit={productReviewsSubmitHandler}
                    >
                        <h1 className="productReviewsFormHeading">All Reviews</h1>
                        <div>
                            <Star/>
                            <input
                                type="text"
                                placeholder="Product Id"
                                required
                                value={productId}
                                onChange={(e)=>setProductId(e.target.value)}
                            />
                        </div>
                        <Button 
                            id="createProductBtn"
                            type="submit"
                            disabled={loading? true:false||productId==="" ? true: false}
                        >Search</Button>
                    </form>{
                        reviews && reviews.length > 0?(
                            
                    <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className="productListTable"
                    autoHeight
                />
                        ) :(
                            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
                        )
                    }
                </div>
            </div>
        </Fragment>
    )
}
export default ProductReviews;