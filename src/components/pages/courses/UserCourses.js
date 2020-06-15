import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { Grid, Button } from "@material-ui/core";

import CardItem from "../../layout/CardItem";
import PageLoader from "../../custom/PageLoader";
import {
  getUserCourses,
  deleteCourse,
  getCourseById,
} from "../../../store/actions/course";
import { clearErrors } from "../../../store/actions/common";
import Swal from "sweetalert2";
import AddCourseModal from "./AddCourseModal";
import EditCourseModal from "./EditCourseModal";

const UserCourses = ({
  match,
  user_courses,
  clearErrors,
  getUserCourses,
  deleteCourse,
  getCourseById,
  auth: { user },
}) => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  // MODAL STATE
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [courseId, setCourseId] = useState();

  // INITIALIZE MODULE LIST
  useEffect(() => {
    getUserCourses(setLoading, user.id);
    return () => {
      clearErrors();
    };
  }, []);

  // HANDLE ON DELETE Course
  const onDeleteCourse = (courseId) => {
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
        deleteCourse(courseId);
      }
    });
  };
  const onEditCourse = (courseId) => {
    console.log(courseId);
    setModalEdit(true);
    setCourseId(courseId);
  };

  return (
    <PageLoader loading={loading}>
      <h1>{console.log(match)}</h1>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setModalAdd(true)}
          >
            Add new course
          </Button>
        </Grid>
        {user_courses &&
          Object.keys(user_courses).map((key) => (
            <Grid item xs={4} md={3} spacing={3}>
              <CardItem course={user_courses[key].course}>
                <Button
                  size="small"
                  color="primary"
                  onClick={() =>
                    history.push(`${window.location.pathname}/${key}`)
                  }
                >
                  Detail
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => onEditCourse(key)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="default"
                  onClick={() => onDeleteCourse(key)}
                >
                  Delete
                </Button>
              </CardItem>
            </Grid>
          ))}
      </Grid>
      <AddCourseModal modal={modalAdd} setModal={setModalAdd} />
      <EditCourseModal
        modal={modalEdit}
        setModal={setModalEdit}
        courseId={courseId}
      />
    </PageLoader>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
  user_courses: state.course.user_courses,
});
export default connect(mapStateToProps, {
  clearErrors,
  getUserCourses,
  deleteCourse,
  getCourseById,
})(UserCourses);
