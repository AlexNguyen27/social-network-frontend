import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import EventIcon from "@material-ui/icons/Event";
import moment from "moment";
import PersonIcon from "@material-ui/icons/Person";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: "100%",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  header: {
    fontStyle: "italic",
    marginLeft: "12px",
    marginTop: "15px",
    marginBottom: 0,
  },
}));
const PopularArticles = () => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h5" gutterBottom className={classes.header}>
        Popular Articles
      </Typography>
      <List
        component="nav"
        className={classes.root}
        aria-label="mailbox folders"
      >
        {[0, 1, 2].map((item) => (
          <>
            <ListItem button>
              <Grid container spacing={2}>
                <Grid item>
                  <ButtonBase className={classes.image}>
                    <img
                      className={classes.img}
                      alt="complex"
                      src="https://media1.tenor.com/images/140709d2e805f45737247a0c6a0164de/tenor.gif?itemid=17694777g"
                    />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography variant="body1" gutterBottom>
                        Even the all-powerful Pointing has no control
                      </Typography>
                      <div>
                        <Typography variant="caption" color="textSecondary">
                          <EventIcon />
                          {moment().format("MMM Do YYYY")}
                        </Typography>
                      </div>
                      <Typography variant="caption" color="textSecondary">
                        <PersonIcon />
                        Dave Lewis
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="caption"
                        style={{ cursor: "pointer" }}
                      >
                        Like
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </>
  );
};

export default PopularArticles;
