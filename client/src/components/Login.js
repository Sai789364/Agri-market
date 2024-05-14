import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/App.css";
import axios from 'axios'
const Login = () => {
  const navigate = useNavigate()
  const [creds, setcreds] = useState()
  const handleSubmit = async(e)=>{
    e.preventDefault()
    const values = {
      email:creds.email,
      password:creds.password
    }
    const {data} = await axios.post('http://localhost:5000/api/auth/login',values);
    console.log(data);
    if(!data.success){
      alert(data.message)
    }
    else{
      navigate('/visit')
      localStorage.setItem('token',data.token)
    }
  }
  const onChange = (e)=>{
    setcreds({...creds,[e.target.name]:e.target.value})
  }
  return (
    <>
      <div className="container2">
        <div className="container1">
          <h1>LogIn</h1>
          <form onSubmit={handleSubmit}>
            <div className="box">
              <i className="fa fa-envelope"></i>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter the Email"
                onChange={onChange}
              />
            </div>
            <div className="box">
              <i className="fa fa-key"></i>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter the Password"
                onChange={onChange}
              />
            </div>
            <button className="btn-login" type="submit">Sign In</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
