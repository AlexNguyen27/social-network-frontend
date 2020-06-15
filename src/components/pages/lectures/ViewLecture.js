import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import VideoCard from "../../custom/VideoCard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const db = {
  alternative: [
    {
      title: "Smells Like Teen Spirit",
      artist: "Nirvana",
      videoId: "hTWKbfoikeg",
      rank: 1,
    },
    {
      title: "Black",
      artist: "Perl Jame",
      videoId: "4q9UafsiQ6k",
      rank: 2,
    },
    {
      title: "Mr. Jones",
      artist: "Counting Crows",
      videoId: "-oqAU5VxFWs",
      rank: 3,
    },
    {
      title: "Zombie",
      artist: "The Cranberries",
      videoId: "6Ejga4kJUts",
      rank: 4,
    },
  ],
};

const ViewLecture = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
            <VideoCard/>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ViewLecture;
