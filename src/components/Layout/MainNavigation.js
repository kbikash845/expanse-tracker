import { Link,  useNavigate } from 'react-router-dom';

import classes from './MainNavigation.module.css';
// import { useContext } from 'react';
// import AuthContext from '../Store/Auth-Context';
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../Store/auth';

const MainNavigation = () => {


  const navigate=useNavigate()
  const dispatch=useDispatch()
  // const authCtx=useContext(AuthContext)
 const isAuth=useSelector(state=>state.auth.isAuthentication)
  // const isloggedin=authCtx.isLonggedIn

  const ispremium=useSelector(state=>state.auth.ispremium)

  const longoutHandler=()=>{
  dispatch(authAction.lonout())
  localStorage.removeItem("email")
  navigate("/auth")
  

  
  }

  const expanseTrackeHandler=()=>{
    if(!isAuth){
      alert("loging first")
      
      navigate('/auth')
    }
    
  }
  return (
    <header className={classes.header}>
      <Link to='/dashboard'>
        <div className={classes.logo}  onClick={expanseTrackeHandler}>Expanse Tracker</div>
      </Link>
      <nav>
        <ul>
          {!isAuth && (
            <li>
            <Link to='/auth'>Login</Link>
          </li>
          )}
         {ispremium && isAuth && (
           <li>
           <Link to='/profile'> Premium</Link>
         </li>
          )}
          {isAuth && (
           <li>
           <Link to='/profile'> Update Profile</Link>
         </li>
          )}
          {isAuth && (
             <li>
             <button onClick={longoutHandler}>Logout</button>
           </li>
          )}
         <li>
          {/* <Link to="/dash">Dashboard</Link> */}
         </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
