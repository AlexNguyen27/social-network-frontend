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

import { addNewLecture } from "../../../store/actions/lecture";
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

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const AddLectureModal = ({
  errors,
  clearErrors,
  modal,
  setModal,
  course: { id: courseId },
  addNewLecture,
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

  const { name, description } = formData;

  // CLOSE MODAL ACTION
  const closeModal = () => {
    setModal(false);
    clearErrors();
    setFormData({
      name: "",
      description: "",
    });
    setImage({
      name: "",
      file: "",
    });
    setVideo({
      name: "",
      file: "",
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

    if (image.name.trim() === "") {
      error.image = "Please select an image!";
    }

    if (video.name.trim() === "") {
      error.video = "Please select an video!";
    }
    dispatch({
      type: GET_ERRORS,
      errors: error,
    });

    if (JSON.stringify(error) === "{}") {
      setLoading(true);
      addNewLecture(
        setLoading,
        courseId,
        name,
        description,
        image.file,
        video.file
      );
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
    const fileName = target.files[0].name;
    if (target.accept.includes("image")) {
      setImage({
        name: fileName,
        file: target.files[0],
      });
    } else {
      setVideo({
        name: fileName,
        file: target.files[0],
      });
    }
  };

  return (
    <Modal isOpen={modal} toggle={() => closeModal()} centered={true}>
      <PageLoader loading={loading} noPadding>
        <ModalHeader toggle={() => closeModal()}>Add New Lecture</ModalHeader>

        {/** MODAL BODY */}
        <Form onSubmit={(e) => onSubmit(e)}>
          <ModalBody>
            <Row>
              <Col xs="12">
                <TextFieldInputWithHeader
                  id="outlined-multiline-flexible"
                  name="name"
                  label="New lecture name"
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
            <Row className="py-1 mt-2">
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
            {errors.image && (
              <Row>
                <p style={{ color: "red" }} className="px-3 py-2 m-0">
                  {errors.image}
                </p>
              </Row>
            )}
            <Row className="py-1 mt-2">
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
            {errors.image && (
              <Row>
                <p style={{ color: "red" }} className="px-3 py-2 m-0">
                  {errors.image}
                </p>
              </Row>
            )}
          </ModalBody>
          {/** MODAL FOOTER */}
          <ModalFooter>
            <Button variant="contained" color="primary" type="submit">
              Add
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
  course: state.course.course_detail.course,
});
export default connect(mapStateToProps, {
  clearErrors,
  addNewLecture,
})(AddLectureModal);
