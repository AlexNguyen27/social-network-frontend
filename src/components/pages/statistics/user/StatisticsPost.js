import React from 'react';
import { connect } from 'react-redux';
import MultipleSummary from '../MultipleSummary';

// TODO: thống kê số sinh viên đã theo học trong từng khóa học theo từng tháng
// get all course
// get all lecture
// get all total student enroll
const StatisticsPost = ({ }) => {
  // const userCourses = Object.keys(user_courses).map(
  //   (courseId) => user_courses[courseId]
  // );

  const posts = [
    {name: 'like', total: 100},
    {name: 'dislike', total: 10},
  ]
  const postName = posts.map((post) => post.name);
  const total = posts.map((post) =>
    post.total
  );
  const postDislike = posts.map((post) =>
    post.dislike
  );

  // const postLike = [345, 4545, 1343, 2345];

  return (
    <>
      {/* {console.log('postLike', total)} */}
      <h4>Statistics Post</h4>
      <MultipleSummary
        name={postName}
        like={total}
        dislike={postDislike}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
});
export default connect(mapStateToProps, null)(StatisticsPost);
