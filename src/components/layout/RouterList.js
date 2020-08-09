import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Container from '@material-ui/core/Container';

// Route
import NotFound from '../layout/NotFound';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
// import Courses from '../pages/courses/Courses';
import DashBoard from '../pages/DashBoard';
import ProtectedRoute from '../custom/ProtectedRoute';

const RouterList = (props) => {
  return (
    <Container>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/news-feed" component={DashBoard} />
        <ProtectedRoute exact path="/edit-user/:userId" component={DashBoard} />
        <ProtectedRoute exact path="/user-profile" component={DashBoard} />
        <ProtectedRoute exact path="/users-list" component={DashBoard} />
        <ProtectedRoute exact path="/statistics" component={DashBoard} />
        <ProtectedRoute exact path="/help" component={DashBoard} />
        <ProtectedRoute exact path="/notifications" component={DashBoard} />
        <ProtectedRoute exact path="/mails" component={DashBoard} />
        <ProtectedRoute component={() => <NotFound center />} />
      </Switch>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(RouterList);
