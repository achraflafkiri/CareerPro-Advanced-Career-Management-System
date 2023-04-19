import React, { useEffect, useState } from "react";
import { useStateContext } from "../../context/ContextProvider";
import { getOneUser } from "../../api/functions/profile";
import Icon from "@mdi/react";
import { mdiAccountEdit } from "@mdi/js";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    location: "",
    bio: "",
    image: "",
    isAdmin: "",
  });

  const { username, email, location, bio, image, isAdmin } = userInfo;

  const { user } = useStateContext();
  const userId = user.id;

  useEffect(() => {
    const handleGetUser = async () => {
      const res = await getOneUser(userId);
      if (res.data) {
        setUserInfo({
          username: res.data.user.username,
          email: res.data.user.email,
          location: res.data.user.location,
          bio: res.data.user.bio,
          isAdmin: res.data.user.isAdmin,
          image: res.data.user.image,
        });
      }
    };

    handleGetUser();
  }, [userId]);

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header bg-light d-flex align-items-center justify-content-between px-3">
            <h2 className="fw-bold mb-0">Profile</h2>
            <button
              className="btn btn-inverse-dark btn-icon"
              onClick={() => navigate("/profile/edit")}
            >
              <Icon path={mdiAccountEdit} size={1} />
            </button>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4 d-flex justify-content-center align-items-center">
                <figure style={{ width: "194px" }}>
                  <img
                    src={require(`../../assets/images/faces/${
                      image || "face27.jpg"
                    }`)}
                    alt="user_photo"
                    className="rounded-circle img-thumbnail"
                    style={{ width: "100%" }}
                  />
                </figure>
              </div>
              <div className="col-md-8 p-3">
                <p className="card-text fs-5 mb-3">Username: {username}</p>
                <p className="card-text  fs-5  mb-3">Email: {email}</p>
                <p className="card-text  fs-5  mb-3">Location: {location}</p>
                <p className="card-text  fs-5  mb-3">Bio: {bio}</p>
                <p className="card-text  fs-5  mb-3">
                  Role or permission level :{" "}
                  {isAdmin ? (
                    <span className="text-success">
                      All permission available
                    </span>
                  ) : (
                    "*"
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
