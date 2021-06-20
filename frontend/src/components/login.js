import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { LoginContext } from "./../context/login";
import axios from "axios";
import { setToken } from "./../reducer/login";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const disPatch = useDispatch();
  const loginContext = useContext(LoginContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const state = useSelector((state) => {
    return {
      login: state.loginReducer.token,
    };
  });
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/login", {
      email,
      password,
    });
    disPatch(setToken(res.data.token));

    if (loginContext.loggedIn) {
      history.push("/dashboard");
    }
  };

  const redirect = () => {
    if (loginContext.loggedIn) {
      history.push("/dashboard");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="email here" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="password here" onChange={(e) => setPassword(e.target.value)} />
        <button>Login</button>
      </form>

      {redirect()}
      {loginContext.message && <div>{loginContext.message}</div>}
    </>
  );
};

export default Login;
