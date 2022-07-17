import React, { Fragment, useState, useEffect } from "react";
import "./UpdatePassword.css";
import Loader from "../layout/Loader/Loader";
// import { FaLockOpen } from "react-icons/fa";
// import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
// import MailOutlineIcon from "@material-ui/icons/MailOutline";
// import LockOpenIcon from "@material-ui/icons/LockOpen";
// import FaceIcon from "@material-ui/icons/Face";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import { updatePassword, clearErrors } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey"



const UpdatePassword=()=>{

    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();
    // const { user } = useSelector(state => state.user);
    const { error, isUpdated, loading } = useSelector(state => state.profile);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // const [avatar, setAvatar] = useState();
    // const [avatarPreview, setAvatarPreview] = useState("https://adrp.memberclicks.net/assets/Events/2020_Virtual_Event/Design/Missing_Photo-01.png");

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(updatePassword(myForm));
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Profile Updated Successfully");

            history.push("/account");
            dispatch({
                type: UPDATE_PASSWORD_RESET
            });
        }
    }, [dispatch, alert, error,  isUpdated, history])


    return(
<Fragment>
    {loading ? <Loader/>:
            <Fragment>
            <MetaData title="Change Password"/>
            <div className="updatePasswordContainer">
                <div className="updatePasswordBox">
                    <h2>Update Password</h2>
                    <form
                        className="updatePasswordForm"
                        // encType="multipart/form-data"
                        onSubmit={updatePasswordSubmit}
                    >
                   <div className="signUpPassword">
                        <VpnKeyIcon/>
                        <input
                            type="password"
                            placeholder="Old Password"
                            required
                            name="oldPassword"
                            value={oldPassword}
                            onChange={(e)=>setOldPassword(e.target.value)}
                        />
                    </div>
                   <div className="signUpPassword">
                        <LockOpenIcon/>
                        <input
                            type="password"
                            placeholder="New Password"
                            requireds
                            name="newPassword"
                            value={newPassword}
                            onChange={(e)=>setNewPassword(e.target.value)}
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
                            value="Change"
                            className="updatePasswordBtn"
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
export default UpdatePassword;