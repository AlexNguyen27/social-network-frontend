import React from "react";
import { connect } from "react-redux";
import MultipleSummary from "../MultipleSummary";

const StatisticsPost = ({ users, userId, role ,userProfile}) => {

  const postName = userProfile && (role === "user" ? userProfile.posts : users[userId].posts).map((post) => post.title);
  const postReactionLike = userProfile && (role === "user" ? userProfile.posts : users[userId].posts).map((post) => post.reactions.length);

  console.log(postName)
  return (
    <>
      <h4 className="mt-4">Statistics User Post</h4>
      <MultipleSummary name={postName} like={postReactionLike}/>
    </>
  );
};

const mapStateToProps = (state) => ({
  users: state.user.users,
  role: state.auth.user.role,
  userProfile: state.user_profile.user_profile
});
export default connect(mapStateToProps, null)(StatisticsPost);
