import React, { useEffect, useState } from "react";
import { useStateContext } from "../../context/ContextProvider";
import { getOneUser, updateUser } from "../../api/functions/profile";
import Icon from "@mdi/react";
import { mdiAccountEdit, mdiTrashCanOutline, mdiArrowTopRight } from "@mdi/js";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import DefaultImage from "../../assets/images/faces/default.png";
import "./style.css";

const Profile = () => {
  const { userId, setUserImage, token } = useStateContext();

  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    location: "",
    bio: "",
    image: null,
  });

  const { username, email, location, bio, image } = userInfo;

  useEffect(() => {
    const handleGetUser = async () => {
      const res = await getOneUser(userId);
      if (res.data) {
        setUserInfo({
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

  const handleGetUser = async () => {
    const res = await getOneUser(userId);
    if (res.data) {
      setUserInfo({
        username: res.data.user.username,
        email: res.data.user.email,
        location: res.data.user.location,
        bio: res.data.user.bio,
        image: res.data.user.image,
      });
    }
  };

  const handleChange = (event) => {
    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("userId", userId);

    const form = new FormData();
    form.append("username", username);
    form.append("email", email);
    form.append("location", location);
    form.append("bio", bio);
    form.append("image", image);

    try {
      const res = await updateUser(token, form, userId);

      if (res.status === 200) {
        setUserImage(image);
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

  const handleChangeImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImageUrl(reader.result);
    };

    reader.readAsDataURL(file);

    setUserInfo({
      ...userInfo,
      image: file,
    });

    // console.log(image);
  };

  const handleRemoveImage = async (event) => {
    event.preventDefault();

    setImageUrl(DefaultImage);

    // console.log("image", image);
    handleGetUser();
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h2 className="fw-bold mb-0 card-title">Profile</h2>
          </div>
          <div className="card-body">
            <form className="forms-sample" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-3">
                  {image ? (
                    <figure style={{ width: "190px" }}>
                      <img
                        src={imageUrl || image}
                        alt="user_photo"
                        className="img-thumbnail"
                        style={{ width: "100%" }}
                      />
                    </figure>
                  ) : (
                    <div></div>
                  )}
                </div>
                <div className="col-md-8 mx-3">
                  <div className="d-flex align-items-center justify-content-start mb-3">
                    <div className="file">
                      <label className="file-label">
                        <input
                          type="file"
                          className="file-input"
                          name="image"
                          accept="image/*"
                          onChange={handleChangeImage}
                        />
                        <span className="file-cta">
                          <span className="file-label">Upload Images</span>
                        </span>
                      </label>
                    </div>
                    <button
                      className="btn btn-icon btn-sm btn-pink mx-2"
                      onClick={handleRemoveImage}
                    >
                      <Icon path={mdiTrashCanOutline} size={1} />
                    </button>
                  </div>
                  <p className="card-text">
                    Max file size is 1MB, Minimum dimension: 330x300 And
                    Suitable files are .jpg & .png
                  </p>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="username"
                  className="form-control"
                  id="Inputusername"
                  name="username"
                  placeholder="username"
                  value={username}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="InputEmail"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  className="form-control"
                  id="InputLocation"
                  name="location"
                  placeholder="Location"
                  value={location}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <input
                  type="text"
                  className="form-control"
                  id="InputBio"
                  name="bio"
                  placeholder="Bio"
                  value={bio}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-success text-white">
                  SEND <Icon path={mdiArrowTopRight} size={1} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
