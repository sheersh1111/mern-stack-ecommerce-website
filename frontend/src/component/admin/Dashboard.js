import React, { useEffect } from "react";
import {getAdminProducts}  from "../../actions/productAction"
import Sidebar from "./Sidebar.js";
import "./Dashboard.css";
import {useDispatch,useSelector} from "react-redux"
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import {Doughnut,Line} from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
import { getAllOrders } from "../../actions/orderAction";
import { getAllUsers } from "../../actions/userAction";

const Dashboard=()=>{
    const dispatch=useDispatch();
    const {products}=useSelector(state=>state.products);
    const {orders} =useSelector(state=>state.allOrders);
    const {users}=useSelector(state=>state.allUsers);
    let outOfStock=0;
    products &&
        products.forEach(item => {
    if(item.stock===0){
        outOfStock+=1;
    }           
        });

        useEffect(()=>{
            dispatch(getAdminProducts());
            console.log("func ke nneeeechhe")
            dispatch(getAllOrders());
            dispatch(getAllUsers());
        },[dispatch]);
    
    ChartJS.register(ArcElement,CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
    
    let totalAmount=0;
    orders && orders.forEach(item=>{
        totalAmount+=item.totalPrice
    })
    
    const lineState={
        labels:["Initial Amount","Amount Earned"],
        datasets:[
            {
                label:"Total Amount",
                backgroundColor:["tomato"],
                hoverBackgroundColor:["rgb(197,72,49)"],
                data:[0,totalAmount],
            },
        ]

    }
    const doughnutState={
        labels:["Out of Stock","Instock"],
        datasets:[
            {
                backgroundColor:["#00A6B4","#6800B4"],
                hoverBackgroundColor:["#4B5000","#35014F"],
                data:[outOfStock,products.length-outOfStock],
            }
        ]
    }
    return(
        <div className="dashboard">
            <Sidebar/>
            <div className="dashboardContainer">
                <Typography component="h1">
                    Dashboard
                </Typography>
                <div className="dashboardSummary">
                    <div>
                        <p>
                            Total Amount <br/> ₹{totalAmount}
                        </p>
                    </div>
                    <div className="dashboardSummaryBox2">
                        <Link to="/admin/products">
                            <p>Product</p>
                            <p>{products && products.length}</p>
                        </Link>
                        <Link to="/admin/orders">
                            <p>Orders</p>
                            <p>{orders && orders.length}</p>
                        </Link>
                        <Link to="/admin/users">
                            <p>Users</p>
                            <p>{users && users.length}</p>
                        </Link>
                    </div>
                </div>
                <div className="lineChart">
                    <Line 
                        data={lineState}/>
                </div>
                <div className="doughnutChart">
                    <Doughnut data={doughnutState}/>
                </div>
            </div>

        </div>
    )
}
export default Dashboard;