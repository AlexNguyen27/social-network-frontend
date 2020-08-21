import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import moment from "moment";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Tooltip from "@material-ui/core/Tooltip";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import Colors from "../../constants/Colors";
import ViewText from "./ViewText";
import Visibility from "@material-ui/icons/Visibility";
import LockIcon from "@material-ui/icons/Lock";
import { truncateMultilineString } from "../../utils/formatString";
import { likeReaction } from "../../store/actions/like";

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
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const PostCard = ({
  liked,
  userProfile,
  post,
  likeReaction,
  isCurrentAuth,
  authProfile,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [expanded, setExpanded] = React.useState(false);

  const { imageUrl } = userProfile || {};

  const {
    id,
    title,
    categoryId,
    description,
    status,
    createdAt,
    comments,
    reactions,
  } = post || {};

  const [isLiked, setIsLiked] = useState(
    authProfile && authProfile.userFavoritePosts.find((item) => item.id === id)
  );
  const [totalLike, setTotalLike] = useState(reactions && reactions.length);

  // update reaction of post
  const handleOnLike = () => {
    likeReaction(id, categoryId, title, description, setIsLiked, setTotalLike);
  };

  useEffect(() => {
    setIsLiked(
      authProfile &&
        authProfile.userFavoritePosts.find((item) => item.id === id)
    );
  }, [handleOnLike, setIsLiked]);

  const totalComments = comments ? comments.length : 0;

  const isPrivate = post && status === "private";
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            src={imageUrl || "../../images/no_image.jpg"}
          ></Avatar>
        }
        action={
          <>
            {isPrivate && (
              <Tooltip title="Private">
                <IconButton aria-label="delete">
                  <LockIcon />
                </IconButton>
              </Tooltip>
            )}
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          </>
        }
        title={title}
        subheader={moment(createdAt).format("LLLL")}
      />

      {/* <CardMedia
        className={classes.media}
        image={"https://i.ytimg.com/vi/ddxsa3_hv-w/maxresdefault.jpg"}
        title="Paella dish"
      /> */}
      <CardContent>
        <ViewText
          textBody={truncateMultilineString(description, 200)}
          className="viewMode"
        />
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          style={{ color: isLiked ? Colors.like : "" }}
          aria-label="add to favorites"
          onClick={() => handleOnLike()}
        >
          <FavoriteIcon />
          <span className="like">{totalLike}</span>
        </IconButton>
        <IconButton aria-label="comment">
          <ChatIcon />
          <span className="like">{totalComments}</span>
        </IconButton>
        {isCurrentAuth && (
          <IconButton
            aria-label="edit"
            onClick={() => post && window.open(`/edit-post/${id}`, "_blank")}
          >
            <EditIcon />
          </IconButton>
        )}
        <IconButton
          className={classes.expand}
          style={{ fontSize: "16px" }}
          onClick={() => post && window.open(`/view-post/${id}`, "_blank")}
          aria-label="show more"
        >
          SEE MORE
        </IconButton>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  authProfile: state.user_profile.user_profile,
});
export default connect(mapStateToProps, { likeReaction })(PostCard);
