import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "./mix.css";

const Login = () => {
    const [passShow, setPassShow] = useState(false);
    const [inpval, setInpval] = useState({ email: "", password: "" });
    const history = useNavigate();

    const setVal = (e) => {
        const { name, value } = e.target;
        setInpval({ ...inpval, [name]: value });
    };

    const loginuser = async (e) => {
        e.preventDefault();
        const { email, password } = inpval;
        if (!email.includes("@")) {
            toast.warning("Include @ in your email!", { position: "top-center" });
        } else if (password.length < 6) {
            toast.error("Password must be at least 6 characters!", { position: "top-center" });
        } else {
            const data = await fetch("/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const res = await data.json();
            if (res.status === 201) {
                localStorage.setItem("usersdatatoken", res.result.token);
                history("/dash");
                setInpval({ email: "", password: "" });
            } else {
                toast.error("Invalid Credentials", { position: "top-center" });
            }
        }
    };

    return (
        <section className="login-container">
            {/* GIF on Left Side */}
            <div className="gif-container">
                <img src="/17644534.gif" alt="Login Animation" />
            </div>

            {/* Login Form */}
            <div className="form_data">
                <div className="form_heading">
                    <h1>Welcome Back, Log In</h1>
                    <p>Hi, we are glad you are back. Please login.</p>
                </div>

                <form>
                    <div className="form_input">
                        <label htmlFor="email">Email</label>
                        <input type="email" value={inpval.email} onChange={setVal} name="email" id="email" placeholder="Enter Your Email Address" />
                    </div>

                    <div className="form_input">
                        <label htmlFor="password">Password</label>
                        <div className="two">
                            <input type={!passShow ? "password" : "text"} onChange={setVal} value={inpval.password} name="password" id="password" placeholder="Enter Your Password" />
                            <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                {!passShow ? "Show" : "Hide"}
                            </div>
                        </div>
                    </div>

                    <button className="btn" onClick={loginuser}>Login</button>
                    <p>Don't have an account? <NavLink to="/register">Sign Up</NavLink></p>
                    <p><NavLink to="/password-reset">Forgot Password?</NavLink></p>
                </form>
                <ToastContainer />
            </div>
        </section>
    );
};

export default Login;
