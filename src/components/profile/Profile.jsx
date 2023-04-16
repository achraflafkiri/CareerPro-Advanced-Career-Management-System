import React, { useEffect, useState } from "react";
import { useStateContext } from "../../context/ContextProvider";
import { getOneUser } from "../../api/functions/profile";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    location: "",
    bio: "",
    image: "",
  });

  const { username, email, location, bio, image } = userInfo;

  const { user } = useStateContext();
  const userId = user.id;

  useEffect(() => {
    const handleGetUser = async () => {
      const res = await getOneUser(userId);
      if (res.data) {
        console.log(" ", res.data.user);
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

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4>Profile</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 text-center">
                  <img
                    src={image}
                    alt="Profile Picture"
                    className="rounded-circle img-thumbnail"
                  />
                </div>
                <div className="col-md-8">
                  <h3>{username}</h3>
                  <p>Email: {email}</p>
                  <p>Location: {location}</p>
                  <p>Bio: {bio}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
