import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
function Login() {

    const navigate = useNavigate();
    const { setCurrentUser } = useContext(UserContext);
    function loginFunc(event) {
        event.preventDefault();
        let userName = event.target[0].value;
        let password = event.target[1].value;
        console.log(userName)
        fetch(`http://localhost:8080/access?UserName=${userName}`)
            .then(response => response.json())
            .then(response => response.length === 0 ? alert("No such user. Please register") : successLogin(response[0]))
            .catch(error => console.error("Error during login:", error));
    }
    
    function successLogin(user) {
        delete user["website"];
        localStorage.setItem("User", [JSON.stringify(user)])
        setCurrentUser(user)
        navigate(`/users/${user.id}/home`)
    }

    return (<>
        <>Welcome to our Website</>
        <form onSubmit={loginFunc}>
            <p>UserName</p>
            <input placeholder="Enter UserName..." required></input><br />
            <p >Password</p>
            <input type="password" placeholder="Enter Pasword..." required></input><br /><div />
            <button type="submit">Login</button>
        </form>
        <h3>To register click </h3>
        <Link to={"/register"}> Here</Link>
    </>)
} export default Login