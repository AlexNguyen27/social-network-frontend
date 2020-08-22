import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import PostCard from "../../custom/PostCard";
import SubNewsFeed from "./component/SubNewsFeed";
import { getPosts } from "../../../store/actions/post";
import { getUsers } from "../../../store/actions/user";
import { getCategories } from "../../../store/actions/category";
import PageLoader from "../../custom/PageLoader";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    margin: "10px 0 0 0",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const NewsFeed = ({ getPosts, role, getCategories, authUserId, getUsers, posts }) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts(() => {});
    getCategories(() => {});
    getUsers(setLoading);
  }, []);

  const postsArr = posts && Object.keys(posts).map(key => posts[key]);

  return (
    <div className={classes.root}>
      <PageLoader loading={loading}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div style={{ margin: "0px " }}>
              <Grid
                container
                justify="center"
                spacing={5}
                className={classes.containRoot}
              >
                <Grid item xs={4}>
                  <SubNewsFeed />
                </Grid>
                <Grid item xs={8}>
                  {postsArr &&
                    postsArr.length > 0 &&
                    postsArr.map((item) => (
                      <Grid item style={{ marginBottom: "20px" }}>
                        <PostCard
                          post={item}
                          authUserId={authUserId}
                          isCurrentAuth={item.user.id === authUserId || role === "admin"}
                        />
                      </Grid>
                    ))}
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </PageLoader>
    </div>
  );
};

const mapStateToProps = (state) => ({
  categories: state.category.categories,
  authUserId: state.auth.user.id,
  posts: state.post.posts,
  role: state.auth.user.role
});
export default connect(mapStateToProps, { getPosts, getCategories, getUsers })(
  NewsFeed
);
