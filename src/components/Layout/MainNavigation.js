import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
// import { useContext } from 'react';
// import AuthContext from '../Store/Auth-Context';
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../Store/auth';

const MainNavigation = () => {

  const dispatch=useDispatch()
  // const authCtx=useContext(AuthContext)
 const isAuth=useSelector(state=>state.auth.isAuthentication)
  // const isloggedin=authCtx.isLonggedIn

  const ispremium=useSelector(state=>state.auth.ispremium)

  const longoutHandler=()=>{
  dispatch(authAction.lonout())
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>Expanse Tracker</div>
      </Link>
      <nav>
        <ul>
          {!isAuth&& (
            <li>
            <Link to='/auth'>Login</Link>
          </li>
          )}
         {ispremium && (
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
         
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
