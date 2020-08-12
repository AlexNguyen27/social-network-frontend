import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import PostCard from "./component/post/PostCard";
import SubjectIcon from "@material-ui/icons/Subject";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";

import SubUserInfo from "./component/post/SubUserInfo";
import Connection from "./component/connection/Connection";
import Favorites from "./component/favorite/Favorites";
import Albums from "./component/albums/Albums";

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
    padding: "24px 0px",
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

export default function ScrollableTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
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
          {/* <Tab label="Item Five" icon={<ShoppingBasket />} {...a11yProps(4)} />
          <Tab label="Item Six" icon={<ThumbDown />} {...a11yProps(5)} />
          <Tab label="Item Seven" icon={<ThumbUp />} {...a11yProps(6)} /> */}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div style={{ margin: "0px -24px" }}>
          <Grid container spacing={3} className={classes.containRoot}>
            <Grid item xs={7}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Grid item style={{ marginBottom: "20px" }}>
                  <PostCard />
                </Grid>
              ))}
            </Grid>
            <Grid item xs={5} spacing={2}>
              <SubUserInfo />
            </Grid>
          </Grid>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Connection />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Favorites />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Albums/>
      </TabPanel>
    </div>
  );
}
