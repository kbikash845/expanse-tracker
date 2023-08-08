import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import { useContext } from 'react';
import AuthContext from '../Store/Auth-Context';

const MainNavigation = () => {
  const authCtx=useContext(AuthContext)

  const isloggedin=authCtx.isLonggedIn

  const longoutHandler=()=>{
    authCtx.lonout();
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>Expanse Tracker</div>
      </Link>
      <nav>
        <ul>
          {!isloggedin && (
            <li>
            <Link to='/auth'>Login</Link>
          </li>
          )}
         {isloggedin && (
           <li>
           <Link to='/profile'> Update Profile</Link>
         </li>
          )}
          {isloggedin && (
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
