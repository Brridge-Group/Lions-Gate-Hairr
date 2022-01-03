import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import decode from "jwt-decode";
import axios from "axios";

const SideBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("profile") ?? "false")
  );
  const [name, setName] = useState();
  const [role, setRole] = useState();

  let content: any;

  let isOwner = (
    <li className="nav-item">
      <a href="#" className="nav-link">
        <i className="nav-icon fas fa-building" />
        <p>
          Businesses
          <i className="fas fa-angle-left right" />
        </p>
      </a>
      <ul className="nav nav-treeview">
        <li className="nav-item">
          <a href="/businesses" className="nav-link">
            <i className="far fa-circle nav-icon" />
            <p>List of Businesses</p>
          </a>
        </li>
        <li className="nav-item">
          <a href="/add-business" className="nav-link">
            <i className="far fa-circle nav-icon" />
            <p>Add Business</p>
          </a>
        </li>
      </ul>
    </li>
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

  if (user) {
    const fetchData = async () => {
      await axios
        .get(
          "http://localhost:5000/api/users" +
            `/get-profile/?id=${user.result._id}`
        )
        .then(async (res) => {
          setName(res.data.name);
          setRole(res.data.role);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }

  if (role === "owner") content = isOwner;

  return (
    <React.Fragment>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a href="index3.html" className="brand-link">
          <img
            src="/assets/dist/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: 0.8 }}
          />
          <span className="brand-text font-weight-light">Hello World</span>
        </a>

        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            {user ? (
              <>
                <div className="image">
                  <img
                    src="https://www.shareicon.net/data/512x512/2017/01/06/868320_people_512x512.png"
                    className="img-circle elevation-2"
                    alt="User Image"
                  />
                </div>
                <div className="info">
                  <a href="#" className="d-block">
                    {name} ({role})
                  </a>
                </div>
              </>
            ) : (
              <>
                <div className="image">
                  <img
                    src="https://www.shareicon.net/data/512x512/2017/01/06/868320_people_512x512.png"
                    className="img-circle elevation-2"
                    alt="User Image"
                  />
                </div>
                <div className="info">
                  <a href="#" className="d-block">
                    User (Not logged in)
                  </a>
                </div>
              </>
            )}
          </div>
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <NavLink to="/" exact className="nav-link">
                  <i className="nav-icon fas fa-home"></i>
                  <p>Home</p>
                </NavLink>
              </li>
              {user && <>{content}</>}
              <li className="nav-item">
                <NavLink to="/items" className="nav-link">
                  <i className="nav-icon fas fa-list"></i>
                  <p>Items</p>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </React.Fragment>
  );
};

export default SideBar;
