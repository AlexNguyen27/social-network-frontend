import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { green } from "@material-ui/core/colors";
import { useDispatch } from "react-redux";

import {
  TextField,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@material-ui/core";

import { getCourseById } from "../../../store/actions/course";
import { editLecture } from "../../../store/actions/lecture";
import { clearErrors } from "../../../store/actions/common";

// COMPONENTS
import Button from "@material-ui/core/Button";
import TextFieldInputWithHeader from "../../custom/TextFieldInputWithheader";

import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from "reactstrap";
import { GET_ERRORS, BASE_URL } from "../../../store/actions/types";
import PageLoader from "../../custom/PageLoader";

const EditLectureModal = ({
  errors,
  clearErrors,
  modal,
  setModal,
  lectureData,
  editLecture,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // NEW ROLE NAME STATE
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [image, setImage] = useState({
    name: "",
    file: "",
  });

  const [video, setVideo] = useState({
    name: "",
    file: "",
  });

  useEffect(() => {
    setFormData({
      name: lectureData ? lectureData.name : "",
      description: lectureData ? lectureData.description : "",
    });
  }, [lectureData]);

  const { name, description } = formData;

  // CLOSE MODAL ACTION
  const closeModal = () => {
    setModal(false);
    clearErrors();
    setFormData({});
  };

  // HANDLE ON SUBMIT FROM ADD NEW GROUP
  const onSubmit = (e) => {
    e.preventDefault();

    const error = {};

    Object.keys(formData).map((key) => {
      console.log('formdata----', formData[key])
      if (formData[key] && formData[key].trim() === "") {
        error[key] = "This field is required";
      }
    });

    // console.log(error);
    dispatch({
      type: GET_ERRORS,
      errors: error,
    });

    if (JSON.stringify(error) === "{}") {
      editLecture(lectureData.id, name, description);
    }
  };

  // Save on change input value
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCapture = ({ target }) => {
    console.log("target-----", target);
    const fileReader = new FileReader();
    // const name = target.accept.includes("image") ? "images" : "videos";
    const fileName = target.files[0].name;
    // TODO
    // ONLY UPLOAD TYPE image/*
    fileReader.readAsDataURL(target.files[0]);
    console.log(target.files[0]);
    fileReader.onload = (e) => {
      console.log(e.target);
      if (target.accept.includes("image")) {
        setImage({
          name: fileName,
          file: e.target.result,
        });
      } else {
        setVideo({
          name: fileName,
          file: e.targer.result,
        });
      }
    };
  };

  return (
    <Modal isOpen={modal} toggle={() => closeModal()} centered={true}>
      <ModalHeader toggle={() => closeModal()}>Edit Lecture {name}</ModalHeader>
      <PageLoader loading={loading}>
        {/** MODAL BODY */}
        <Form onSubmit={(e) => onSubmit(e)}>
          <ModalBody>
            <Row>
              <Col xs="12">
                <TextFieldInputWithHeader
                  id="outlined-multiline-flexible"
                  name="name"
                  label="New course name"
                  fullWidth
                  value={name}
                  onChange={onChange}
                  error={errors.name}
                />
              </Col>
              <Col xs="12" className="mt-4">
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  name="description"
                  fullWidth
                  value={description}
                  multiline
                  rows={4}
                  onChange={onChange}
                  variant="outlined"
                  error={errors.description}
                />
              </Col>
            </Row>
            <Row className="py-1">
              <Col xs="5">
                <Button variant="contained" component="label">
                  Upload Image
                  <input
                    accept="image/*"
                    type="file"
                    onChange={handleCapture}
                    style={{ display: "none" }}
                  />
                </Button>
              </Col>
              <Col xs="7" className="text-break">
                <h6>{image.name}</h6>
              </Col>  
            </Row>
            <Row className="py-1">
              <Col xs="5">
                <Button variant="contained" component="label">
                  Upload Video
                  <input
                    accept="video/*"
                    type="file"
                    onChange={handleCapture}
                    style={{ display: "none" }}
                  />
                </Button>
              </Col>
              <Col xs="7" className="text-break">
                <h6>{video.name}</h6>
              </Col>
            </Row>
          </ModalBody>

          {/** MODAL FOOTER */}
          <ModalFooter>
            <Button variant="contained" color="primary" type="submit">
              Edit
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
  course_detail: state.course.course_detail,
});
export default connect(mapStateToProps, {
  getCourseById,
  editLecture,
  clearErrors,
})(EditLectureModal);
