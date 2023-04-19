import React, { useState, useEffect } from "react";
import axios from "axios";
import { useStateContext } from "../../context/ContextProvider";
import { getOneUser } from "../../api/functions/profile";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "",
    location: "",
    image: null,
  });

  const { user } = useStateContext();
  const userId = user.id;

  useEffect(() => {
    const handleGetUser = async () => {
      const res = await getOneUser(userId);
      if (res.data) {
        console.log(" ", res.data.user.image);
        setFormData({
          username: res.data.user.username,
          email: res.data.user.email,
          location: res.data.user.location,
          bio: res.data.user.bio,
          image: res.data.user.image,
        });
      }
    };

    handleGetUser();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, bio, location, image } = formData;

    const form = new FormData();
    form.append("username", username);
    form.append("email", email);
    form.append("bio", bio);
    form.append("location", location);
    form.append("image", image);

    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/profile/${userId}`,
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.status === 200) {
        navigate("/profile");
        toast.success(`${res.data.message}`, {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  return (
    <div className="row">
      <div className="col-md-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <p className="card-title">Edit profile</p>
            <form onSubmit={handleSubmit} className="forms-sample">
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="bio">Bio:</label>
                <textarea
                  name="bio"
                  className="form-control"
                  value={formData.bio}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="location">Location:</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div class="form-group">
                <input
                  type="file"
                  class="form-control"
                  disabled=""
                  name="image"
                  placeholder="Upload Image"
                  onChange={handleImageChange}
                />
              </div>
              {/* {  formData && formData.image ? (
                   <img
                     src={require(`../../assets/images/faces/${
                       formData?.image || "face27.jpg"
                     }`)}
                     alt="user_photo"
                     className="rounded-circle img-thumbnail"
                     style={{ width: "100%" }}
                   />
                 ) : (
                   <div></div>
                 )}
               </figure> */}
              <div className="from-group">
                <button
                  type="submit"
                  className="btn btn-inverse-primary btn-fw"
                >
                  Submit
                </button>
                <button
                  class="btn btn-light"
                  onClick={() => navigate("/profile")}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
