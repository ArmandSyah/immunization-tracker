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
import { Email, Lock } from "@material-ui/icons";
import Icon from "@mdi/react";
import { mdiEmail, mdiLockQuestion } from "@mdi/js";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import styles from "./Styles";

class LoginTab extends React.Component {
  state = {
    email: "",
    password: "",
    confirmedPassword: ""
  };

  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  handleConfirmedPasswordChange = e => {
    this.setState({ confirmedPassword: e.target.value });
  };

  render() {
    const { classes } = this.props;
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
            <Grid spacing={16} container alignItems="flex-end">
              <Grid item xs={1}>
                <Icon path={mdiEmail} />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  id="email"
                  name="email"
                  label="Enter Your Email Address"
                  margin="normal"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
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
