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
import  {getAllUsers,clearErrors, deleteUser} from "../../actions/userAction"
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UserList=()=>{
    const dispatch=useDispatch();
    const history=useHistory();
    const alert= useAlert();
    const {error,users}=useSelector(state=>state.allUsers);

    const {error:deleteError,isDeleted,message}=useSelector(
        state=>state.profile
    );
    const deleteUserHandler=(id)=>{
        dispatch(deleteUser(id));
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
            alert.success(message);
            history.push("/admin/users");
            dispatch({type:DELETE_USER_RESET});
        }
        dispatch(getAllUsers());

    },[dispatch,alert,error,deleteError,history,isDeleted,message])

    const columns=[
        {field:"id",headerName:"User ID",minWidth:200 ,flex:0.5},
        {
            field:"email",
            headerName:"Email",
            minWidth:350,
            flex:0.7
        },
        {
            field:"name",
            headerName:"Name",
            minWidth:150,
            flex:0.3
        },
        {
            field:"role",
            headerName:"Role",
            type:"number",
            minWidth:100,
            flex:0.5,
            cellClassname:(params)=>{
                return (params.getValue(params.id,"role")==="admin"
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
                        <Link to={`/admin/user/${params.getValue(params.id,"id")}`}>
                            <EditIcon/>
                        </Link>
                        <Button onClick={((e)=>deleteUserHandler(params.getValue(params.id,"id")))}>
                            <DeleteIcon/>
                        </Button>
                    </Fragment>
                )
            }
        }
    ]
    const rows=[];
    let len = users.length;
    console.log(len);
    for(let i=0;i<len;i++){
        rows.push({
            id:users[i]._id,
            role:users[i].role,
            email:users[i].email,
            name:users[i].name
        })
    }
    console.log(rows);

        

    return(
        <Fragment>
            <MetaData title={`All Users --Admin`} />
            <div className="dashboard">
                <Sidebar/>
                <div className="productListContainer">
                    <h1 id="productListHeading">All USERS</h1>
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
export default UserList;