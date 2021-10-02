import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import "./App.scss";

import Main from "./components/Main";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import CreatePost from "./components/CreatePost";
import CreatePostForm from "./components/CreatePostForm";
import ShowPost from "./components/ShowPost";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import About from "./components/About";
import Error from "./components/Error";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [auth, setAuth] = useState(false);
  const [url, setUrl] = useState(window.location.href.replace("http://localhost:3000", "").split("/")[1]);
  const [user, setUser] = useState({})

  useEffect(() => {
    console.log(url);
    axios.defaults.withCredentials = true;
    axios
    .get("http://localhost:5000/auth/authenticated")
    .then((res) => {
      setAuth(true)
      setIsLoading(false);
      console.log(res.data);
      setUser(res.data);
    })
    .catch((err) => {
      console.log(err);
      setAuth(false);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div>
        <h1>is loading...</h1>
      </div>
    )
  }
  return (
    <div className="App">
      {auth ? (
        <Router>
          <Navbar userId={user.id} />
          <Switch>
            <Route path="/" exact>
              <CreatePost />
              <Main url={url} user={user} />
            </Route>
            <Route path="/hot" user={user} exact>
              <CreatePost />
              <Main url={url} user={user} />
            </Route>
            <Route path="/fresh" exact>
              <CreatePost />
              <Main url={url} user={user} />
            </Route>
            <Route path="/create-post" exact>
              <CreatePostForm user={user} />
            </Route>
            <Route path="/comments/:id" exact>
              <ShowPost user={user} />
            </Route>
            <Route path="/profiles/:id" exact>
              <Profile user={user} />
            </Route>
            <Route path="/profiles/:id/edit" exact>
              <EditProfile user={user} />
            </Route>
            <Route path="/about" exact>
              <About />
            </Route>
            <Route>
              <Error />
            </Route>
          </Switch>
        </Router>
      ) : (
        <Router>
          <Navbar />
          <Switch>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/register" exact>
              <Register />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
