import React,{Fragment,useEffect} from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductList.css";
import { useSelector,useDispatch } from "react-redux";

import { Link, useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Sidebar";
import { deleteOrder, getAllOrders ,clearErrors} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrderList=()=>{
    const dispatch=useDispatch();
    const history=useHistory();
    const alert= useAlert();
    const {error,orders}=useSelector(state=>state.allOrders);

    const {error:deleteError,isDeleted}=useSelector(
        state=>state.order
    );
    const deleteOrderHandler=(id)=>{
        dispatch(deleteOrder(id));
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
            alert.success("Order deleted successfully");
            history.push("/admin/orders");
            dispatch({type:DELETE_ORDER_RESET});
        }
        dispatch(getAllOrders());

    },[dispatch,alert,error,deleteError,history,isDeleted])

    const columns=[
        {field:"id",headerName:"Order ID",minWidth:100,flex:0.20},
        {
            field:"status",
            headerName:"Status",
            minWidth:50,
            flex:0.1,
            cellClassname:(params)=>{
                return (params.getValue(params.id,"status")==="Delivered"
                ? "greenColor": "redColor");
            }
        },
        {
            field:"itemsQty",
            headerName:"Items Qty",
            type:"number",
            minWidth:150,
            flex:0.1,
        },
        {
            field:"amount",
            headerName:"Amount",
            type:"number",
            minWidth:150,
            flex:0.1,
        },
        {
            field:"actions",
            flex:0.2,
            headerName:"Actions",
            minWidth:150,
            type:"number",
            sortable:false,
            renderCell:(params)=>{
                return(
                    <Fragment>
                        <Link to={`/admin/order/${params.getValue(params.id,"id")}`}>
                            <EditIcon/>
                        </Link>
                        <Button onClick={((e)=>deleteOrderHandler(params.getValue(params.id,"id")))}>
                            <DeleteIcon/>
                        </Button>
                    </Fragment>
                )
            }
        }
    ]
    const rows=[];
    let len = orders.length;
    console.log(len);
    for(let i=0;i<len;i++){
        rows.push({
            id:orders[i]._id,
            itemsQty:orders[i].orderItems.length,
            amount:orders[i].totalPrice,
            status:orders[i].orderStatus
        })
    }
    console.log(rows);

        

    return(
        <Fragment>
            <MetaData title={`ALL Orders --Admin`} />
            <div className="dashboard">
                <Sidebar/>
                <div className="productListContainer">
                    <h1 id="productListHeading">All Orders</h1>
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
export default OrderList;