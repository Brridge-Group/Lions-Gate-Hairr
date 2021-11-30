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
import { signup } from "../actions/auth";

const UserRegistration = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({ role: "user" });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(formData, history));
  };

  const handleChange = (e) => {
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default UserRegistration;
