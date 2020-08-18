import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getPostById } from "../../../../store/actions/post";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import ViewText from "../../../custom/ViewText";
import { Grid, Typography } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import CommentsList from "./comment/CommentsList";
import PageTitle from "../../../custom/PageTitle";
import PageLoader from "../../../custom/PageLoader";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import Visibility from "@material-ui/icons/Visibility";
import Colors from "../../../../constants/Colors";
import { likeReaction } from "../../../../store/actions/like";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  //   expandOpen: {
  //     transform: "rotate(180deg)",
  //   },
  avatar: {
    backgroundColor: red[500],
  },
}));
const ViewPost = ({
  postId,
  getPostById,
  selectedPost,
  authUserId,
  likeReaction,
}) => {
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [currentLike, setCurrentLike] = useState(0);


  useEffect(() => {
    getPostById(setLoading, postId, setCurrentLike, setIsLiked);
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const {
    title,
    description,
    user: { firstName, lastName, githubUsername, imageUrl: avatar } = {},
    comments,
    reactions,
    updatedAt,
  } = selectedPost || {};

  const handleOnLike = () => {
    likeReaction(selectedPost.id, setIsLiked, setCurrentLike);
  };

  const totalLikes =
    selectedPost && selectedPost.reactions
      ? selectedPost.reactions.length && isLiked
        ? reactions.length
        : reactions.length + currentLike
      : 0;
  const totalComments = comments && comments.length;

  return (
    <PageLoader loading={loading}>
      <PageTitle title={title} center editMode="false" />
      <Grid container>
        <Grid item xs={12}>
          <Grid container justify="flex-start">
            <Grid item xs={1} className="text-center">
              <img
                className="userImage"
                src={
                  avatar ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT8yP_D9E4ioICCCVIu6Y0tIRDDZ6JCKEdFhA&usqp=CAU"
                }
                alt="user image"
              />
            </Grid>
            <Grid item xs={8}>
              <Grid item>
                <Typography variant="h6">
                  {firstName} {lastName}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle2">
                  <a
                    className="aSubText"
                    target="_blank"
                    href={`https://github.com/${githubUsername}`}
                  >
                    <GitHubIcon className="mr-1" /> {githubUsername}
                  </a>
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="subtitle2"
                  style={{ color: "#888", marginTop: "5px" }}
                >
                  {moment(updatedAt).format("MMMM Do YYYY, h:mm:ss A")}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <hr className="mb-0" />
          <ViewText textBody={description} className="viewMode" />
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={5}>
              <IconButton
                style={{ color: isLiked ? Colors.like : "" }}
                aria-label="add to favorites"
                onClick={() => handleOnLike()}
              >
                <FavoriteIcon />
                <span className="like">{totalLikes}</span>
              </IconButton>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="Show more comment"
              >
                <ChatIcon />
                <span className="like">{totalComments}</span>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <CommentsList />
              </CardContent>
            </Collapse>
          </Grid>
        </Grid>
      </Grid>
    </PageLoader>
  );
};

const mapStateToProps = (state) => ({
  categories: state.category.categories,
  authUserId: state.auth.user.id,
  selectedPost: state.post.selected_post,
});
export default connect(mapStateToProps, { getPostById, likeReaction })(
  ViewPost
);
