import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "../components/Styles";
import Input from "../components/Input";
import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index";

const UserRegistration = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({ role: "user" });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState("");

  const signup = (formData: any, history: any, errorM?: any) => async (dispatch: any) => {
    try {
      // sign up the user
      const { data } = await api.signUp(formData);
      dispatch({ type: AUTH, data });
      history.push("/");
    } catch (err: any) {
      errorM = err.response.data;
      console.log(errorM);
      setErrorMsg(errorM);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(signup(formData, history));
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPasswordClicked = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  return (
    <div className="content-wrapper">
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">Sign Up</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
              <Input
                name="email"
                label="Email Address"
                handleChange={handleChange}
                type="email"
              />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPasswordClicked}
              />
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
              />
            </Grid>
            <br />
            <p>
              <b>Are you a:</b>
            </p>
            <div>
              <label>User</label>
              &ensp;
              <input
                type="radio"
                name="role"
                value="user"
                onChange={handleChange}
                checked={formData.role === "user"}
              />
              <br />
              <label>Business Owner</label>
              &ensp;
              <input
                type="radio"
                name="role"
                value="owner"
                onChange={handleChange}
                checked={formData.role === "owner"}
              />
            </div>
            <br />
            {errorMsg && <p style={{ color: "red" }}> {errorMsg} </p>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <p>
              Have an account? <a href="user-signin">Click Here</a> to Login.
            </p>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default UserRegistration;
