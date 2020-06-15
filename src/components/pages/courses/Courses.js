import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";

import CardItem from "../../layout/CardItem";
import PageLoader from "../../custom/PageLoader";
import { getCourses } from "../../../store/actions/course";
import { clearErrors } from "../../../store/actions/common";

const Courses = ({
  match,
  all_courses,
  clearErrors,
  getCourses,
  auth: { user },
}) => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  // INITIALIZE MODULE LIST
  useEffect(() => {
    getCourses(setLoading);
    return () => {
      console.log(all_courses);
      clearErrors();
    };
  }, []);

  return (
    <PageLoader loading={loading}>
      <Grid container spacing={3}>
        {all_courses &&
          Object.keys(all_courses).map((key) => (
            <Grid
              item
              style={{ display: "inline-grid" }}
              xs={4}
              md={3}
              spacing={3}
            >
              <CardItem course={all_courses[key].course}>
                <Button
                  size="small"
                  color="primary"
                  onClick={() =>
                    history.push(`${window.location.pathname}/${key}`)
                  }
                >
                  Detail
                </Button>
              </CardItem>
            </Grid>
          ))}
      </Grid>
    </PageLoader>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
  all_courses: state.course.all_courses,
});
export default connect(mapStateToProps, { clearErrors, getCourses })(Courses);
