import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ControlCard from '../../layout/ControlCard';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Row, Col } from 'reactstrap';

import { getCourseById } from '../../../store/actions/course';
import PageLoader from '../../custom/PageLoader';
import { IconButton } from '@material-ui/core';
import { deleteLecture } from '../../../store/actions/lecture';
import EditLectureModel from '../lectures/EditLectureModel';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1, 3),
    color: theme.palette.text.secondary,
    fontSize: '16px',
  },
  centered: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const ViewCourse = ({
  getCourseById,
  courseId,
  course_detail,
  deleteLecture,
  auth: { user },
}) => {
  const history = useHistory();
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(courseId);
    getCourseById(setLoading, courseId);
    // setLoading(false);
    // getLecturesByCourseId(setLoading, courseId);
  }, [courseId]);

  const [modalEdit, setModalEdit] = useState(false);
  const [lectureData, setLectureData] = useState();
  const { lectures } = course_detail || [];

  // HANDLE ON DELETE Course
  const onDeleteLecture = (lectureId) => {
    Swal.fire({
      title: `Are you sure to delete ?`,
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        setLoading(true);
        deleteLecture(setLoading, lectureId);
      }
    });
  };

  const onEditLecture = (lecture) => {
    setModalEdit(true);
    setLectureData(lecture);
  };

  return (
    <PageLoader loading={loading}>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ControlCard course={course_detail} />
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper} style={{ fontSize: '20px' }}>
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
          <Grid item xs={6} style={{ display: 'flex', alignItems: 'center' }}>
            <h6>{lectures && Object.keys(lectures).length} Lectures</h6>
          </Grid>
          {lectures &&
            Object.keys(lectures).map((key) => (
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Row>
                    <Col
                      xs="1"
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <IconButton
                        onClick={() =>
                          history.push(
                            `${window.location.pathname}/lectures/${key}`
                          )
                        }
                      >
                        <PlayCircleFilledIcon
                          color="primary"
                          fontSize="large"
                        />
                      </IconButton>
                    </Col>
                    <Col
                      xs="8"
                      lg="9"
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <h6 style={{ margin: 0 }}>{lectures[key].name}</h6>
                    </Col>
                    {user.id === course_detail.teacher.id && (
                      <Col xs="3" lg="2">
                        <Row>
                          <IconButton
                            color="default"
                            onClick={() => onEditLecture(lectures[key])}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="secondary"
                            onClick={() => onDeleteLecture(key)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Row>
                      </Col>
                    )}
                  </Row>
                </Paper>
              </Grid>
            ))}
        </Grid>
        <EditLectureModel
          setModal={setModalEdit}
          modal={modalEdit}
          lectureData={lectureData}
        />
      </div>
    </PageLoader>
  );
};

const mapStateToProps = (state) => ({
  course_detail: state.course.course_detail,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getCourseById,
  deleteLecture,
})(ViewCourse);
