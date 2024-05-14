import React from "react";
import "../css/style.css";
import { Link } from "react-router-dom";
import image1 from "../images/image1.jpg";
const Main = () => {
  
  return (
    <>
      <div className="body1">
        <div className="nav">
          <div className="head">
            <h2>AGRI MARKETING</h2>
          </div>
          <ul>
            <li>Home</li>
            <li>Service</li>
            <li>Contact Us</li>
            <li>About Us</li>
          </ul>
          <div className="btn-main">
            <Link to="./login" className="btn1-main">
              Sign In
            </Link>
            <Link to="/signup" className="btn2-main">
              Sign Up
            </Link>
          </div>
        </div>
        <section className="section1">
          <div className="write1">
            This <span className="purple">Website</span> is About Renting land , <span className="purple">Connecting LandOwner To Farmers</span>
            <span id="element"></span>
            <br />
          </div>
        </section>
        <section className="section3">
          <div className="he">Contact Us</div>
          <div className="ff1">
            <div className="ri">
              <p>
                On Instagram -{" "}
                <a href="https://www.instagram.com/" className="re">
                  viewpage
                </a>
              </p>
            </div>
            <div className="ri">
              <p>
                On FaceBook -{" "}
                <a href="https://www.facebook.com/" className="re">
                  viewpage
                </a>
              </p>
            </div>
            <div className="ri">
              <p>
                On LikedIn -{" "}
                <a href="https://www.linkedin.com/feed/" className="re">
                  viewpage
                </a>
              </p>
            </div>
          </div>
        </section>
        <footer>
          <div className="foot">
            Copyright &copy; www.AgriMarketing.com. All rights reserved!
          </div>
        </footer>
      </div>
    </>
  );
};

export default Main;
