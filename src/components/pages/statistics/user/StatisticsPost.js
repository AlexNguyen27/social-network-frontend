import React from "react";
import { connect } from "react-redux";
import MultipleSummary from "../MultipleSummary";

const StatisticsPost = ({ users, userId }) => {

  const postName = (users[userId].posts || []).map((post) => post.title);
  const postReactionLike = (users[userId].posts || []).map((post) => post.reactions.length);

  return (
    <>
      <h4 className="mt-4">Statistics User Post</h4>
      <MultipleSummary name={postName} like={postReactionLike}/>
    </>
  );
};

const mapStateToProps = (state) => ({
  users: state.user.users,
});
export default connect(mapStateToProps, null)(StatisticsPost);
