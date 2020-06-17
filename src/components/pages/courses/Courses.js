import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core';

import CardItem from '../../layout/CardItem';
import PageLoader from '../../custom/PageLoader';
import { getCourses } from '../../../store/actions/course';
import { clearErrors } from '../../../store/actions/common';

const Courses = ({
  match,
  location,
  all_courses,
  clearErrors,
  getCourses,
  auth: { user },
}) => {
  const [loading, setLoading] = useState(true);
  const [coursesData, setCoursesData] = useState();

  const history = useHistory();
  // INITIALIZE MODULE LIST
  useEffect(() => {
    // console.log(location);
    getCourses(setLoading);
    return () => {
      console.log(all_courses);
      clearErrors();
    };
  }, []);

  const coursesArray = Object.keys(all_courses).map(
    (courseId) => all_courses[courseId]
  );

  useEffect(() => {
    console.log(location);
    const searchText = location.searchText;
    const mockup = (coursesArray || []).filter((item) => {
      return (
        item.course.name.toLowerCase().match(searchText) ||
        item.course.description.toLowerCase().match(searchText)
      );
    });
    setCoursesData(mockup);
  }, [location]);

  return (
    <PageLoader loading={loading}>
      <Grid container spacing={3}>
        {coursesArray &&
          (coursesData || coursesArray).map((course) => (
            <Grid
              item
              style={{ display: 'inline-grid' }}
              xs={4}
              md={3}
              spacing={3}
            >
              <CardItem course={course.course}>
                <Button
                  size="small"
                  color="primary"
                  onClick={() =>
                    history.push(
                      `${window.location.pathname}/${course.course.id}`
                    )
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
