import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import Colors from "../../constants/Colors";
import ViewText from "./ViewText";
import Visibility from "@material-ui/icons/Visibility";

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

const PostCard = ({ liked, userProfile, post, authUserId }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { imageUrl } = userProfile || {};

  const { title, description, status, createdAt, comments, reactions } =
    post || {};

  let isLiked = false;
  if (reactions && reactions.length) {
    isLiked = !!reactions.find((reaction) => reaction.userId === authUserId);
  }

  const handleOnLike = () => {
    // creae like
  };

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
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={moment(createdAt).format("LLLL")}
      />
      <CardMedia
        className={classes.media}
        image={"https://i.ytimg.com/vi/ddxsa3_hv-w/maxresdefault.jpg"}
        title="Paella dish"
      />
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
        ></Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          style={{ color: isLiked ? Colors.like : "" }}
          aria-label="add to favorites"
          onClick={() => handleOnLike()}
        >
          <FavoriteIcon />
          <span style={{ fontSize: "16px" }}>
            {reactions && reactions.length}
          </span>
        </IconButton>
        <IconButton aria-label="comment">
          <ChatIcon />
          <span style={{ fontSize: "16px" }}>
            {comments && comments.length}
          </span>
        </IconButton>
        <IconButton aria-label="share" style={{ marginLeft: "0" }}>
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <Visibility />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <ViewText textBody={description} />I
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default PostCard;
