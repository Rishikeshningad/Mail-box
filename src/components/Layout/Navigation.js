import { Link } from 'react-router-dom';
import classes from './Navigation.module.css';
import { useSelector } from 'react-redux';
import { authActions } from '../../store/authreducer';
import { useDispatch } from 'react-redux';



const Navigation = (props) => {
const dispatch = useDispatch(); 
const isAuth = useSelector(state => state.auth.isAuthenticated);

const clearToken = () => {
 // localStorage.getItem('idToken');
 localStorage.removeItem("idToken");
 dispatch(authActions.logout);
 window.location.href='/Login';
 };

  return (
    <header className={classes.header}>
     
        <div className={classes.logo}>Mail Box</div>
      
      <nav>
        <ul>
        {!isAuth && <ul><li>
            <Link to='/Signup'>Sign Up</Link>
          </li>
          <li>
            <Link to='/Login'>Login</Link>
          </li></ul>}
         {isAuth && <li>
            <button onClick={clearToken}>
              <Link to="/Login">Logout</Link>
              </button>
              </li>}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;