import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/style1.css';
import axios from "axios";
const Signup = () => {
  const navigate = useNavigate()
  const [creds, setcreds] = useState()
  const onChange = (e)=>{
    setcreds({...creds,[e.target.name]:e.target.value})
  }
 
  const handleSubmit = async(e)=>{
    e.preventDefault()
    const fileInput = document.getElementById('upload')
    const file = fileInput.files[0]
    if(!file){
      alert('no image selected ')
    }
    const formdata = new FormData()
    formdata.append('name',creds.name)
    formdata.append('age',creds.age)
    formdata.append('acres',creds.acres)
    formdata.append('email',creds.email)
    formdata.append('phone',creds.phone)
    formdata.append('password',creds.password)
    formdata.append('address',creds.address)
    formdata.append('image',file)
    const {data} = await axios.post('http://localhost:5000/api/auth/signin',formdata)
    if(!data.success){
      alert(data.message)
      setcreds({email:''})
    }
    else{
      navigate('/login')
    }
  }
  return (
    <>
      <div className="container">
        <h1>Welcome to AgriMarketing Website</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            onChange={onChange}
          />
          <input
            type="number"
            name="age"
            id="age"
            placeholder="Enter your Age"
            onChange={onChange}
          />
          <input
            type="number"
            name="acres"
            id="Acres"
            placeholder="Enter how many Acres"
            onChange={onChange}
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            onChange={onChange}
          />
          <input
            type="number"
            name="phone"
            id="phone"
            placeholder="Enter your phone"
            onChange={onChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter the password"
            onChange={onChange}
          />
          <textarea
            name="address"
            id="desc"
            cols="30"
            rows="10"
            placeholder="Address information"
            onChange={onChange}
          ></textarea>
          <input type="file" name="image" id="upload"/>
          <button className="btn" type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Signup;
