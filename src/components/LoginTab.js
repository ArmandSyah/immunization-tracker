import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import { InputAdornment } from "@material-ui/core";
import { Email, Lock } from "@material-ui/icons";
import Icon from "@mdi/react";
import { mdiEmail, mdiLockQuestion } from "@mdi/js";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import styles from "./Styles";

const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;

class LoginTab extends React.Component {
  state = {
    email: "",
    password: "",
    confirmedPassword: "",
    emailValid: false,
    emailFocus: false
  };

  handleEmailChange = e => {
    let { emailValid } = this.state;
    const email = e.target.value;

    emailValid = emailRegex.test(email);
    console.log(email);
    console.log(emailValid);

    this.setState({ email: email, emailValid: emailValid });
  };

  handleEmailFocus = e => {
    this.setState({ emailFocus: true });
  };

  handleEmailBlur = e => {
    this.setState({ emailFocus: false });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  handleConfirmedPasswordChange = e => {
    this.setState({ confirmedPassword: e.target.value });
  };

  render() {
    const { classes } = this.props;
    const {
      email,
      password,
      confirmedPassword,
      emailValid,
      emailFocus
    } = this.state;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up and start keeping track of all your toddlers vaccines
          </Typography>

          <form className={classes.form}>
            <Grid
              spacing={16}
              container
              alignItems={
                !emailValid && email.length > 0 && !emailFocus
                  ? "center"
                  : "flex-end"
              }
            >
              <Grid item xs={1}>
                <Icon path={mdiEmail} />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  id="email"
                  name="email"
                  label="Enter Your Email Address"
                  margin="normal"
                  value={email}
                  onChange={this.handleEmailChange}
                  onFocus={this.handleEmailFocus}
                  onBlur={this.handleEmailBlur}
                  error={!emailValid && email.length > 0 && !emailFocus}
                  helperText={
                    !emailValid && email.length > 0 && !emailFocus
                      ? "Enter a proper email address (ex: example@test.com)"
                      : ""
                  }
                  fullWidth
                  required
                />
              </Grid>
            </Grid>

            <Grid container spacing={16} alignItems="flex-end">
              <Grid item xs={1}>
                <Icon path={mdiLockQuestion} />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  id="password"
                  name="password"
                  label="Enter Your Password"
                  margin="normal"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>

            <Grid container spacing={16} alignItems="flex-end">
              <Grid item xs={1}>
                <Icon path={mdiLockQuestion} />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  id="confirm-password"
                  name="confirmPassword"
                  label="Comfirm Your Password"
                  margin="normal"
                  value={this.state.confirmedPassword}
                  onChange={this.handleConfirmedPasswordChange}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={
                email.length === 0 ||
                password.length === 0 ||
                confirmedPassword.length === 0 ||
                !emailValid
              }
              onClick={this.props.handleLoginState}
              className={classes.submit}
            >
              Create Account
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

LoginTab.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginTab);
