import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import { Row, Col } from "reactstrap";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DateFnsUtils from "@date-io/date-fns";

import {
  BASE_URL,
  GET_ERRORS,
  CLEAR_ERRORS,
} from "../../../store/actions/types";
import {
  capitalizeSnakeCase,
  trimObjProperties,
} from "../../../utils/formatString";

import PageLoader from "../../custom/PageLoader";
import TextFieldInputWithHeader from "../../custom/TextFieldInputWithheader";
import ImageIcon from "@material-ui/icons/Image";
import { editUserInfo } from "../../../store/actions/user";

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
const UserInfo = ({ current_user, user, errors, editUserInfo }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [formData, setformData] = useState({
    username: "",
    quote: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    githubUsername: "",
  });

  const [image, setImage] = useState({
    name: "",
    file: "",
  });

  const [isEdit, setIsEdit] = useState(false);
  const {
    username,
    firstName,
    quote,
    lastName,
    email,
    phone,
    address,
    githubUsername,
  } = formData;
  // Save on change input value
  const onChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const [selectedDate, setSelectedDate] = React.useState(
  //   new Date("2014-08-18T21:11:54")
  // );

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  //   setformData({
  //     ...formData,
  //     dob: date,
  //   });
  // };

  const setInit = () => {
    if (current_user && JSON.stringify(current_user) !== "{}") {
      // console.log('herer-------------------');
      setformData({
        username: current_user.username || "",
        firstName: current_user.firstName || "",
        lastName: current_user.lastName || "",
        quote: current_user.quote || "",
        email: current_user.email || "",
        phone: current_user.phone || "",
        address: current_user.address || "",
        githubUsername: current_user.githubUsername || "",
      });
    } else {
      setformData({
        username: user.username || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        quote: user.quote || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        githubUsername: user.githubUsername || "",
      });
    }
  };

  useEffect(() => {
    setInit();
  }, []);

  useEffect(() => {
    setInit();
  }, [current_user]);

  const onSubmit = () => {
    // console.log(formData);
    const formatData = trimObjProperties(formData);
    editUserInfo(setLoading, formatData);
    if (!errors) {
      onCancel();
    }
    // }
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

  const onCancel = () => {
    setIsEdit(false);
    setInit();
    dispatch({
      type: CLEAR_ERRORS,
    });
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
          </Grid>
          <Grid item xs={12}>
            <Row>
              <Col xs="6">
                {Object.keys(formData).map((key) => (
                  <Paper className={[classes.info, "mt-2"].join(" ")}>
                    {isEdit ? (
                      <TextFieldInputWithHeader
                        id="outlined-multiline-flexible"
                        name={key}
                        label={capitalizeSnakeCase(key)}
                        fullWidth
                        type="fullname"
                        value={formData[key]}
                        onChange={onChange}
                        error={errors[key]}
                      />
                    ) : (
                      <>
                        {capitalizeSnakeCase(key)}: {formData[key]}
                      </>
                    )}
                  </Paper>
                ))}
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
                      <Button variant="contained" onClick={() => onCancel()}>
                        Cancel
                      </Button>
                    </Row>
                  </Col>
                )}
              </Col>
              <Col xs="6">
                <Paper className={classes.paper}>
                  <img
                    src={
                      current_user && current_user.image
                        ? `${BASE_URL}/images/${current_user.image}`
                        : "https://vcdn-giaitri.vnecdn.net/2020/03/27/lisa55_1200x0.jpg?"
                    }
                    alt="Girl in a jacket"
                    width="100%"
                    height={400}
                  />
                </Paper>
                <Row style={{ marginTop: '20px', justifyContent: 'center'}}>
                  <Button
                    variant="contained"
                    className="ml-3"
                    component="label"
                  >
                    <ImageIcon className="mr-2" /> Update avatar
                    <input
                      accept="image/*"
                      type="file"
                      onChange={handleCapture}
                      style={{ display: "none" }}
                    />
                  </Button>
                </Row>
              </Col>
            </Row>
          </Grid>
        </Grid>
      </div>
    </PageLoader>
  );
};

const mapStateToProps = (state) => ({
  current_user: state.user.current_user,
  user: state.auth.user,
  errors: state.errors,
});
export default connect(mapStateToProps, { editUserInfo })(UserInfo);
