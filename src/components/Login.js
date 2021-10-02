import { useState } from "react";
import axios from "axios";
import "../styles/Login.scss";
import "../styles/container.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const clickHandler = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:5000/auth/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.data.msg) {
          console.log(res.data);
          setError(res.data.msg);
          return;
        }
        window.location.href = "http://localhost:3000/";
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="Login container">
      <h1>Login</h1>
      <input
        type="text"
        name="email"
        id="email"
        placeholder="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={clickHandler}>submit</button>
      {error !== "" && (
        <p className="error">
          <b>Error: </b>
          {error}
        </p>
      )}
      <p>
        or register <a href="/register"><u>here</u></a>
      </p>
    </div>
  );
};

export default Login;
