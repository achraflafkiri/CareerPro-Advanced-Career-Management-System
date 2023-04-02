import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom/dist";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../store/middleware/auth/authSlice";
import Cookies from "js-cookie";

const LoginForm = () => {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userObj, setUserObj] = useState({
    username: "",
    password: "",
  });

  const { username, password } = userObj;

  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserObj((prevUserObj) => ({
      ...prevUserObj,
      [name]: value,
    }));
  };

  useEffect(() => {
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  useEffect(() => {
    if (isError) {
      setError(message);
      setTimeout(() => {
        setError(null);
      }, 20000);
    }

    const token = Cookies.get("ACCESS_TOKEN");
    if (token) {
      window.location.href = "/";
    }
  }, [isError, message]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(login(userObj));
  };

  return (
    <form onSubmit={handleSubmit} className="p-2">
      <div className="mb-3">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          className="form-control"
          value={username}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          id="password"
          className="form-control"
          value={password}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <button
          type="submit"
          className="btn btn-primary btn-ms"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Send"}
        </button>
      </div>
      <div className="mb-3">
        I don't have an account <a href="/register">create new account</a>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </form>
  );
};

export default LoginForm;
