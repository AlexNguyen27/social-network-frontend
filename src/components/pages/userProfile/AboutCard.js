import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { green, pink } from "@material-ui/core/colors";
import Colors from "../../../constants/Colors";
import { followToUser } from "../../../store/actions/follow";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "20px",
    // backgroundColor: '#c3aed6'
    backgroundColor: Colors.light_purple,
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
    width: 250,
    height: 250,
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

const AboutCard = ({
  authId,
  userProfile = {},
  authProfile = {},
  followToUser,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  // todo: get user profile to check connection
  const [connect, setConnect] = useState(
    authProfile &&
      authProfile.followed.find((item) => item.toUserId === userProfile.id)
  );

  useEffect(() => {
    setConnect( authProfile &&
      authProfile.followed.find((item) => item.toUserId === userProfile.id))
  }, [userProfile])

  const { imageUrl, firstName, lastName, quote } = userProfile || {};

  const handleOnFollow = () => {
    followToUser(userProfile.id, setConnect);
  };

  return (
    <Card className={classes.root}>
      <Grid container justify="center">
        <CardMedia
          className={classes.cover}
          image={
            imageUrl || "https://i.ytimg.com/vi/rEfNiR8A1Og/maxresdefault.jpg"
          }
          title="Live from space album cover"
        />
      </Grid>
      <Grid container justify="center" style={{ textAlign: "center" }}>
        <CardContent className={classes.content}>
          <Typography component="h4" variant="h4" className={classes.title}>
            {firstName} {lastName}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            className={classes.title}
          >
            {quote}
          </Typography>
          {userProfile.id !== authId && (
            <Button
              variant="contained"
              color="primary"
              className={classes.btn}
              onClick={() => handleOnFollow()}
            >
              {!connect ? "Add to connection" : "Followed"}
            </Button>
          )}
        </CardContent>
      </Grid>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  authId: state.auth.user.id,
  authProfile: state.user_profile.user_profile,
});

export default connect(mapStateToProps, { followToUser })(AboutCard);
