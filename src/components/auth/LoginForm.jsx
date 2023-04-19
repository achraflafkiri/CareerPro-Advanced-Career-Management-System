import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom/dist";
import { Login } from "../../api/functions/auth";
import { useStateContext } from "../../context/ContextProvider";

const LoginForm = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  const { username, password } = userInfo;

  const [error, setError] = useState(null);
  const [loading, isLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prevUserObj) => ({
      ...prevUserObj,
      [name]: value,
    }));
  };

  const { setUser, setToken } = useStateContext();

  const handleSubmit = async (event) => {
    event.preventDefault();

    isLoading(true);
    setTimeout(async () => {
      try {
        const response = await Login(userInfo);
        setUser(response.data.user);
        setToken(response.data.token);
      } catch (err) {
        console.log(err.response);
        if (err.response) {
          setInterval(() => {
            setError(err.response.data.message);
          }, 2000);
          isLoading(false);
        }
      }
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="forms-sample">
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          className="form-control"
          value={username}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          id="password"
          className="form-control"
          value={password}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <button
          type="submit"
          className="btn btn-inverse-primary btn-fw"
          disabled={loading}
        >
          {loading ? "Loading..." : "Send"}
        </button>
      </div>
      <div className="form-group">
        I don't have an account{" "}
        <Link className="btn-link btn-fw" to={"/register"}>
          create new account
        </Link>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </form>
  );
};

export default LoginForm;
