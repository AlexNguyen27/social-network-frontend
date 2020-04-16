import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Button, Container } from '@material-ui/core';

// COMPONENT
import PageTitle from "../../custom/PageTitle";
import TextFieldInputWithHeader from "../../custom/TextFieldInputWithheader";
import { loginUser } from '../../../actions/auth';


const StaffLogin = ({ errors, history, loginUser }) => {

    // FORM DATA STATE
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const { username, password } = formData;

    // Click button Login
    const onSubmit = e => {
        e.preventDefault();
        console.log(formData);
        history.push('/test')
        // loginUser(formData);
    };

    // Save on change input value
    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    return (
        <Grid container justify="center">
            <Grid item xs={12} sm={5}>
                <form onSubmit={e => onSubmit(e)}>
                    <PageTitle title="Staff Login" center="true" />
                    <TextFieldInputWithHeader
                        header="Staff ID"
                        name="username"
                        className="mt-0"
                        fullWidth
                        value={username}
                        onChange={onChange}
                        error={errors.username}
                        placeholder="Enter Staff ID"
                    />

                    <TextFieldInputWithHeader
                        header="Password"
                        name="password"
                        placeholder="Enter Password"
                        type="password"
                        value={password}
                        error={errors.password}
                        className="mt-0"
                        fullWidth
                        onChange={onChange}
                    />
                    <div className="text-center">
                        <Button
                            className="mt-3 mr-2"
                            variant="contained"
                            color="primary"
                            type="submit"

                        >
                            Login
                </Button>

                    </div>
                </form>
            </Grid>
        </Grid>
    );
}

const mapStateToProps = state => ({
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { loginUser }
)(withRouter(StaffLogin));