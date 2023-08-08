import { useState, useRef, useContext } from 'react';

import classes from './AuthForm.module.css';
import AuthContext from '../Store/Auth-Context';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading,setLoading]=useState(false);

  const authCtx=useContext(AuthContext);
  const navigate=useNavigate()

  const emailInputRef=useRef();
  const psswordInputRef=useRef();
  const confirmpasswordInputRef=useRef();
  

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  
  const submitHandler=(event)=>{
       event.preventDefault();
       const enterEmail=emailInputRef.current.value;
       const enterPassword=psswordInputRef.current.value;
       const enterConfirmpasswrd=confirmpasswordInputRef.current.value;

      

       setIsLogin(true)
       if(enterPassword===enterConfirmpasswrd){
         let url;
       if(isLogin){
        url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDGVs8K9GjoYUE4P9xUCh0Fg1KAy4cR97U"
       }else{
        url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDGVs8K9GjoYUE4P9xUCh0Fg1KAy4cR97U'
    
       }
       fetch(
        url,
       {
         method:"POST",
         body:JSON.stringify({
           email:enterEmail,
           password:enterPassword,
           returnSecureToken:true,
         }),
         headers:{
          'Content-Type': 'application/json'
         }
       }
       ).then(res=>{
         setLoading(false)
         if(res.ok){
          return res.json()
         }else{
           return res.json().then((data=>{
             let errormassage="Authentication failed";
            // if(data && data.error && data.error.message){
            //  errormassage=data.error.message
            // }
    
              throw new Error(errormassage)
           }))
    
         }
       }).then((data)=>{
        console.log(data);
        authCtx.login(data.idToken)
        navigate("/")
       }).catch((err)=>{
        alert(err.message)
       })
    

       }else{
        alert("pasword is not match ..plsease correct password")
       }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            ref={psswordInputRef}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='Confirmpassword'>Confirm Password</label>
          <input
            type='password'
            id='Confirmpassword'
            ref={confirmpasswordInputRef}
            required
          />
        </div>
        <div>
       <button style={{padding:"8px"}}>{isLogin ? "Login" : "Create Account"}</button>
       { isLoading &&<p>send request</p>}
        </div>
        <div className={classes.actions}>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
