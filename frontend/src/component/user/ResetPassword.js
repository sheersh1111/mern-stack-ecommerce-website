import React, { Fragment, useState, useEffect } from "react";
import "./ResetPassword.css";
import Loader from "../layout/Loader/Loader";
// import { FaLockOpen } from "react-icons/fa";
// import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
// import MailOutlineIcon from "@material-ui/icons/MailOutline";
// import LockOpenIcon from "@material-ui/icons/LockOpen";
// import FaceIcon from "@material-ui/icons/Face";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import { resetPassword, clearErrors } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey"
import { useLocation } from "react-router-dom";
const ResetPassword=()=>{

    
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();
    const location= useLocation();
    let token1 = location.pathname;

    if(token1==="/products"){
        token1="/products/"
    }
    let token=token1.replace("/products/","");

    // const { user } = useSelector(state => state.user);
    const { error, success, loading } = useSelector(state => state.forgotPassword);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // const [avatar, setAvatar] = useState();
    // const [avatarPreview, setAvatarPreview] = useState("https://adrp.memberclicks.net/assets/Events/2020_Virtual_Event/Design/Missing_Photo-01.png");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(resetPassword(token,myForm));
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Password Updated Successfully");

            history.push("/login");

        }
    }, [dispatch, alert, error, token, success, history])

    return(
        <Fragment>
            {loading ? <Loader/>:
                    <Fragment>
                    <MetaData title="Change Password"/>
                    <div className="resetPasswordContainer">
                        <div className="resetPasswordBox">
                            <h2>Reset Password</h2>
                            <form
                                className="resetPasswordForm"
                                // encType="multipart/form-data"
                                
                            >
                           <div className="signUpPassword">
                                <VpnKeyIcon/>
                                <input
                                    type="password"
                                    placeholder="Old Password"
                                    required
                                    name="password"
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                            </div>
                           <div className="signUpPassword">
                                <LockIcon/>
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    required
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e)=>setConfirmPassword(e.target.value)}
                                />
                            </div>
                                <input
                                    type="submit"
                                    value="Update"
                                    className="resetPasswordBtn"
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
export default ResetPassword;