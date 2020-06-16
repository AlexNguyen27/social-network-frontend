import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Grid, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { Row, Col } from "reactstrap";
import { BASE_URL } from "../../../store/actions/types";
import TextFieldInputWithHeader from "../../custom/TextFieldInputWithheader";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  info: {
    padding: theme.spacing(2),
    // textAlign: "",
    fontSize: "16px",
    color: theme.palette.text.secondary,
  },
}));
const UserInfo = ({ user, errors }) => {
  const classes = useStyles();
  const [formData, setformData] = useState({
    fullname: "",
    email: "",
    username: "",
  });

  const [isEdit, setIsEdit] = useState(false);
  const { fullname, email, username } = formData;
  // Save on change input value
  const onChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setformData({
      fullname: user.fullname,
      email: user.email || "",
      username: user.username || "",
    });
  }, []);

  const onSubmit = () => {
    console.log(formData);
    
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsEdit(true)}
          >
            <EditIcon className="mr-2" /> Edit Info
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Row>
            <Col xs="6">
              <Paper className={classes.paper}>
                <img
                  src={
                    user && user.image
                      ? `${BASE_URL}/images/${user.image}`
                      : "https://vcdn-giaitri.vnecdn.net/2020/03/27/lisa55_1200x0.jpg?"
                  }
                  alt="Girl in a jacket"
                  width="100%"
                  height={400}
                />
              </Paper>
            </Col>
            <Col xs="6">
              <Paper className={classes.info}>
                {isEdit ? (
                  <TextFieldInputWithHeader
                    id="outlined-multiline-flexible"
                    name="fullname"
                    label="Full name"
                    fullWidth
                    type="fullname"
                    value={fullname}
                    onChange={onChange}
                    error={errors.fullname}
                  />
                ) : (
                  <>Full name: {fullname}</>
                )}
              </Paper>
              <Paper className={[classes.info, "mt-2"].join(" ")}>
                {isEdit ? (
                  <TextFieldInputWithHeader
                    id="outlined-multiline-flexible"
                    name="email"
                    label="Email"
                    fullWidth
                    type="email"
                    value={email}
                    onChange={onChange}
                    error={errors.email}
                  />
                ) : (
                  <>Email: {email}</>
                )}
              </Paper>
              {isEdit && (
                <Col className="mt-4">
                  <Row className="justify-content-center">
                    <Button
                      variant="contained"
                      color="primary"
                      className="mr-4"
                      onClick={onSubmit}
                    >
                      Save
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => setIsEdit(false)}
                    >
                      Cancel
                    </Button>
                  </Row>
                </Col>
              )}
            </Col>
          </Row>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  errors: state.errors,
});
export default connect(mapStateToProps, null)(UserInfo);
