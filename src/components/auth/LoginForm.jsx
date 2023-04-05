import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom/dist";
import { Login } from "../../api/index";
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
          const status = err.response.status;
          switch (status) {
            case 401:
              setError(err.response.data.message);
              isLoading(false);
              break;
            case 500:
              setError(err.response.data.message);
              isLoading(false);
              break;
            default:
              setError(err.response.data.message);
              isLoading(false);
              break;
          }
        }
      } finally {
        isLoading(false);
      }
    }, 1000);
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
          disabled={loading}
        >
          {loading ? "Loading..." : "Send"}
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
