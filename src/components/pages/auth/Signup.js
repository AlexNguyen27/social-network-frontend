import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter, matchPath } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { Button, Container } from "@material-ui/core";

// COMPONENT
import PageTitle from "../../custom/PageTitle";
import TextFieldInputWithHeader from "../../custom/TextFieldInputWithheader";
import Landing from "../../layout/Landing";

const Signup = ({ errors, history, loginUser, match }) => {
  // FORM DATA STATE
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullname: "",
    email: "",
  });

  const { username, password, email, fullname } = formData;

  // Click button Login
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    history.push("/test");
    // loginUser(formData);
  };

  // Save on change input value
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Fragment>
      <Landing />
      <Grid container justify="center">
        <Grid item xs={12} sm={5}>
          <form onSubmit={(e) => onSubmit(e)}>
            <PageTitle title="Create an account" center="true" />
            <TextFieldInputWithHeader
              header="Username"
              name="username"
              className="mt-0"
              fullWidth
              value={username}
              onChange={onChange}
              error={errors.username}
              placeholder="Enter Username"
            />
            <TextFieldInputWithHeader
              header="Email"
              name="email"
              className="mt-0"
              fullWidth
              value={email}
              onChange={onChange}
              error={errors.email}
              placeholder="Enter Email"
            />

            <TextFieldInputWithHeader
              header="Fullname"
              name="fullname"
              className="mt-0"
              fullWidth
              value={fullname}
              onChange={onChange}
              error={errors.fullname}
              placeholder="Enter Fullname"
            />
            <TextFieldInputWithHeader
              header="Password"
              name="password"
              placeholder="Enter Password"
              type="password"
              value={password}
              error={errors.password}
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
                Sign up
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
});
export default connect(mapStateToProps, {})(withRouter(Signup));
