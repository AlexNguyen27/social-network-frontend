import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";

import CardItem from "../../layout/CardItem";
import PageLoader from "../../custom/PageLoader";
import { getUserCourses } from "../../../store/actions/course";
import { clearErrors } from "../../../store/actions/common";

const UserCourses = ({
  match,
  user_courses,
  clearErrors,
  getUserCourses,
  auth: { user },
}) => {
  const [loading, setLoading] = useState(true);

  // INITIALIZE MODULE LIST
  useEffect(() => {
    getUserCourses(setLoading, user.id);
    return () => {
      clearErrors();
    };
  }, []);

  // const test = Array.from(Array(10).keys());
  return (
    <PageLoader loading={loading}>
      <h1>{console.log(match)}</h1>
      <Grid container spacing={3}>
        {user_courses &&
          Object.keys(user_courses).map((key) => (
            <Grid item xs={4} md={3} spacing={3}>
              <CardItem course={user_courses[key]} />
            </Grid>
          ))}
      </Grid>
    </PageLoader>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
  user_courses: state.course.user_courses,
});
export default connect(mapStateToProps, { clearErrors, getUserCourses })(UserCourses);
