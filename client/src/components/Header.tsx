import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import decode from "jwt-decode";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("profile") ?? "false")
  );
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken: any = decode(token);
      const isTokenExpired = decodedToken.exp * 1000 < new Date().getTime();
      if (isTokenExpired) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile") ?? "false"));
  }, [location]);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
    setUser(null);
  };

  return (
    <React.Fragment>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav ml-auto">
          {!user ? (
            <>
              <li className="nav-item">
                <a href="user-signup" className="nav-link">
                  Register
                </a>
              </li>
              <li className="nav-item">
                <a href="user-signin" className="nav-link">
                  Login
                </a>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <a href="#" className="nav-link" onClick={logout}>
                  Logout
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default Header;
