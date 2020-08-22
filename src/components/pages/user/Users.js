import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import UserCard from "../userProfile/connection/UserCard";
import { getUsers } from "../../../store/actions/user";
import PageLoader from "../../custom/PageLoader";

const Users = ({ users, getUsers, location }) => {
  const [loading, setLoading] = useState(true);
  const [usersData, setUsersData] = useState();
  useEffect(() => {
    getUsers(setLoading);
  }, []);

  const userArr = Object.keys(users).map((key) => users[key]);

  useEffect(() => {
    // console.log(location);
    const searchText = location.searchText;
    console.log(searchText);
    if (searchText && searchText.trim() !== "") {
      const mockup = (userArr || []).filter((user) => {
        return (
          user.firstName && user.firstName.toLowerCase().match(searchText) ||
          user.lastName && user.lastName.toLowerCase().match(searchText) ||
          user.address && user.address.toLowerCase().match(searchText) ||
          user.githubUsename && user.githubUsename.toLowerCase().match(searchText)
        );
      });
      setUsersData(mockup);
    }
  }, [location]);

  return (
    <PageLoader loading={loading}>
      <div style={{ marginRight: "-24px", marginLeft: "-24px" }}>
        <Grid container spacing={3}>
          {(!usersData || (usersData && usersData.length < 0)
            ? userArr
            : usersData
          ).map((user) => (
            <Grid item key={user.id} xs={4}>
              <UserCard userInfo={user} />
            </Grid>
          ))}
        </Grid>
      </div>
    </PageLoader>
  );
};

const mapStateToProps = (state) => ({
  users: state.user.users,
});
export default connect(mapStateToProps, { getUsers })(Users);
