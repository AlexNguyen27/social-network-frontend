import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";
import { Row, Col } from "reactstrap";

import { Grid, Button } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import DeleteIcon from "@material-ui/icons/Delete";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";

import {
  deleteQuestion,
  getQuestionById,
} from "../../../store/actions/question";
import AddQuestionModal from "./AddQuestionModal";
import EditQuestionModal from "./EditQuestionModal";
import Colors from "../../../constants/Colors";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
}));
const QuestionsBank = ({ questions_bank, deleteQuestion, getQuestionById }) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [modalAddQuestion, setModalAddQuestion] = useState(false);
  const [modalEditQuestion, setModalEditQuestion] = useState(false);

  const questionsBankArray = Object.keys(questions_bank).map(
    (questionId) => questions_bank[questionId]
  );

  // HANDLE ON DELETE Course
  const onDeleteQuestion = (questionId) => {
    Swal.fire({
      title: `Are you sure to delete ?`,
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        setLoading(true);
        deleteQuestion(setLoading, questionId);
      }
    });
  };

  const onEditQuestion = (questionId) => {
    setModalEditQuestion(true);
    getQuestionById(setLoading, questionId);
  };

  return (
    <>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setModalAddQuestion(true)}
        >
          <QuestionAnswerIcon className="mr-2" />
          Add New Question
        </Button>
      </Grid>
      <Grid item xs={6}>
        <h4>Quizes and Answers</h4>
      </Grid>
      <Grid item xs={12}>
        {questionsBankArray.length > 0 ? (
          <>
            {questionsBankArray.map((question, index) => (
              <div className="mb-2">
                <Paper className={classes.paper}>
                  <Row>
                    <Col
                      xs="10"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <h5 style={{ color: Colors.accent }}>
                        Question {index + 1}: {question.question}{" "}
                      </h5>
                    </Col>
                    <Col xs="2">
                      <Row className="justify-content-center">
                        <IconButton
                          color="default"
                          onClick={() => onEditQuestion(question.id)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={() => onDeleteQuestion(question.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Row>
                    </Col>
                  </Row>
                  <Col xs="12">
                    <h6 style={{ color: Colors.black }}>
                      A: {question.answerfirst}
                    </h6>
                    <h6 style={{ color: Colors.black }}>
                      B: {question.answersecond}
                    </h6>
                    <h6 style={{ color: Colors.black }}>
                      C: {question.answerthird}
                    </h6>
                    <h6 style={{ color: Colors.black }}>
                      D: {question.answerfourth}
                    </h6>
                  </Col>
                  <Col>
                    <h6 style={{ color: "green"}}>Correct answer: {question.correctanswer}</h6>
                  </Col>
                </Paper>
              </div>
            ))}
          </>
        ) : (
          <Paper className={classes.paper}>No testing</Paper>
        )}
      </Grid>
      <AddQuestionModal
        modal={modalAddQuestion}
        setModal={setModalAddQuestion}
      />

      <EditQuestionModal
        modal={modalEditQuestion}
        setModal={setModalEditQuestion}
        // questionId={selectedId}
      />
    </>
  );
};
const mapStateToProps = (state) => ({
  questions_bank: state.question.questions_bank,
});
export default connect(mapStateToProps, { deleteQuestion, getQuestionById })(
  QuestionsBank
);
