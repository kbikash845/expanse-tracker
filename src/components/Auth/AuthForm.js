import { useState, useRef, useContext } from 'react';

import classes from './AuthForm.module.css';
import AuthContext from '../Store/Auth-Context';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authAction } from '../Store/auth';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const dispatch=useDispatch()

  // const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current?.value;

    setIsLogin(true);
    if (!isLogin && enteredPassword !== enteredConfirmPassword) {
      alert("Passwords don't match. Please enter matching passwords.");
      return;
    }

    let url;
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBSGMAK5un8LN-a54LKYZ5hbtSKh4l4gTc';
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBSGMAK5un8LN-a54LKYZ5hbtSKh4l4gTc';
    }

    setLoading(true);
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed';
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        // authCtx.login(data.idToken);
        
      dispatch(authAction.login(data.idToken))
        navigate('/');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

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
          <input type='password' id='password' ref={passwordInputRef} required />
        </div>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input type='password' id='confirmPassword' ref={confirmPasswordInputRef} required />
          </div>
        )}
        <div>
          <button style={{ padding: '8px' }}>{isLogin ? 'Login' : 'Create Account'}</button>
          {isLoading && <p>send request</p>}
          
        </div>
        <Link className={classes.forgot} to="/forgotpassword">Forgot Password ?</Link>
        <div className={classes.actions}>
          <button type='button' className={classes.toggle} onClick={switchAuthModeHandler}>
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};
export default AuthForm;
