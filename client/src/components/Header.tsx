import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation, NavLink } from "react-router-dom";
import decode from "jwt-decode";

export const Header = () => {
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
    history.push("/user-signin");
    setUser("false");
  };

  return (
    <React.Fragment>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
         <ul className='navbar-nav'>
          <li className='nav-item'>
            <a
              className='nav-link'
              data-widget='pushmenu'
              href='#s'
              role='button'
            >
              <i className='fas fa-bars'></i>
            </a>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          {!user ? (
            <>
              <li className="nav-item">
                <NavLink to="user-signup" className="nav-link">
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="user-signin" className="nav-link">
                  Login
                </NavLink>
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
