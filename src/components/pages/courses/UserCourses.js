import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Grid, Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import CardItem from '../../layout/CardItem';
import PageLoader from '../../custom/PageLoader';
import {
  getUserCourses,
  deleteCourse,
  getCourseById,
} from '../../../store/actions/course';
import { clearErrors } from '../../../store/actions/common';
import Swal from 'sweetalert2';
import AddCourseModal from './AddCourseModal';
import EditCourseModal from './EditCourseModal';

const UserCourses = ({
  match,
  location,
  user_courses,
  clearErrors,
  getUserCourses,
  deleteCourse,
  getCourseById,
  course_detail,
  auth: { user },
}) => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [coursesData, setCoursesData] = useState();
  // MODAL STATE
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [courseData, setCourseData] = useState();

  const coursesArray = Object.keys(user_courses).map(
    (courseId) => user_courses[courseId]
  );
  // INITIALIZE MODULE LIST
  useEffect(() => {
    getUserCourses(setLoading, user.id);
    return () => {
      clearErrors();
    };
  }, []);

  useEffect(() => {
    console.log(location);
    const searchText = location.searchText;
    const mockup = (coursesArray || []).filter((item) => {
      return (
        item.course.name.toLowerCase().match(searchText) ||
        item.course.description.toLowerCase().match(searchText)
      );
    });
    setCoursesData(mockup);
  }, [location]);

  // HANDLE ON DELETE Course
  const onDeleteCourse = (courseId) => {
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
        deleteCourse(setLoading, courseId);
      }
    });
  };
  const onEditCourse = (courseData) => {
    setModalEdit(true);
    setCourseData(courseData);
    getCourseById(setLoading, courseData.id);
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
            <AddCircleIcon className="mr-2" /> Add new course
          </Button>
        </Grid>
        {user_courses &&
          (coursesData || coursesArray).map((course) => (
            <Grid
              style={{ display: 'inline-grid' }}
              item
              xs={4}
              md={3}
              spacing={3}
            >
              <CardItem course={course.course}>
                <Button
                  size="small"
                  color="primary"
                  onClick={() =>
                    history.push(
                      `${window.location.pathname}/${course.course.id}`
                    )
                  }
                >
                  {/* <VisibilityIcon className="mr-1" />  */}
                  Detail
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => onEditCourse(course.course.id)}
                >
                  {/* <EditIcon className="mr-1" /> */}
                  Edit
                </Button>
                <Button
                  size="small"
                  color="default"
                  onClick={() => onDeleteCourse(course.course.id)}
                >
                  {/* <DeleteIcon className="mr-1" />  */}
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
        courseData={courseData}
      />
    </PageLoader>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
  user_courses: state.course.user_courses,
  course_detail: state.course.course_detail,
});
export default connect(mapStateToProps, {
  clearErrors,
  getUserCourses,
  deleteCourse,
  getCourseById,
})(UserCourses);
