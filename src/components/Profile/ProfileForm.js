import React, { useEffect, useRef, useState } from "react";
import classes from './ProfileForm.module.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const ProfileForm = () => {
  const fullNameRef = useRef();
  const urlRef = useRef();
  const [initialName, setInitialName] = useState("");
  const [initialUrl, setInitialUrl] = useState("");

  
        const navigate = useNavigate();

  

  useEffect(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBSGMAK5un8LN-a54LKYZ5hbtSKh4l4gTc",
      {
        method: "POST",
        body: JSON.stringify({
        idToken: localStorage.getItem("token"),
       
        }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        if (response.ok) {
            console.log(response)
          return response.json();
        } else {
          throw new Error("Authentication error");
        }
      })
      .then((res) => {
        console.log(res)
        console.log(res.users[0].displayName);
        setInitialName(res.users[0].displayName);
        setInitialUrl(res.users[0].photoUrl); // set inital values
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateFormDataHandler = (event) => {
    event.preventDefault();
    const nameRefValue = fullNameRef.current.value;
    const urlRefValue = urlRef.current.value;
    console.log(urlRefValue,nameRefValue)
    
    const localStr = localStorage.getItem("token");
    console.log(localStr);
    event.preventDefault();
  
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBSGMAK5un8LN-a54LKYZ5hbtSKh4l4gTc",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localStr,
          displayName: nameRefValue,
          photoUrl: urlRefValue,
          returnSecureToken: true,
        }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log("User details updated successfully");
          // You can navigate to a success page or perform any other action
        } else {
          console.log("User details update failed");
          // Handle the error or display an error message to the user
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log("Error occurred while updating user details", error);
      });
  
    
  };
return (
  <React.Fragment>
     

      <section className="bg-gradient-to-b from-purple-900 via-pink-400 to-purple-900 wd-full  max-w-xl rounded-6 shadow-md py-3 text-center text-white mx-auto my-5 rounded-4 mt-3">
        <h2 className=" flex text-2xl font-bold text-white mb-4 justify-center">Contact Details</h2>
        <form onSubmit={updateFormDataHandler}>
            <div>
          <label htmlFor="name" className="block text-white font-semibold mb-1 mx-0">
          Full Name:
          </label>
          <input
            type="text"
            id='name'
            ref={fullNameRef} defaultValue={initialName}
            className=" w-full max-w-md py-2 px-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-purple-400"
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-white font-semibold mb-1 mx-0 mt-3">
          Profile Photo URL:
          </label>
          <input
            type="text"
            id='profilephoto'
            ref={urlRef} defaultValue={initialUrl}
            className=" w-full max-w-md py-2 px-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-purple-400"
          />
        </div>
        <button
          type="submit"
          className="bg-gradient-to-b from-red-800 via-red-500 to-red-800  hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-purple-400 mt-3"
        >
          Update
        </button>
        </form>
      </section>
   </React.Fragment>
)
}


export default ProfileForm;
