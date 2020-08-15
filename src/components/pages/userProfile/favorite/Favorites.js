import React from "react";
import PostCard from "../../../custom/PostCard";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  containRoot: {
    flexGrow: 1,
    padding: "24px 0px",
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

const Favorites = () => {
  const classes = useStyles();
  return (
    <div style={{ margin: "0px -24px" }}>
      <Grid container spacing={3} className={classes.containRoot}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Grid item xs={6} style={{ marginBottom: "20px" }}>
            <PostCard liked/>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Favorites;
