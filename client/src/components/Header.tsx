import React from "react";

const Header = () => {
  return (
    <React.Fragment>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a href="user-signup" className="nav-link">
              Register
            </a>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default Header;
