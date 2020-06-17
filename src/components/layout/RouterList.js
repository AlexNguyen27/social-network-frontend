import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Container from '@material-ui/core/Container';

// Route
import NotFound from '../layout/NotFound';
import StaffLogin from '../pages/auth/StaffLogin';
import Signup from '../pages/auth/Signup';
// import Courses from '../pages/courses/Courses';
import DashBoard from '../pages/DashBoard';
import ProtectedRoute from '../custom/ProtectedRoute';

const RouterList = (props) => {
  return (
    <Container>
      <Switch>
        <Route exact path="/" component={StaffLogin} />
        <Route exact path="/login" component={StaffLogin} />
        <Route exact path="/signup" component={Signup} />
        <ProtectedRoute exact path="/all-courses" component={DashBoard} />
        <ProtectedRoute
          exact
          path="/all-courses/:courseId"
          component={DashBoard}
        />
        <ProtectedRoute exact path="/your-courses" component={DashBoard} />
        <ProtectedRoute
          exact
          path="/your-courses/:courseId"
          component={DashBoard}
        />
        <ProtectedRoute
          exact
          path="/your-courses/:courseId/lectures/:lectureId"
          component={DashBoard}
        />
        <ProtectedRoute
          exact
          path="/all-courses/:courseId/lectures/:lectureId"
          component={DashBoard}
        />
        <ProtectedRoute exact path="/user-profile" component={DashBoard} />
        <ProtectedRoute exact path="/statistics" component={DashBoard} />
        <ProtectedRoute exact path="/help" component={DashBoard} />
        <ProtectedRoute exact path="/notifications" component={DashBoard} />
        <ProtectedRoute exact path="/mails" component={DashBoard} />
        <ProtectedRoute
          exact
          path="/your-courses/:courseId"
          component={DashBoard}
        />
        <ProtectedRoute
          exact
          path="/all-courses/:courseId"
          component={DashBoard}
        />
        <ProtectedRoute exact path="/users-list" component={DashBoard} />
        <ProtectedRoute
          exact
          path="/users-list/:userId"
          component={DashBoard}
        />

        <ProtectedRoute exact path="/user-courses" component={DashBoard} />
        <ProtectedRoute
          exact
          path="/user-courses/:courseId"
          component={DashBoard}
        />

        <ProtectedRoute component={() => <NotFound center />} />
      </Switch>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(RouterList);
