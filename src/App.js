import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import ThemeFile from "./util/theme";
import jwtDecode from "jwt-decode";

import home from "./pages/home";
import signup from "./pages/signup";
import login from "./pages/login";
import user from "./pages/user";
import Navbar from "./components/layout/Navbar";
import AuthRoute from "./util/AuthRoute";

//redux
import { Provider } from "react-redux";
import store from "./store/stores";
import { SET_AUTHENTICATED } from "./store/types";
import { logoutUser, getUserData } from "./store/actions/user";

import axios from "axios";

const theme = createMuiTheme(ThemeFile);

axios.defaults.baseURL =
  "https://us-central1-socialapp-9a192.cloudfunctions.net/api";

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Navbar />
        <div className="container">
          <Switch>
            <Route path="/" exact component={home} />
            <AuthRoute path="/signup" exact component={signup} />
            <AuthRoute path="/login" exact component={login} />
            <Route path="/users/:handle" exact component={user} />
            <Route
              exact
              path="/users/:handle/scream/:screamId"
              component={user}
            />
          </Switch>
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
