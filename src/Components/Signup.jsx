import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";


function Signup(props) {
  const [signupdata , setSignupdata] = useState({
    userName: "",
    phoneNumber:"",
    email : "",
    password : "",
    confirmPassword: "",
    successMessage: null
})

  const handleChange = (e) => {
    const {id , value} = e.target   
      setSignupdata(prevState => ({
        ...prevState,
        [id] : value
    }))
  }

  const LoginPage = useNavigate()

  const goToLoginPage=()=>{
    LoginPage("/loginpage")
  }



  return (
    <div className="flex justify-center">
      <div className=' bg-zinc-300 mt-10 p-10 rounded-md shadow-lg shadow-black-500/90 '>
            <form>
                <div className="">
                <div className=" ">
                  <label For="userName">User Name</label> <br/>
                    <input type="text" 
                        className="form-control w-80 p-2 rounded-md border-2 border-slate-400" 
                        id="userName" 
                        placeholder="Add User Name"
                        value={signupdata.userName}
                        onChange={handleChange} 
                    /> <br/>
                    <label For="phoneNumber">Phone Number</label> <br/>
                    <input type="number"
                        className="form-control w-80 p-2 rounded-md border-2 border-slate-400" 
                        id="phoneNumber" 
                        placeholder="Add Phone Number"
                        value={signupdata.phoneNumber}
                        onChange={handleChange} 
                    /> <br/>
                </div>
                <label For="email">Email address</label> <br/>
                <input type="email" 
                       className="form-control w-80 p-2 rounded-md border-2 border-slate-400" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="Enter email" 
                       value={signupdata.email}
                       onChange={handleChange}
                /> <br/>
                <small id="emailHelp" className=" text-muted">We'll never share your email with anyone else.</small> <br/>
                </div>
                <div className=" ">
                    <label For="Password">Password</label> <br/>
                    <input type="password" 
                        className="form-control w-80 p-2 rounded-md border-2 border-slate-400 " 
                        id="password" 
                        placeholder="Password"
                        value={signupdata.password}
                        onChange={handleChange} 
                    />
                </div> <br/>
                <div className=" ">
                    <label For="Password">Confirm Password</label> <br/>
                    <input type="password" 
                        className="form-control w-80 p-2 rounded-md border-2 border-slate-400" 
                        id="confirmPassword" 
                        placeholder="Confirm Password"
                        value={signupdata.confirmPassword}
                        onChange={handleChange} 
                    /> <br/>
                </div>
                <button
                    type="submit" 
                    className="bg-orange-500 w-80 p-2 rounded-md mt-5"
                >
                    Sign up 
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: signupdata.successMessage ? 'block' : 'none' }} role="alert">
                {signupdata.successMessage}
            </div>
            <div className="mt-2 text-center">
                <span>Already have an account? </span>
                <span className="loginText" onClick={() => goToLoginPage()}>Login here</span> 
            </div>
            
        </div>
        </div>
  )
}

export default Signup
