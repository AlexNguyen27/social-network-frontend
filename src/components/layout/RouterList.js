import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Container from '@material-ui/core/Container';

// Route
import NotFound from "../layout/NotFound";
import StaffLogin from "../pages/auth/StaffLogin";

const RouterList = () => {
  return (
    <Container>
      <Switch>
        <Route exact path="/" component={StaffLogin} />
        <Route exact path="/staffLogin" component={StaffLogin} />

      </Switch>
    </Container>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(RouterList);
