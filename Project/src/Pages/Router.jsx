import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Register from './Register'
import Home from './Home'
import Login from './Login'
// import PersonalArea from "./PersonalArea";
// import NotFound from "./NotFound";

const Router = () => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
    const [currentPage, setCurrentPage] = useState(currentUser ? `/users/${currentUser.id}/home` : "/login");

    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
        setCurrentPage(currentUser ? `/users/${currentUser.id}/home` : "/login");
    }, []);

    return (<>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to={currentPage} />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                 <Route exact path="users/:userId/home" element={<Home />} >personalArea
                    {/* <Route path="personalArea" element={<PersonalArea />} />
                    <Route path="info" element={<UserInfo />} />
                    <Route path="todos" element={<Todos />} />
                    <Route path="posts" element={<Posts />} /> */}
                </Route> 
                {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
        </BrowserRouter>
    </>)
}
export default Router;