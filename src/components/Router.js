import React, { useState } from "react";
import {HashRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Navigation from "./Navication";
import Profile from "routes/Profile";


const AppRouter = ({isLoggedIn, userObj}) => {
    console.log(userObj);

    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Routes>
                {isLoggedIn ? (
                    <>
                    <Route exact path="/" element ={<Home userObj={userObj}/> }/>
                    <Route exact path="/profile" element ={<Profile/> }/>
                    </>
                ) : (
                    <>
                    <Route exact path="/" element ={<Auth/> }/>
                    <Route path="*" element={<Navigate replace to="/"/>}/>
                    </>
                )
                
                }
                
            </Routes>
        </Router>
    )
}
export default AppRouter;