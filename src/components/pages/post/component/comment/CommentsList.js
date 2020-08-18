import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PageLoader from "../../../../custom/PageLoader";

const CommentsList = ({}) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {}, []);

  return (
    <PageLoader loading={loading}>
      <h1>comment here</h1>
    </PageLoader>
  );
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {})(CommentsList);
