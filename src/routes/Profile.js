﻿import { authService } from "fBase";
import React from "react";
import {  redirect, useNavigate } from "react-router-dom";

const Profile = () => {
    // const navigate = useNavigate();
    const onLogOutClick = () =>{
        authService.signOut();
        // navigate("/")
    }
    
    return (
        <>
        <button onClick={onLogOutClick} >Log Out</button>
        </>
    )
};
export default Profile;