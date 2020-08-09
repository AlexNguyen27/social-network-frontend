import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter, matchPath } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { Button, Container } from "@material-ui/core";

// COMPONENT
import PageTitle from "../../custom/PageTitle";
import TextFieldInputWithHeader from "../../custom/TextFieldInputWithheader";
import Landing from "../../layout/Landing";

// ACTION
import { loginUser } from "../../../store/actions/auth";
const Login = ({
  errors,
  history,
  loginUser,
  auth: { isAuthenticated, isAdmin },
  match,
}) => {
  // FORM DATA STATE
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  // Click button Login
  const onSubmit = (e) => {
    e.preventDefault();

    const { username, password } = formData;
    loginUser({ username, password });
  };

  // Save on change input value
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isAuthenticated) {
    if (isAdmin) {
      return <Redirect to="/users-list" />;
    }
    if (match.path === '/news-feed') {
      return <Redirect to="/news-feed" />;
    }
    return <Redirect to="/news-feed" />;
  }

  return (
    <Fragment>
      <Landing />
      <Grid container justify="center">
        <Grid item xs={12} sm={4}>
          <form onSubmit={(e) => onSubmit(e)}>
            <PageTitle title="Login" center="true" />
            <TextFieldInputWithHeader
              header="Username"
              name="username"
              className="mt-0"
              fullWidth
              value={username}
              onChange={onChange}
              error={errors.message}
              placeholder="Enter Staff ID"
            />

            <TextFieldInputWithHeader
              header="Password"
              name="password"
              placeholder="Enter Password"
              type="password"
              value={password}
              error={errors.message}
              className="mt-0"
              fullWidth
              onChange={onChange}
            />
            <div className="text-center">
              <Button
                className="mt-3 mr-2"
                variant="contained"
                color="primary"
                type="submit"
              >
                Login
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
});
export default connect(mapStateToProps, { loginUser })(withRouter(Login));
