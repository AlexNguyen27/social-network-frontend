import React, { useEffect, useState } from "react";
import AboutCard from "./AboutCard";
import { connect } from "react-redux";
import PostCard from "../../custom/PostCard";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ScrollableTabs from "./ScrollableTabs";
import { getUserProfile, getUsers } from "../../../store/actions/user";
import PageLoader from "../../custom/PageLoader";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    margin: 0,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const UserProfile = ({ userId, getUserProfile, getUsers, user_profile }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getUserProfile(userId, setLoading);
    getUsers(setLoading);
    // console.log("userid---------", userId);
  }, [userId]);
  return (
    <div className={classes.root}>
      <PageLoader loading={loading}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <AboutCard userProfile={user_profile} />
          </Grid>
          <Grid item xs={12}>
            <ScrollableTabs />
          </Grid>
        </Grid>
      </PageLoader>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user_profile:
    state.user_profile.user_profile || state.user_profile.friend_profile,
});
export default connect(mapStateToProps, { getUserProfile, getUsers })(
  UserProfile
);
