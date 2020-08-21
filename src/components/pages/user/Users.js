import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import UserCard from "../userProfile/connection/UserCard";
import { getUsers } from "../../../store/actions/user";

const Users = ({ users, getUsers }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getUsers(setLoading);
  }, []);
  return (
    <div style={{ marginRight: "-24px", marginLeft: "-24px" }}>
      <Grid container spacing={3}>
        {Object.keys(users).map((key) => (
          <Grid item xs={4}>
            <UserCard userInfo={users[key]} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.user.users,
});
export default connect(mapStateToProps, { getUsers })(Users);
