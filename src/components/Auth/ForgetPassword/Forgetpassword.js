import React, { useRef, useState } from 'react';
// import { Link } from 'react-router-dom';
import './Forgetpassword.css'
import { NavLink } from 'react-router-dom';

function Forgetpassword() {
  const emailRef = useRef();
  const [error, setError] = useState(null);

  const forgotPasswordHandler = () => {
    setError(null); // Clear any previous error

    fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDtXdLqsAtc17unBasd0M-VjoDNZjDpFvI", {
      method: "post",
      body: JSON.stringify({
        requestType: "PASSWORD_RESET",
        email: emailRef.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("An error occurred while sending reset link.");
        }
      })
      .then((res) => {
        console.log(res);
        // Handle success, show success message to user if needed
      })
      .catch((err) => {
        // Handle error
        setError(err.message);
        console.log("An error occurred:", err.message);
      });
  };

  return (
    <>
    <h1 style={{textAlign:"center"}}>Change your Forget Password</h1>
    <div className='main-Container'>
     <div>
       <label className='lebel1'>Email:-</label>
       <input type='text' id='emailid' ref={emailRef}/>
     </div>
     <div>
        
        <button onClick={forgotPasswordHandler} className='btnSend'>Send Link</button>
     </div>
    </div>
    {error && <p style={{color:"red",textAlign:"center"}}>{error}</p>}
    <p style={{textAlign:"center",fontWeight:"bold"}} >
      <NavLink to='/auth'>
        Allready a User?
        <b style={{color:"red"}}  >Loging</b>
        </NavLink>
    </p>
    </>
  );
}

export default Forgetpassword;
