import React, { useEffect } from "react";
import AboutCard from "./AboutCard";
import PostCard from "../../custom/PostCard";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ScrollableTabs from "./ScrollableTabs";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    margin: 0
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const UserProfile = ({ userId }) => {
  const classes = useStyles();

  useEffect(() => {
    // console.log("userid---------", userId);
  }, {});
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AboutCard />
        </Grid>
        <Grid item xs={12}>
            <ScrollableTabs/>
        </Grid>
        {/* {[1, 2, 3, 4, 5, 6].map((item) => (
          <>
            <Grid item xs={8}>
              <PostCard />
            </Grid>
            <Grid></Grid>
          </>
        ))} */}
      </Grid>
    </div>
  );
};

export default UserProfile;
