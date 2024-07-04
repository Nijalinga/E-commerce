import React, { useState } from 'react'
import './CSS/LoginSinup.css'
// import { response } from 'express';

const LoginSinup = () => {

 const [state,setState]= useState("Login");
 const [formData,setformData]= useState({
   username:"",
   password:"",
   email:"",
 })

 const changeHandler =(e) =>{
  setformData({...formData,[e.target.name]:e.target.value})
 }

 const login = async()=>{
  console.log("Login function Executed",formData);
  let responseData;
  await fetch('https://shopper-niju-backend.onrender.com',{
    method:'POST',
    headers:{
      Accept:'application/form-data',
      'Content-Type':'application/json',
    },
    body:JSON.stringify(formData)
  }).then((response)=>response.json()).then((data)=>responseData=data)
  if(responseData.success){
    localStorage.setItem('auth-token',responseData.token);
    window.location.replace("/");
  }
  else{
    alert(responseData.errors)
  }
 
 }

 const signup = async()=>{
  console.log("signup function Executed",formData);
  let responseData;
  await fetch('https://shopper-niju-backend.onrender.com',{
    method:'POST',
    headers:{
      Accept:'application/form-data',
      'Content-Type':'application/json',
    },
    body:JSON.stringify(formData)
  }).then((response)=>response.json()).then((data)=>responseData=data)
  if(responseData.success){
    localStorage.setItem('auth-token',responseData.token);
    window.location.replace("/");
  }
  else{
    alert(responseData.errors)
  }
 }
 

  return (
    <div className='loginsinup'>
      <div className="loginsinup-container">
        <h1>{state}</h1>
      <div className="loginsinup-fields">
       {state==="Sign Up"?<input name="username" value={formData.username} onChange={changeHandler} type='text' placeholder='Your Name' />:<></>} 
        <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
        <input  name='password' value={formData.password} onChange={changeHandler} type="passsword" placeholder='Password' />
        </div>
        <button onClick={()=>{state=="Login"?login():signup()}}>Continue</button>
        {state=="Sign Up"
        ?<p className='loginsinup-login'>Alreddy have an account?<span onClick={()=>{setState("Login")}}>Login here</span></p>
        :<p className='loginsinup-login'>Create an account?<span onClick={()=>{setState("Sign Up")}}>Click here</span></p>}

      
        <div className="loginsinup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing , i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
      
    </div>
  )
}

export default LoginSinup
