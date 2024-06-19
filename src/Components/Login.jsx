
import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar'


function LoginForm(props) {
  const [state , setState] = useState({
    email : "",
    password : "",
    successMessage: null
  })
  const handleChange = (e) => {
    const {id , value} = e.target   
    setState(prevState => ({
        ...prevState,
        [id] : value
    }))
}

const handleSubmitClick = (e) => {
    e.preventDefault();
    const payload={
        "email":state.email,
        "password":state.password,
    }
  }


  const signupPage = useNavigate()

  const goToSignUpPage=()=>{
    signupPage("/signuppage")
  }



  return (
    <div >
      <Navbar/>
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
                        value={state .userName}
                        onChange={handleChange} 
                    /> <br/>
                    
                <div className=" ">
                    <label For="Password">Password</label> <br/>
                    <input type="password" 
                        className="form-control w-80 p-2 rounded-md border-2 border-slate-400 " 
                        id="password" 
                        placeholder="Password"
                        value={state .password}
                        onChange={handleChange} 
                    />
                </div> <br/>
                <button
                    type="submit" 
                    className="bg-orange-500 w-80 p-2 rounded-md mt-5"
                >
                    log in 
                </button>
                </div>
                </div>
            </form>
            <div className="alert alert-success mt-2" style={{display:state .successMessage ? 'block' : 'none' }} role="alert">
                {state .successMessage}
            </div>
            <div className="mt-2 text-center">
                <span>Don't have an account? </span>
                <span className="loginText" onClick={() => goToSignUpPage()}>Sign up here</span> 
            </div>
            
        </div>
        </div>
        </div>
  )
}

export default LoginForm

