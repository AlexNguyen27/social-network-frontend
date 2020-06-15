import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import VideoCard from "../../custom/VideoCard";
import { BASE_URL } from "../../../store/actions/types";
import { Button } from "@material-ui/core";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";

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
        <Grid item xs={12}>
          <Button variant="contained" color="primary">
            <QuestionAnswerIcon className="mr-2"/>
            Add New Question
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>No testing</Paper>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  lectures: state.course.course_detail.lectures,
});
export default connect(mapStateToProps, null)(ViewLecture);
