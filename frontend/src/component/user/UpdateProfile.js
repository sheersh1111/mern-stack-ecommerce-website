import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
// import { FaLockOpen } from "react-icons/fa";
// import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
// import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import { updateProfile, clearErrors, loadUser } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();
    const { user } = useSelector(state => state.user);
    const { error, isUpdated, loading } = useSelector(state => state.profile);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("https://adrp.memberclicks.net/assets/Events/2020_Virtual_Event/Design/Missing_Photo-01.png");

    const updateProfileSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm));
    }

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    }

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Profile Updated Successfully");
            dispatch(loadUser());

            history.push("/account");
            dispatch({
                type: UPDATE_PROFILE_RESET
            });
        }
    }, [dispatch, alert, error, user, isUpdated, history])




    return (
        <Fragment>
            {loading ? <Loader/>:
            <Fragment>
            <MetaData title="Update Profile"/>
            <div className="updateProfileContainer">
                <div className="updateProfileBox">
                    <h2>Update Profile</h2>
                    <form
                        className="updateProfileForm"
                        encType="multipart/form-data"
                        onSubmit={updateProfileSubmit}
                    >
                        <div className="updateProfileName">
                            <FaceIcon />
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                name="name"
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                            />
                        </div>
                        <div className="updateProfilepEmail">
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
                        <div id="updateProfileImage">
                            <img src={avatarPreview} alt="Avatar Preview" />
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={updateProfileDataChange}
    
                            />
                        </div>
                        <input
                            type="submit"
                            value="Update"
                            className="updateProfileBtn"
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
export default UpdateProfile;   