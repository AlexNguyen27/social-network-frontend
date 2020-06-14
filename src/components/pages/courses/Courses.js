import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import CardItem from '../../layout/CardItem';
import PageLoader from '../../custom/PageLoader';
import { getCourses } from '../../../store/actions/course';
import { clearErrors } from '../../../store/actions/common';

const Courses = ({ courses, clearErrors, getCourses }) => {
  const [loading, setLoading] = useState(true);

  // INITIALIZE MODULE LIST
  useEffect(() => {
    getCourses(setLoading);
    return () => {
      console.log(courses);
      clearErrors();
    };
  }, []);

  const test = Array.from(Array(10).keys());
  return (
    <PageLoader loading={loading}>
      <Grid container spacing={3}>
        {(courses || []).map((item) => (
          <Grid item xs={4} md={3} spacing={3}>
            <CardItem course={item} />
          </Grid>
        ))}
      </Grid>
    </PageLoader>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
  courses: state.course.courses,
});
export default connect(mapStateToProps, { clearErrors, getCourses })(Courses);
