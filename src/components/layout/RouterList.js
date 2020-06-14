import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Container from '@material-ui/core/Container';

// Route
import NotFound from '../layout/NotFound';
import StaffLogin from '../pages/auth/StaffLogin';
import Signup from '../pages/auth/Signup';
import Courses from '../pages/courses/Courses';
import DashBoard from '../pages/DashBoard';

const RouterList = () => {
  return (
    <Container>
      <Switch>
        <Route exact path="/" component={StaffLogin} />
        <Route exact path="/login" component={StaffLogin} />
        <Route exact path="/signup" component={Signup} />
        <Route path="/dashboard" component={DashBoard} />
        <Route path="/dashboard/allCourses" component={Courses} />
      </Switch>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(RouterList);
