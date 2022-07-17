import React,{Fragment,useEffect} from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductList.css";
import { useSelector,useDispatch } from "react-redux";
import {
clearErrors,
getAdminProducts,
deleteProduct
}from "../../actions/productAction";
import { Link, useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList=()=>{
    const dispatch=useDispatch();
    const history=useHistory();
    const alert= useAlert();
    const {error,products}=useSelector(state=>state.products);

    const {error:deleteError,isDeleted}=useSelector(
        state=>state.product
    );
    const deleteProductHandler=(id)=>{
        dispatch(deleteProduct(id));
        if(isDeleted){
            alert.success("Product Deleted Successfully");
            history.push("/admin/products");
        }
    }

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(deleteError){
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if(isDeleted){
            alert.success("Product deleted successfully");
            history.push("/admin/dashboard");
            dispatch({type:DELETE_PRODUCT_RESET});
        }
        dispatch(getAdminProducts());

    },[dispatch,alert,error,deleteError,history,isDeleted])

    const columns=[
        {field:"id",headerName:"ProductId",minWidth:200 ,flex:0.5},
        {
            field:"name",
            headerName:"Name",
            minWidth:200,
            flex:0.6
        },
        {
            field:"stock",
            headerName:"Stock",
            type:"number",
            minWidth:150,
            flex:0.3
        },
        {
            field:"price",
            headerName:"Price",
            type:"number",
            minWidth:270,
            flex:0.5
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
                        <Link to={`/admin/product/${params.getValue(params.id,"id")}`}>
                            <EditIcon/>
                        </Link>
                        <Button onClick={((e)=>deleteProductHandler(params.getValue(params.id,"id")))}>
                            <DeleteIcon/>
                        </Button>
                    </Fragment>
                )
            }
        }
    ]
    const rows=[];
    let len = products.length;
    console.log(len);
    for(let i=0;i<len;i++){
        rows.push({
            id:products[i]._id,
            stock:products[i].stock,
            price:products[i].price,
            name:products[i].name
        })
    }
    console.log(rows);

        

    return(
        <Fragment>
            <MetaData title={`ALL PRODUCTS --Admin`} />
            <div className="dashboard">
                <Sidebar/>
                <div className="productListContainer">
                    <h1 id="productListHeading">All PRODUCTS</h1>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
        </Fragment>
    )
}
export default ProductList;