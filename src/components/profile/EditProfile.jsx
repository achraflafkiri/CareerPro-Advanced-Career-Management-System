import React, { useState } from "react";
import { toast } from "react-toastify";
import { useStateContext } from "../../context/ContextProvider";
import { updateUser } from "../../api/functions/profile";

const EditProject = () => {
  const { token, user } = useStateContext();
  // get user id
  const userId = user._id;

  const [NewData, setNewData] = useState({
    username: "",
    email: "",
    location: "",
    bio: "",
    image: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewData((prevData) => ({ ...prevData, [name]: value }));
  };

  const { username, email, location, bio, image } = NewData;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!token) {
        throw new Error("Token not found");
      }

      const data = {
        username,
        email,
        location,
        bio,
      };

      const response = await updateUser(token, data, userId);
      if (response.status === 200) {
        toast.success(`${response.data.message}`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      } else {
        throw new Error("failed");
      }
    } catch (err) {
      toast.warn(`${err.response.data.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="row">
      <div className="col-16 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">Public profile</h1>
            <hr />
            <form onSubmit={handleSubmit} className="forms-sample">
              <div className="input-group mb-2 mr-sm-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">@</div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  placeholder="Username"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  className="form-control"
                  id="bio"
                  name="bio"
                  rows="4"
                  value={bio}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  name="location"
                  value={location}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="image">Image</label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  name="image"
                  value={image}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-success btn-fw">
                Update profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProject;
