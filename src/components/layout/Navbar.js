import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Colors from '../../constants/Colors';

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

  // const loginButton = (
  //   <ul className="navbar-nav">
  //     <li className="nav-item">
  //       <Link className="nav-link" to="/staffLogin">
  //         Login
  //       </Link>
  //     </li>
  //   </ul>
  // );

  const signUpButton = (
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link className="nav-link" to="/signup">
          Sign up
        </Link>
      </li>
    </ul>
  );

  return (
    <nav
      className="navbar navbar-expand-md navbar-dark"
      style={{ background: Colors.purple, minHeight: '64px' }}
    >
      <Link className="navbar-brand" to="/login">
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
              <NavLink className="nav-link" to="/login">
                Staff
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Admin
              </NavLink>
            </li> */}
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/studentLogin">
                Student
              </NavLink>
            </li> */}
          </Fragment>
        </ul>
        {/* {loginButton} */}
        {signUpButton}
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(Navbar);
