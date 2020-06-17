import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import VideoCard from '../../custom/VideoCard';
import { BASE_URL } from '../../../store/actions/types';
import { Button } from '@material-ui/core';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import PageLoader from '../../custom/PageLoader';
import { getLectureByLectureId } from '../../../store/actions/lecture';
import { getQuestionByLectureId } from '../../../store/actions/question';
import AddQuestionModal from '../questionsBank/AddQuestionModal';
import QuestionsBank from '../questionsBank/QuestionsBank';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const ViewLecture = ({
  lectureId,
  courseId,
  lectures,
  auth: { user },
  lecture_detail,
  user_courses,
  getLectureByLectureId,
  getQuestionByLectureId,
  questions_bank,
}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [lectureData, setLectureData] = useState();

  useEffect(() => {
    setLectureData(lectures[lectureId]);
    // getQuestionByLectureId(setLoading, lectureId);
    getLectureByLectureId(setLoading, lectureId);
  }, [lectureId]);

  // const [modalAddQuestion, setModalAddQuestion] = useState(false);
  // const [modalEditQuestion, setModalEditQuestion] = useState(false);

  // const questionsBankArray = Object.keys(questions_bank).map(
  //   (questionId) => questions_bank[questionId]
  // );

  const isCurrentUser = !!user_courses[courseId];

  return (
    <PageLoader loading={loading}>
      <div className={classes.root}>
        <h4>{lectureData && lectureData.name}</h4>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <VideoCard
              poster={
                lectureData ? `${BASE_URL}/images/${lectureData.image}` : ''
              }
              src={lectureData ? `${BASE_URL}/video/${lectureData.video}` : ''}
            />
          </Grid>
          {isCurrentUser && <QuestionsBank />}
        </Grid>
      </div>
    </PageLoader>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  lectures: state.course.course_detail.lectures,
  lecture_detail: state.lecture.lecture_detail,
  questions_bank: state.question.questions_bank,
  user_courses: state.course.user_courses,
});
export default connect(mapStateToProps, {
  getLectureByLectureId,
  getQuestionByLectureId,
})(ViewLecture);
