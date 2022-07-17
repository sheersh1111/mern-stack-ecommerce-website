import React, { Fragment, useState, useEffect } from "react";
import "./ForgotPassword.css";
import Loader from "../layout/Loader/Loader";
// import { FaLockOpen } from "react-icons/fa";
// import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
// import LockOpenIcon from "@material-ui/icons/LockOpen";
// import FaceIcon from "@material-ui/icons/Face";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import { clearErrors,forgotPassword } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey"

const ForgotPassword=()=>{

    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();
    const { error, message, loading } = useSelector(state => state.forgotPassword);

    const[email,setEmail]=useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("email", email);
        dispatch(forgotPassword(myForm));
    }
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (message) {
            alert.success(message);
        }
    }, [dispatch, alert, error, message])


    return(
        
        <Fragment>
            {loading ? <Loader/>:
            <Fragment>
            <MetaData title="Forgot Password"/>
            <div className="forgotPasswordContainer">
                <div className="forgotPasswordBox">
                    <h2>Forgot Password</h2>
                    <form
                        className="forgotPasswordForm"
                        // encType="multipart/form-data"
                        onSubmit={forgotPasswordSubmit}
                    >
                        <div className="forgotPasswordpEmail">
                            <MailOutlineIcon />
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                name="email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
    
                        </div>
                        <input
                            type="submit"
                            value="Send"
                            className="forgotPasswordBtn"
                            disabled={loading ? true : false}
                            
                        />
                    </form>
    
                </div>
            </div>
        </Fragment>
            }
        </Fragment>
    )
}
export default ForgotPassword;