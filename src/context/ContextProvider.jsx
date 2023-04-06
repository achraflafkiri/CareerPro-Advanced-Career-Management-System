import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  currentUser: null,
  token: null,
  sidebarIconOnly: null,
  setUser: () => {},
  setToken: () => {},
  sidebarIconOnly: () => {},
});

export const ContextProvider = ({ children }) => {
  const [sidebarIconOnly, _sidebarIconOnly] = useState();
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(
    JSON.parse(localStorage.getItem("ACCESS_TOKEN"))
  );

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", JSON.stringify(token));
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  const setSidebarIconOnly = (sidebarIconOnly) => {
    sidebarIconOnly
      ? document.body.classList.add("sidebar-icon-only")
      : document.body.classList.remove("sidebar-icon-only");
  };

  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        sidebarIconOnly,
        setSidebarIconOnly,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
