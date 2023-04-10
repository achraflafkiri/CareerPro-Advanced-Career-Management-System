import React, { useState } from "react";
import { Signup } from "../../api/functions/auth";
import { useStateContext } from "../../context/ContextProvider";

const RegisterForm = () => {
  const { setUser, setToken } = useStateContext();
  const [userObj, setUserObj] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const { username, email, password, confirmpassword } = userObj;

  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserObj((prevUserObj) => ({
      ...prevUserObj,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("data passed", userObj);

    setLoading(true);
    setError(null);

    try {
      const response = await Signup(userObj);

      if (response.status === 201) {
        setUser(response.data.user);
        setToken(response.data.token);
        console.log(response.data.user);
      } else {
        throw new Error("Registration failed");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError([err.response.data.message]);
      } else {
        setError(["An unknown error occurred. Please try again."]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-2">
      {error &&
        error.map((item, index) => (
          <div key={index} className="alert alert-danger">
            {item}
          </div>
        ))}
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
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          className="form-control"
          value={email}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="form-control"
          value={password}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="confirmpassword">Confirm Password</label>
        <input
          type="password"
          name="confirmpassword"
          id="confirmpassword"
          className="form-control"
          value={confirmpassword}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <button
          type="submit"
          className="btn btn-primary btn-ms"
          disabled={loading}
        >
          {loading ? "Loading..." : "Register"}
        </button>
      </div>
      <div className="mb-3">
        Already have an account? <a href="/login">Login</a>
      </div>
    </form>
  );
};

export default RegisterForm;
