import {React, Fragment} from "react";
import { Route, Switch } from "react-router-dom";


import Layout from "./components/Layout/Layout";
import Email from "./components/Pages/Email";
import Login from "./components/Pages/Login";
import SignUp from "./components/Pages/SignUp";
import Welcome from "./components/Pages/Welcome";


function App() {
 return (
    <Fragment>
      <Layout>
        <Switch>
          <Route path='/Login' exact> <Login/> </Route>
          <Route path='/SignUp'> <SignUp/> </Route>
          <Route path='/email'> <Email/> </Route>
          <Route path='/welcome'> <Welcome/> </Route>
        </Switch>
      </Layout>
    </Fragment>
  );
}

export default App;