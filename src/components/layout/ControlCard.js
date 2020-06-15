import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
// import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
// import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
// import PlayArrowIcon from "@material-ui/icons/PlayArrow";
// import SkipNextIcon from "@material-ui/icons/SkipNext";
import { Button, Grid } from "@material-ui/core";
import { Row, Col } from "reactstrap";

import FiveStars from "../custom/FiveStars";
import AddLectureModal from "../pages/lectures/AddLectureModal";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 580,
    height: 400,
  },
  controls: {
    flexGrow: 1,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

const ControlCard = ({ course, auth: { user } }) => {
  const classes = useStyles();
  const theme = useTheme();

  const { course: courseDetail, teacher } = course;

  const { name, description, active } = courseDetail;
  const [modal, setModal] = useState(false);

  const getToday = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    return (today = mm + "/" + dd + "/" + yyyy);
  };

  // const isCurrentuser = teacher.id === user.id;
  const isCurrentuser = true;

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={courseDetail.image || ""}
        title={name}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {name}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            <p>{description}</p>
          </Typography>
          <Typography component="h6" variant="body1">
            Created by: {teacher.fullname}
          </Typography>
          <Typography component="h6" variant="body1">
            Last Updated: {getToday()}
          </Typography>
        </CardContent>

        <div className={classes.controls}>
          <Row>
            {isCurrentuser && (
              <>
                <Col>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setModal(true)}
                  >
                    Add New Lecture
                  </Button>
                </Col>
                <Col>
                  <Button color="primary" variant="contained">
                    {active ? "Public" : "Private"}
                  </Button>
                </Col>
              </>
            )}
          </Row>
          <Row className="mt-3">
            <Col>
              <Button variant="contained" color="default">
                Statistics
              </Button>
            </Col>
          </Row>

          <AddLectureModal modal={modal} setModal={setModal} />
        </div>
      </div>
    </Card>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, null)(ControlCard);
