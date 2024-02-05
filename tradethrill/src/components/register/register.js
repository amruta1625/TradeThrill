import React, { useState,useEffect } from "react";
import createaccount from './createaccount.png';
import axios from "axios";
import './register.css';
import logotradethrill from '../../logotradethrill.svg'; 
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {auth} = useAuth();
  const userEmailRegex = /^$|^[a-z0-9.]+@[a-z0-9]+\.iitk\.ac\.in$|^[a-z0-9.]+@iitk\.ac\.in$/;
  const userRollRegex = /^$|^[0-9]{5,}|(INT|EXY|K|M|S|Y)[0-9]{4,}$/;
    const [user, setUser] =  useState ({
      name: "",
      email:"",
      rollno: "",
      username:"",
      password:"",
      reEnterPassword:"",

    });

    const [error, setError] = useState({
      nameEmpty:false,
      emailEmpty:false,
      rollnoEmpty: false,
      usernameEmpty:false,
      passwordEmpty: false,
      emailInvalid: false,
      emailUsed: false,
      rollnoInvalid: false,
      passwordDoesntMatch: false
    });

    const [registrationStage, setStage] = useState("not yet submitted");
  
      
    useEffect(() => {
      //   	console.log("Checking for errors...");
      //   	console.log(error);
          setError({
            ...error,
            emailInvalid:!userEmailRegex.test(user.email),
            rollInvalid:!userRollRegex.test(user.rollno),
            passDoesntMatch: !(user.password === user.reEnterPassword)
          });
    }, [user]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic for handling form submission
    };
    const ChangeBG = (e) => {
      const { value } = e.target;
      setUser({
        ...user,
        bg: value,
      });
      setError({...error, bgEmpty: false});
    };
  
    const register = () => {
      const { name, email, rollno, bg, identity, password, reEnterPassword } = user;
      
      let emptyKeys = {};
      for (const key of Object.keys(user)) {
        if (user[key] === "") {
  //     		console.log(key + "Empty");
  //     		console.log(Object.keys(error).indexOf(key+"Empty"));
          emptyKeys[key+"Empty"] = true;
        }
      }
  //     console.log(error);
      setError({...error, ...emptyKeys});
      if (Object.keys(emptyKeys).length > 0) return;
      
      if (password !== reEnterPassword) {
        return;
      }
      
      for (const key of Object.keys(error)) {
        if (error[key]) return;
      }
      console.log(user);
      if (
        name &&
        email &&
        password &&
        rollno &&
        bg &&
        identity &&
        password === reEnterPassword
      ) {
        setStage("pending");
        axios.post("http://localhost:9002/register", user).then((res) => {
          if (res.data.message === "A user already registerd with same email") {
            setError({...error, emailUsed:true});
            setStage("not yet submitted");
            return;
          } else if (res.data.message === "Successfully Registered, Please login now.") {
            setStage("completed");
            // setTimeout(() => {navigate("/login");}, 3000);
          }
          
  //         navigate("/login");
        });
      } else {
  //       alert("invlid input");
      }
      console.log(user);
    };
  
    const handleEnter = (event) => {
      if(event.keyCode === 13){
        document.getElementById("registerButton").click();
      }
    }
    
    const backgroundStyle = {
      backgroundImage: `url(${createaccount})`,
    };

    return (

      <>
      {auth?.user ? (
        <Navigate to={`/${auth.user.identity}`} state={{ from: location }} replace />
      ) : (
        <div className="register">
          {/* ... rest of your code */}
            <div className="background-container" style={backgroundStyle}>
              <div className="logo-container">
                <img src={logotradethrill} alt="logo" className="logotradethrill"/>
                <h2 className="logo-name">TradeThrill</h2>
              </div>
              <div className="create">
                <h1 className="createstatement">
                  Create new <br/> Account
                </h1>
                <h1 className="loginpage">
                  Already registered ? Login
                </h1>
                <h3 className="NameStatement">
                  Please enter your name
                </h3>
                <input type="text" className="inputName" placeholder="Enter Your Name" />
                <h3 className="NameStatement">
                  Please enter Email
                </h3>
                <input type="text" className="inputName" placeholder="Enter Your Name" />
                <h3 className="NameStatement">
                  Please enter password
                </h3>
                <input type="text" className="inputName" placeholder="Enter Your Name" />
                <h3 className="NameStatement">
                  Confirm Password
                </h3>
                <input type="text" className="inputName" placeholder="Enter Your Name" />
                <form onSubmit={handleSubmit}>
          {/* <div className="text-box-container">
            <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Enter your Name" className="text-box" />
          </div> */}
          {/* Add more input fields for other user information */}
                  <button className="button" type="submit">Register</button>
                </form>
              </div>
                
                </div>
                <button
                  className="button"
                  id="registerButton"
                  disabled={registrationStage === "pending"}
                  onClick={register}
                >
                  {registrationStage === "pending" ? "Loading" : "Register"}
                </button>
            </div>
      )}
    </>
      
    );
};

export default Register;