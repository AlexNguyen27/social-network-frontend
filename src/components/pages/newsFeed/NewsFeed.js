import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import PostCard from "../../custom/PostCard";
import SubNewsFeed from "./component/SubNewsFeed";
import { getPosts } from "../../../store/actions/post";
import { getCategories } from "../../../store/actions/category";

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

const NewsFeed = ({ getPosts, getCategories }) => {
  const classes = useStyles();

  useEffect(() => {
    getPosts();
    getCategories();
  }, []);

  return (
    <div className={classes.root}>
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
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Grid item style={{ marginBottom: "20px" }}>
                    <PostCard />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { getPosts, getCategories })(NewsFeed);
