import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";

const Navbar = () => {
  const isAuthenticated = true;
  const logoutButton = (
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link
          className="nav-link"
          to=""
          onClick={() => {
            // logoutUser();
          }}
        >
          Logout
        </Link>
      </li>
    </ul>
  );

  const loginButton = (
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link className="nav-link" to="/staffLogin">
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-md navbar-dark" style={{ background: "#40356F"}}>
      <Link className="navbar-brand" to="">
        Elearning English
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavbar"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="collapsibleNavbar">
        <ul className="navbar-nav mr-auto">
          {/* Login */}
          <Fragment>
            <li className="nav-item">
              <NavLink className="nav-link" to="/staffLogin">
                Staff
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/studentLogin">
                Student
              </NavLink>
            </li> */}
          </Fragment>
        </ul>
        {loginButton}
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(Navbar);
