import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ControlCard from "../../layout/ControlCard";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";

import { getCourseById } from "../../../store/actions/course";
import PageLoader from "../../custom/PageLoader";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1, 3),
    color: theme.palette.text.secondary,
    fontSize: "16px",
  },
}));

const ViewCourse = ({ getCourseById, courseId, course_detail }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('------------herer')
    getCourseById(setLoading, courseId);
  }, [courseId]);

  const { letures } = course_detail.course || [];
  return (
    <PageLoader loading={loading}>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ControlCard course={course_detail} />
          </Grid>
          {/* <Grid container spacing={3}> */}
          {/* <Grid item xs={12}>
          <Paper className={classes.paper} style={{ fontSize: "20px" }}>
            Welcome to LearnEnglish
          </Paper>
          <Paper className={classes.paper}>
            Learn English online using our high-quality resources to quickly
            improve your English. This website is created for adult learners of
            English by the British Council, the world's English teaching
            experts.
          </Paper>
          <Paper className={classes.paper}>
            Start by taking our free English test to help you find your level.
            Then find lessons and resources to improve your English skills. Get
            more practice to improve your general English with our extended
            listening and reading materials. At any time, use the grammar and
            vocabulary sections to help and support your learning.
          </Paper>
          <Paper className={classes.paper}>
            Find out more about our range of online classes and courses to
            improve your English.
          </Paper>
        </Grid> */}
          <Grid item xs={12}>
            <Paper className={classes.paper} style={{ fontSize: "20px" }}>
              What you will learn
            </Paper>
            <Paper className={classes.paper}>
              You will learn over 1000 vital English words, expressions and
              idioms, and how to use them in real life.
            </Paper>
            <Paper className={classes.paper}>
              You will learn to think in English and to speak English fluently.
              (in Intermediate level)
            </Paper>
            <Paper className={classes.paper}>
              You will learn the most important English grammar with tons of
              English speaking practice.
            </Paper>
            <Paper className={classes.paper}>
              You will learn to read in English and to spell English words
              intuitively
            </Paper>
            <Paper className={classes.paper}>
              You will learn to understand movies and TV shows in English.
            </Paper>
          </Grid>
          {/* </Grid> */}
          <Grid item xs={6}>
            <h4>Course Content</h4>
          </Grid>
          <Grid item xs={6} style={{ display: "flex", alignItems: "center" }}>
            <h6>{letures && letures.length} Lectures</h6>
          </Grid>
          {letures &&
            letures.map((lecture) => (
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Grid container spacing={3}>
                    <Grid item>
                      <PlayCircleFilledIcon color="primary" fontSize="large" />
                    </Grid>
                    <Grid
                      item
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <h6 style={{ margin: 0 }}>{lecture.name}</h6>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
        </Grid>
      </div>
    </PageLoader>
  );
};

const mapStateToProps = (state) => ({
  course_detail: state.course.course_detail,
});

export default connect(mapStateToProps, { getCourseById })(ViewCourse);
