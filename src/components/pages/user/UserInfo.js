import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Grid, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { Row, Col } from "reactstrap";
import { BASE_URL, GET_ERRORS } from "../../../store/actions/types";
import TextFieldInputWithHeader from "../../custom/TextFieldInputWithheader";
import ImageIcon from "@material-ui/icons/Image";
import { editUserInfo } from "../../../store/actions/user";
import PageLoader from "../../custom/PageLoader";

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
const UserInfo = ({ user, errors, editUserInfo }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [formData, setformData] = useState({
    fullname: "",
    email: "",
  });

  const [image, setImage] = useState({
    name: "",
    file: "",
  });

  const [isEdit, setIsEdit] = useState(false);
  const { fullname, email } = formData;
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
    });
  }, []);

  const onSubmit = () => {
    console.log(formData);
    const error = {};

    Object.keys(formData).map((key) => {
      if (formData[key].trim() === "") {
        error[key] = "This field is required";
      }
    });

    dispatch({
      type: GET_ERRORS,
      errors: error,
    });

    if (JSON.stringify(error) === "{}") {
      setLoading(true);
      editUserInfo(setLoading, formData);
    }
  };

  const handleCapture = ({ target }) => {
    const fileName = target.files[0].name;
    setLoading(true);
    editUserInfo(setLoading, {}, target.files[0]);
    if (target.accept.includes("image")) {
      setImage({
        name: fileName,
        file: target.files[0],
      });
    }
  };

  return (
    <PageLoader loading={loading}>
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
            <Button variant="contained" className="ml-3" component="label">
              <ImageIcon className="mr-2" /> Update avatar
              <input
                accept="image/*"
                type="file"
                onChange={handleCapture}
                style={{ display: "none" }}
              />
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
    </PageLoader>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  errors: state.errors,
});
export default connect(mapStateToProps, { editUserInfo })(UserInfo);
