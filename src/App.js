import {React, Fragment} from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "./components/Layout/Layout";
import Email from "./components/Pages/Email";
import Login from "./components/Pages/Login";
import SignUp from "./components/Pages/SignUp";
import Welcome from "./components/Pages/Welcome";


function App() {
 const uiAuth = useSelector(state => state.auth.isAuthenticated);

 return (
    <Fragment>
      <Layout>
        <Switch>
          {!uiAuth && <Fragment> <Route path='*' exact> <Login/> </Route>
          </Fragment>}
          
          {!uiAuth && <Route path='/Signup' > <SignUp/> </Route>}
          

          {uiAuth && <Fragment>
         
          <Route path='/email' > <Email/> </Route>
          <Route path='/welcome'> <Welcome/> </Route>
          </Fragment>}
        </Switch>
      </Layout>
    </Fragment>
  );
}

export default App;