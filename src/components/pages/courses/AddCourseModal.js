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

import { addNewCourse } from "../../../store/actions/course";
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

const AddCourseModal = ({
  errors,
  clearErrors,
  modal,
  setModal,
  addNewCourse,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // NEW ROLE NAME STATE
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [isActive, setIsActive] = useState(false);
  const [image, setImage] = useState({
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
    // console.log(error);
    dispatch({
      type: GET_ERRORS,
      errors: error,
    });

    if (JSON.stringify(error) === "{}") {
      setLoading(true);
      addNewCourse(setLoading, name, description, image.file, isActive);
    }
  };

  // Save on change input value
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeActive = (event) => {
    if (event.target.value === "true") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const handleCapture = ({ target }) => {
    const fileName = target.files[0].name;
    setImage({
      name: fileName,
      file: target.files[0],
    });
  };

  return (
    <Modal isOpen={modal} toggle={() => closeModal()} centered={true}>
      <PageLoader loading={loading} noPadding>
        <ModalHeader toggle={() => closeModal()}>Add New Course</ModalHeader>
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
                  defaultValue="New course description"
                />
              </Col>
            </Row>
            <Row className="py-2 px-3">
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  Puclic your new course?{" "}
                </FormLabel>
                <RadioGroup
                  aria-label="Public"
                  name="isActive"
                  value={isActive}
                  onChange={(e) => handleChangeActive(e)}
                >
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="Private"
                  />
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Public"
                  />
                </RadioGroup>
              </FormControl>
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
});
export default connect(mapStateToProps, { addNewCourse, clearErrors })(
  AddCourseModal
);
