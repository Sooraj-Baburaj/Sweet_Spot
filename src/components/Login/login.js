import React , {useState} from 'react';
import './login.css';
import { createUser, LogInUser } from '../../api/userApi';

const Login = () => {
    const [user,setUser] = useState({
        userName: "",
        password: "",
        profile: "https://images.unsplash.com/photo-1635977725886-0aab77b701c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=385&q=80"
    });
    const [error,setError] = useState();

    const userChange = (e) => {
        setUser({...user, userName: e.target.value})
    }
    const passwordChange = (e) => {
        setUser({...user, password: e.target.value})
    }
    const handleCreate = async() => {
        if(user.userName === "" || user.password === "" ){
            setError("Fill Both fields")
        } else {
        await createUser(user)
        .then((res) => {
            console.log(res.data)
            localStorage.setItem("user", JSON.stringify(res.data));
        })
        .catch((err) => console.log(err));

        window.location.reload(false);
    }};
    const handleLogIn = async() => {
        await LogInUser(user)
        .then((res) => {
            if (res.data.message === "User Authorized") {
                localStorage.setItem("user", JSON.stringify(res.data.info));
                window.location.reload(false);
            } else {
                setError(res.data.message)
            }
        })
        .catch((err) => console.log(err))
    }
    return (
        <div className="login">
            <div className="Form">
                <div className="heading">Sign In</div>
                <div className="inputField">
                <input type="text" id="username" placeholder="Enter your UserName" onChange={userChange} />
                <input type="text" id="password" placeholder="Enter your password" onChange={passwordChange} />
                </div>
                <div className="Submit">
                    <div className="buttons">
                    <button className="loginbutton newAcc" onClick={handleCreate}>Create New Account</button>
                    <button className="loginbutton Log" onClick={handleLogIn}>Log In</button>
                    </div>
                    <p>{error}</p>
                </div>
            </div>
        </div>
    )
}

export default Login
