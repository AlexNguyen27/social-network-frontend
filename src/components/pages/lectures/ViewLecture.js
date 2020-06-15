import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import VideoCard from "../../custom/VideoCard";
import { BASE_URL } from "../../../store/actions/types";

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

const ViewLecture = ({ lectureId, lectures }) => {
  const classes = useStyles();
  const [lectureData, setLectureData] = useState();

  useEffect(() => {
    setLectureData(lectures[lectureId]);
  });

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <VideoCard
            poster={
              lectureData ? `${BASE_URL}/images/${lectureData.image}` : ""
            }
            src={lectureData ? `${BASE_URL}/video/${lectureData.video}` : ""}
          />
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

const mapStateToProps = (state) => ({
  lectures: state.course.course_detail.lectures,
});
export default connect(mapStateToProps, null)(ViewLecture);
