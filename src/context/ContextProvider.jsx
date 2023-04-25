import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  currentuserId: null,
  token: null,
  sidebarIconOnly: null,
  userImage: null,

  setUserID: () => {},
  setToken: () => {},
  setSidebarIconOnly: () => {},
  setUserImage: () => {},
});

export const ContextProvider = ({ children }) => {
  const [sidebarIconOnly, _setSidebarIconOnly] = useState();
  const [token, _setToken] = useState(
    JSON.parse(localStorage.getItem("ACCESS_TOKEN"))
  );
  const [userId, _setUserID] = useState(
    JSON.parse(localStorage.getItem("ACCESS_ID"))
  );
  const [userImage, _setUserImage] = useState(
    JSON.parse(localStorage.getItem("ACCESS_IMAGE")) || "default.png"
  );



  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", JSON.stringify(token));
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  const setUserID = (user_Id) => {
    _setUserID(user_Id);
    if (user_Id) {
      localStorage.setItem("ACCESS_ID", JSON.stringify(user_Id));
    } else {
      localStorage.removeItem("ACCESS_ID");
    }
  };

  const setSidebarIconOnly = (sidebarIconOnly) => {
    _setSidebarIconOnly(sidebarIconOnly);
    sidebarIconOnly
      ? document.body.classList.add("sidebar-icon-only")
      : document.body.classList.remove("sidebar-icon-only");
  };

  const setUserImage = (user_Image) => {
    _setUserImage(user_Image);
    if (user_Image) {
      localStorage.setItem("ACCESS_IMAGE", JSON.stringify(user_Image));
    } else {
      localStorage.removeItem("ACCESS_IMAGE");
    }
  };

  return (
    <StateContext.Provider
      value={{
        userId,
        setUserID,
        token,
        setToken,
        sidebarIconOnly,
        setSidebarIconOnly,
        setUserImage,
        userImage,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
