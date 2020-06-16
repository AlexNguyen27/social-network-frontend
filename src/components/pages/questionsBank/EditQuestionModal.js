import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import PageLoader from "../../custom/PageLoader";

import {
  TextField,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@material-ui/core";

import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from "reactstrap";

import { editQuestion } from "../../../store/actions/question";
import { clearErrors } from "../../../store/actions/common";
// COMPONENTS
import Button from "@material-ui/core/Button";
import TextFieldInputWithHeader from "../../custom/TextFieldInputWithheader";

import { GET_ERRORS, BASE_URL } from "../../../store/actions/types";

const EditQuestionModal = ({
  errors,
  clearErrors,
  modal,
  setModal,
  editQuestion,
  question_detail,
}) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    question: "",
    answerfirst: "",
    answersecond: "",
    answerthird: "",
    answerfourth: "",
  });
  const [correctanswer, setCorrectanswer] = useState("A");

  useEffect(() => {
    //   console.log(questionId)
    // const selectedQuestion = questions_bank[questionId];
    // console.log(selectedQuestion);
    setFormData({
      question: question_detail ? question_detail.question : "",
      answerfirst: question_detail ? question_detail.answerfirst : "",
      answersecond: question_detail ? question_detail.answersecond : "",
      answerthird: question_detail ? question_detail.answerthird : "",
      answerfourth: question_detail ? question_detail.answerfourth : "",
    });

    setCorrectanswer(question_detail ? question_detail.correctanswer : "A");
  }, [question_detail]);

  const {
    question,
    answerfirst,
    answersecond,
    answerthird,
    answerfourth,
  } = formData;

  // CLOSE MODAL ACTION
  const closeModal = () => {
    setModal(false);
    clearErrors();
    setFormData({
      question: "",
      answerfirst: "",
      answersecond: "",
      answerthird: "",
      answerfourth: "",
    });
  };

  // HANDLE ON SUBMIT FROM ADD NEW GROUP
  const onSubmit = (e) => {
    e.preventDefault();

    const error = {};

    Object.keys(formData).map((key) => {
      if (formData[key].trim() === "") {
        error[key] = "This field is required";
      }
    });

    dispatch({
      type: GET_ERRORS,
      errors: error,
    });

    if (JSON.stringify(error) === "{}") {
      formData.correctanswer = correctanswer;
      setLoading(true);
      editQuestion(setLoading, formData);
    }
  };

  // Save on change input value
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange = (event) => {
    setCorrectanswer(event.target.value);
  };

  return (
    <Modal isOpen={modal} toggle={() => closeModal()} centered={true}>
      <PageLoader loading={loading} noPadding>
        <ModalHeader toggle={() => closeModal()}>
          Edit Question {question}
        </ModalHeader>

        {/** MODAL BODY */}
        <Form onSubmit={(e) => onSubmit(e)}>
          <ModalBody>
            <Row>
              <Col xs="8">
                <Col xs="12">
                  <TextFieldInputWithHeader
                    id="outlined-multiline-flexible"
                    name="question"
                    label="New question name"
                    fullWidth
                    value={question}
                    onChange={onChange}
                    error={errors.question}
                  />
                </Col>
                <Col xs="12" className="mt-4">
                  <TextField
                    id="outlined-multiline-static"
                    label="A. First Answer"
                    name="answerfirst"
                    fullWidth
                    value={answerfirst}
                    rows={2}
                    onChange={onChange}
                    variant="outlined"
                    error={errors.answerfirst}
                  />
                </Col>
                <Col xs="12" className="mt-4">
                  <TextField
                    id="outlined-static"
                    label="B. Second Answer"
                    name="answersecond"
                    fullWidth
                    value={answersecond}
                    rows={2}
                    onChange={onChange}
                    variant="outlined"
                    error={errors.answersecond}
                  />
                </Col>
                <Col xs="12" className="mt-4">
                  <TextField
                    id="outlined-static"
                    label="C. Third Answer"
                    name="answerthird"
                    fullWidth
                    value={answerthird}
                    rows={2}
                    onChange={onChange}
                    variant="outlined"
                    error={errors.answerthird}
                  />
                </Col>
                <Col xs="12" className="mt-4">
                  <TextField
                    id="outlined-multiline-static"
                    label="D. Fourth Answer"
                    name="answerfourth"
                    fullWidth
                    value={answerfourth}
                    multiline
                    rows={1}
                    onChange={onChange}
                    variant="outlined"
                    error={errors.answerfourth}
                  />
                </Col>
              </Col>
              <Col xs="4">
                <Row>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Correct answer</FormLabel>
                    <RadioGroup
                      aria-label="gender"
                      name="correctanswer"
                      value={correctanswer}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="A"
                        control={<Radio />}
                        label="A"
                      />
                      <FormControlLabel
                        value="B"
                        control={<Radio />}
                        label="B"
                      />
                      <FormControlLabel
                        value="C"
                        control={<Radio />}
                        label="C"
                      />
                      <FormControlLabel
                        value="D"
                        control={<Radio />}
                        label="D"
                      />
                    </RadioGroup>
                  </FormControl>
                </Row>
              </Col>
            </Row>
          </ModalBody>

          {/** MODAL FOOTER */}
          <ModalFooter>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
            <Button
              variant="contained"
              className="ml-2"
              onClick={() => closeModal()}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </PageLoader>
    </Modal>
  );
};
const mapStateToProps = (state) => ({
  errors: state.errors,
  question_detail: state.question.question_detail,
});
export default connect(mapStateToProps, {
  clearErrors,
  editQuestion,
})(EditQuestionModal);
