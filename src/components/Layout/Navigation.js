import { Link } from 'react-router-dom';
import classes from './Navigation.module.css';

const Navigation = (props) => {
 
const clearToken = () => {
 // localStorage.getItem('idToken');
 localStorage.removeItem("idToken");
 };

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>Email Box</div>
      </Link>
      <nav>
        <ul>
        <ul><li>
            <Link to='/Signup'>Sign Up</Link>
          </li>
          <li>
            <Link to='/Login'>Login</Link>
          </li></ul>
          <li>
            <button onClick={clearToken}>
              <Link to="/Login">Logout</Link>
              </button>
              </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;