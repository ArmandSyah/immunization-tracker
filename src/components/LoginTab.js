import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import { Email, Lock } from "@material-ui/icons";

const styles = theme => ({
  root: {},
  main: {
    flexGrow: 1,
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class LoginTab extends React.Component {
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
                <Email />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  id="email"
                  name="email"
                  label="Enter Your Email Address"
                  margin="normal"
                  fullWidth
                  required
                />
              </Grid>
            </Grid>

            <Grid container spacing={16} alignItems="flex-end">
              <Grid item xs={1}>
                <Lock />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  id="password"
                  name="password"
                  label="Enter Your Password"
                  margin="normal"
                  fullWidth
                  required
                />
              </Grid>
            </Grid>

            <Grid container spacing={16} alignItems="flex-end">
              <Grid item xs={1}>
                <Lock />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  id="confirm-password"
                  name="confirmPassword"
                  label="Comfirm Your Password"
                  margin="normal"
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
              className={classes.submit}
            >
              Submit
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
