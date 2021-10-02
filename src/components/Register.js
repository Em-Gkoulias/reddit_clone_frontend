import { useState } from "react";
import axios from "axios";
import "../styles/Register.scss";
import "../styles/container.scss"

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")

  const clickHandler = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:5000/auth/register", {
        username,
        email,
        password,
      })
      .then((res) => {
        if (res.data.msg) {
          console.log(res.data.msg);
          setError(res.data.msg)
          return;
        }
        window.location.href = "http://localhost:3000/login";
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="Register container">
      <h1>Register</h1>
      <input
        type="text"
        name="username"
        id="username"
        value={username}
        placeholder="username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        placeholder="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        placeholder="password"
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
        or login <a href="/login"><u>here</u></a>
      </p>
    </div>
  );
};

export default Register;
