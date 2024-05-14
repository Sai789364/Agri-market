import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/visit.css'
const Visit = () => {
  const [user, setuser] = useState();
  const [details, setdetails] = useState();
  const [filter, setfilter] = useState([])
  const navigate = useNavigate()
  const handleLogout = ()=>{
    localStorage.removeItem('token')
    navigate('/')
  }
  const getUser = async () => {
    const config = {
      headers: {
        token: localStorage.getItem("token"),
      },
    };
    const { data } = await axios.post(
      "http://localhost:5000/api/auth/getuser",
      "",
      config
    );
    setuser(data);
  };
  const getData = async () => {
    const { data } = await axios.get(
      "http://localhost:5000/api/auth/getallusers"
    );
    setdetails(data);
    setfilter(data.users)
  };
  
  const onChange = (e)=>{
    if(e.target.value === ''){
        setfilter(details.users.filter((d)=>{return d.phone!==user.phone}))
        return
      }
    const filteredResults = details?.users.filter((d)=>{return d.address.includes(e.target.value) && d.phone!==user.phone})
    setfilter(filteredResults)
  }
 
  console.log(details);
  useEffect(() => {
    getUser();
    getData();
  }, []);
  return (
    <div className="main-div">
      <h1 className="text-center">AGRIMARKETING</h1>
      <div className="d-flex flex-row-reverse justify-content-between">
        
        <button className="btn mx-4" onClick={handleLogout}>Logout</button>
        <input placeholder='search for address' type="text" name="search" className="mx-2" style={{width:"450px"}} onChange={onChange}/>
      </div>
      <div className="box-visit d-flex row align-items-center justify-content-center">{filter.filter((d)=>{return d.phone !== user.phone})?.map((d) => {
        return (
          <>
            <div className="card col-sm-6 row gx-5 mx-5 my-5" key={d.phone} style={{ width: "30rem" }}>
              <img src={d?.url} className="card-img-top " style={{height:"450px",width:"800px"}} alt="img" />
              <div className="card-body ">
                <h2 className="card-text">Name:{d.name}</h2>
                <h2 className="card-text">Email:{d.email}</h2>
                <h2 className="card-text">Acres:{d.acres}</h2>
                <h2 className="card-text">Phone No:{d.phone}</h2>
                <p className="card-text">
                  Address:{d.address}
                </p>
              </div>
            </div>
          </>
        ); 
      })}
      </div>
    </div>
  );
};

export default Visit;