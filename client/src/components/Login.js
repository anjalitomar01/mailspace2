import React, { useState } from 'react'
import { NavLink ,useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import "./mix.css"
const Login = () => {

    const [passShow, setPassShow] = useState(false);
    
    const [inpval, setInpval] = useState({
        email: "",
        password: "",
    });

    const history = useNavigate();

    const setVal = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    };


    const loginuser = async(e) => {
        e.preventDefault();

        const { email, password } = inpval;

        if (email === "") {
            toast.error("email is required!", {
                position: "top-center"
            });
        } else if (!email.includes("@")) {
            toast.warning("includes @ in your email!", {
                position: "top-center"
            });
        } else if (password === "") {
            toast.error("password is required!", {
                position: "top-center"
            });
        } else if (password.length < 6) {
            toast.error("password must be 6 char!", {
                position: "top-center"
            });
        } else if (!/(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password)) {
            toast.error("Password must have at least one uppercase letter, one number, and one special character!", {
                position: "top-center"
            });
        }
        
        else {
            // console.log("user login succesfully done");


            const data = await fetch("/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                     email, password
                })
            });

            const res = await data.json();
            //  console.log(res);

            if(res.status === 201){
                localStorage.setItem("usersdatatoken",res.result.token);
                history("/dash")
                setInpval({...inpval,email:"",password:""});
            }else{
                toast.error("Invalid Credentials", {
                    position: "top-center"
                });
            }
        }
    }

    return (
        <>       
  


            
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Welcome Back, Log In</h1>
                        <p>Hi, we are you glad you are back. Please login.</p>
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" value={inpval.email} onChange={setVal} name="email" id="email" placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!passShow ? "password" : "text"} onChange={setVal} value={inpval.password} name="password" id="password" placeholder='Enter Your password' />
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <button className='btn' onClick={loginuser}>Login</button>

                        <div style={{paddingTop:10}} class="error">
                         <button style={{background:"#1a365d",color:"white",fontSize:15,borderRadius:10}} className='btn btn sm'>
                            Login with Google
                         </button>
                         <button style={{background:"#1a365d",color:"white",fontSize:15,borderRadius:10}} className='btn btn sm'>
                          Login with GitHub
                        </button>
          

                        </div>
                        <p>Don't have an Account? <NavLink to="/register">Sign Up</NavLink> </p>
                        <p style={{color:"black",fontWeight:"bold"}}> <NavLink to="/password-reset">Forgot Password </NavLink> </p>
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    )
}

export default Login