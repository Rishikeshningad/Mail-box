import { React, Fragment, useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "./components/Layout/Layout";
import Email from "./components/Pages/Email";
import Login from "./components/Pages/Login";
import SignUp from "./components/Pages/SignUp";
import Welcome from "./components/Pages/Welcome";


function App() {
  
  const uiAuth = useSelector((state) => state.auth.isAuthenticated);
  

  return (
    <Fragment>
      <Layout>
        <Switch>
          {!uiAuth && (
            <>
              <Route path="/login" exact>
                <Login/>
              </Route>

              <Route path="/signup">
                <SignUp/>
              </Route>

              <Route path="/email">
                <Email />
              </Route>
            </>
          )}

          {uiAuth && (
          
              <Route path="/welcome">
                <Welcome />
              </Route>
            )}

          </Switch>
      </Layout>
    </Fragment>
  );
}

export default App;
