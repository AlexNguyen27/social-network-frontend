import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Colors from "../../../../../constants/Colors";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "20px",
    backgroundColor: Colors.light_pink,
  },
  details: {
    display: "flex",
    flexDirection: "row",
  },
  content: {
    flex: "1 0 auto",
    paddingBottom: "0px !important",
  },
  cover: {
    borderRadius: "130px",
    width: 150,
    height: 150,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  btn: {
    marginTop: "16px",
  },
  title: {
    color: Colors.black,
    lineHeight: 1.5,
  },
}));

export default function UserCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Grid container justify="center">
        <CardMedia
          className={classes.cover}
          image="https://i.ytimg.com/vi/rEfNiR8A1Og/maxresdefault.jpg"
          title="Live from space album cover"
        />
      </Grid>
      <Grid container justify="center" style={{ textAlign: "center" }}>
        <CardContent className={classes.content}>
          <Typography component="h4" variant="h4" className={classes.title}>
            Shaking Chloe
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            className={classes.title}
          >
            Shaking Chloe gonna make you movin
          </Typography>
          <Button variant="contained" color="secondary" className={classes.btn}>
            See profile
          </Button>
        </CardContent>
      </Grid>
    </Card>
  );
}
