import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import FolderIcon from "@material-ui/icons/Folder";
import PageviewIcon from "@material-ui/icons/Pageview";
import { green, pink } from "@material-ui/core/colors";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Paper } from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { albums } from "../../../mockup/albums";
import ImageIcon from "@material-ui/icons/Image";
import EventIcon from "@material-ui/icons/Event";
import CallIcon from "@material-ui/icons/Call";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  avatar: {
    margin: "0 auto",
  },
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
    margin: "0 auto",
  },
  green: {
    color: "#fff",
    backgroundColor: green[500],
    margin: "0 auto",
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

const SubUserInfo = () => {
  const classes = useStyles();
  return (
    <>
      {/* ABOUT ME */}
      <Paper className={classes.paper}>
        <Typography variant="h5" bold>
          About Me
        </Typography>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          sed urna in justo euismod condimentum.
        </Typography>
        <hr></hr>
        <Grid container>
          <Grid item xs={2}>
            <Avatar className={classes.avatar}>
              <EventIcon />
            </Avatar>
          </Grid>
          <Grid item xs={10}>
            <Typography>Born</Typography>
            <Typography variant="caption">Jan 9, 1994</Typography>
          </Grid>
        </Grid>
        <hr></hr>
        <Grid container>
          <Grid item xs={2}>
            <Avatar className={classes.pink}>
              <CallIcon />
            </Avatar>
          </Grid>
          <Grid item xs={10}>
            <Typography>Phone</Typography>
            <Typography variant="caption">(+62)8765432190</Typography>
          </Grid>
        </Grid>
        <hr></hr>
        <Grid container>
          <Grid item xs={2}>
            <Avatar className={classes.green}>
              <HomeIcon />
            </Avatar>
          </Grid>
          <Grid item xs={10}>
            <Typography>Address</Typography>
            <Typography variant="caption">
              Chicendo Street no.105 Block A/5A - Barcelona, Spain
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      {/* My albums */}
      <Paper className={classes.paper}>
        <Typography variant="h5" style={{ paddingBottom: "10px" }}>
          My Albums (99)
        </Typography>
        <div className={classes.root}>
          <GridList cellHeight={160} className={classes.gridList} cols={3}>
            {albums.map((tile) => (
              <GridListTile key={tile.img} cols={tile.cols || 1}>
                <img src={tile.img} alt={tile.title} />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </Paper>
      {/* MY CONNECTION */}
      <Paper className={classes.paper}>
        <Typography variant="h5" bold>
          My Connection
        </Typography>
        <hr></hr>
        <Grid container>
          <Grid item xs={2}>
            <Avatar className={classes.avatar}>
              <ImageIcon />
            </Avatar>
          </Grid>
          <Grid item xs={10}>
            <Typography>Thanh Nguyen</Typography>
            <Typography variant="caption">2 Matual Connection</Typography>
          </Grid>
        </Grid>
        <hr></hr>
        <Grid container>
          <Grid item xs={2}>
            <Avatar className={classes.pink}>
              <ImageIcon />
            </Avatar>
          </Grid>
          <Grid item xs={10}>
            <Typography>Cuong Nguyen</Typography>
            <Typography variant="caption">2 Matual Connection</Typography>
          </Grid>
        </Grid>
        <hr></hr>
        <Grid container>
          <Grid item xs={2}>
            <Avatar className={classes.green}>
              <ImageIcon />
            </Avatar>
          </Grid>
          <Grid item xs={10}>
            <Typography>Duc Nguyen</Typography>
            <Typography variant="caption">2 Matual Connection</Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default SubUserInfo;
