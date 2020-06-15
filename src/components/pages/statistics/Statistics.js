import React from "react";
import { connect } from "react-redux";
import MultipleSummary from "./MultipleSummary";

// TODO: thống kê số sinh viên đã theo học trong từng khóa học theo từng tháng
// get all course
// get all lecture
// get all total student enroll
const Statistics = ({ user_courses }) => {
  const userCourses = Object.keys(user_courses).map(
    (courseId) => user_courses[courseId]
  );

  const courseNameArr = userCourses.map((course) => course.course.name);
  const totalStudentEnrollArr = userCourses.map((course) => 10);

  return (
    <>
      <MultipleSummary
        courseName={courseNameArr}
        totalStudentEnroll={totalStudentEnrollArr}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  user_courses: state.course.user_courses,
});
export default connect(mapStateToProps, null)(Statistics);
