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
          {!uiAuth && <Route path='/Login' exact> <Login/> </Route>}
          
          {uiAuth && <Fragment>
          <Route path='/SignUp'> <SignUp/> </Route>
          <Route path='/email' exact> <Email/> </Route>
          <Route path='/welcome'> <Welcome/> </Route>
          </Fragment>}
        </Switch>
      </Layout>
    </Fragment>
  );
}

export default App;