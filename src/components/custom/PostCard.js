import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import moment from "moment";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Tooltip from "@material-ui/core/Tooltip";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import Colors from "../../constants/Colors";
import ViewText from "./ViewText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import LockIcon from "@material-ui/icons/Lock";
import { truncateMultilineString } from "../../utils/formatString";
import { likeReaction } from "../../store/actions/like";
import ReportModal from "../pages/post/component/ReportModal";

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
  post,
  likeReaction,
  isCurrentAuth,
  authProfile,
  authId,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const [openReportModal, setOpenReportModal] = useState(false);
  const isAuth = post && post.userId === authId;

  const handleClick = (event) => {
    if(!isAuth) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    id,
    title,
    categoryId,
    description,
    status,
    createdAt,
    comments,
    user: { imageUrl  = ""},
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

  const handleOnReportPost = () => {
    setOpenReportModal(true);
    setAnchorEl(null);
  };

  const totalComments = comments ? comments.length : 0;

  const isPrivate = post && status === "private";
  return (
    <>
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
              <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleOnReportPost()}>
                  Report this post
                </MenuItem>
              </Menu>
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
              onClick={
                () => post && history.push(`/edit-post/${id}`)
                // window.open(`/edit-post/${id}`, "_blank")
              }
            >
              <EditIcon />
            </IconButton>
          )}
          <IconButton
            className={classes.expand}
            style={{ fontSize: "16px" }}
            onClick={() => post && history.push(`/view-post/${id}`)}
            aria-label="show more"
          >
            SEE MORE
          </IconButton>
        </CardActions>
      </Card>
      <ReportModal
        postId={post && id}
        modal={openReportModal}
        setModal={setOpenReportModal}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  authProfile: state.user_profile.user_profile,
  authId: state.auth.user.id,
});
export default connect(mapStateToProps, { likeReaction })(PostCard);
