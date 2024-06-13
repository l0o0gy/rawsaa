// import React from 'react'

// function Login() {
//   return (
//     <div>
//       <h1>login</h1>
//     </div>
//   )
// }

// export default Login
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

  const signupPage = useNavigate()

  const goToSignUpPage=()=>{
    signupPage("/signuppage")
  }

  // const handleSubmitClick = (e) => {
  //   e.preventDefault();
  //   if(signupdata.password === signupdata.confirmPassword) {
  //     sendDetailsToServer()    
  //   } else {
  //     props.showError('Passwords do not match');
  //   }
  // }

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
                <button
                    type="submit" 
                    className="bg-orange-500 w-80 p-2 rounded-md mt-5"
                    // onClick={handleSubmitClick}
                >
                    log in 
                </button>
                </div>
                </div>
            </form>
            <div className="alert alert-success mt-2" style={{display: signupdata.successMessage ? 'block' : 'none' }} role="alert">
                {signupdata.successMessage}
            </div>
            <div className="mt-2 text-center">
                <span>Don't have an account? </span>
                <span className="loginText" onClick={() => goToSignUpPage()}>Sign up here</span> 
            </div>
            
        </div>
        </div>
  )
}

export default Signup

