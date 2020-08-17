import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import PostCard from "../../custom/PostCard";
import SubjectIcon from "@material-ui/icons/Subject";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import Button from "@material-ui/core/Button";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";

import SubUserInfo from "./SubUserInfo";
import Connection from "./connection/Connection";
import Favorites from "./favorite/Favorites";
import Albums from "./albums/Albums";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  containRoot: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  btn: {
    marginBottom: "12px",
  },
}));

const ScrollableTabs = ({ users, user_profile, authUserId, posts }) => {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const connections = ((user_profile || {}).followed || []).map((con) => ({
    userId: users[con.toUserId].id,
    firstName: users[con.toUserId].firstName,
    lastName: users[con.toUserId].lastName,
    githubUsername: users[con.toUserId].githubUsername,
    quote: users[con.toUserId].quote,
  }));

  const favoritePosts = user_profile && (user_profile.userFavoritePosts || []).map((item) => ({
    title: posts[item.id].title,
    description: posts[item.id].description,
    status: posts[item.id].status,
    createdAt: posts[item.id].createdAt,
    comments: posts[item.id].comments,
    reactions: posts[item.id].reactions,
  }));

  return (
    <div className={classes.root}>
      {console.log(connections)}
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Posts" icon={<SubjectIcon />} {...a11yProps(0)} />
          <Tab label="Connections" icon={<PeopleAltIcon />} {...a11yProps(1)} />
          <Tab label="Favorites" icon={<FavoriteIcon />} {...a11yProps(2)} />
          <Tab label="Albums" icon={<PhotoLibraryIcon />} {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div style={{ margin: "0px -24px" }}>
          <Grid container spacing={3} className={classes.containRoot}>
            <Grid item xs={7}>
              {!user_profile.posts ||
                (!user_profile.posts.length && <h1>NO POSTS</h1>)}
              {authUserId === user_profile.id && (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.btn}
                  onClick={() => {history.push('/add-new-post')}}
                >
                  Add new post
                </Button>
              )}
              {user_profile.posts &&
                user_profile.posts.map((item) => (
                  <Grid item style={{ marginBottom: "20px" }}>
                    <PostCard
                      userProfile={user_profile}
                      post={item}
                      authUserId={authUserId}
                    />
                  </Grid>
                ))}
            </Grid>
            <Grid item xs={5} spacing={2}>
              <SubUserInfo userInfo={user_profile} connections={connections} />
            </Grid>
          </Grid>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {!connections.length && <h1>NO CONNECTIONS</h1>}
        <Connection connections={connections} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        {!user_profile.userFavoritePosts ||
          (!user_profile.userFavoritePosts.length && <h1>NO FAVORITE</h1>)}
        <Favorites
          favoritePosts={favoritePosts}
          userProfile={user_profile}
          authUserId={authUserId}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Albums />
      </TabPanel>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user_profile:
    state.user_profile.user_profile || state.user_profile.friend_profile,
  users: state.user.users,
  authUserId: state.auth.user.id,
  posts: state.post.posts,
});

export default connect(mapStateToProps, {})(ScrollableTabs);
