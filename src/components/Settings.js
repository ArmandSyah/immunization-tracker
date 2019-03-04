import React from "react";
import classNames from "classnames";
import {
  withStyles,
  CssBaseline,
  Typography,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormLabel,
  Radio,
  RadioGroup,
  Button,
  CircularProgress,
  Snackbar,
  Paper,
  SnackbarContent,
  IconButton
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import WarningIcon from "@material-ui/icons/Warning";

import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";

import styles from "./Styles";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const snackbarStyles = theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
});

const MySnackbarContent = props => {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
};

const MySnackbarContentWrapper = withStyles(snackbarStyles)(MySnackbarContent);

class Settings extends React.Component {
  state = {
    checkedEmail: false,
    checkedText: false,
    value: "DaysBefore",
    loading: false,
    success: false,
    open: false
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleButtonClick = () => {
    if (!this.state.loading) {
      this.setState(
        {
          success: false,
          loading: true
        },
        () => {
          this.timer = setTimeout(() => {
            this.setState({
              loading: false,
              success: true,
              open: true
            });
          }, 2000);
        }
      );
    }
  };

  handleCheckedChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleRadioChange = event => {
    this.setState({ value: event.target.value });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Settings
          </Typography>
          <form className={classes.form}>
            <Grid container className={classes.control} justify="flex-end">
              <Grid item xs={12}>
                <FormLabel>Receive Notifcations Through</FormLabel>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <div style={{}}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.checkedEmail}
                          onChange={this.handleCheckedChange("checkedEmail")}
                          color="secondary"
                          value="checkedEmail"
                          disabled={this.state.loading}
                        />
                      }
                      label="Email"
                    />
                  </div>
                  <div style={{}}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.checkedText}
                          onChange={this.handleCheckedChange("checkedText")}
                          color="secondary"
                          value="checkedText"
                          disabled={this.state.loading}
                        />
                      }
                      label="Text Messaging"
                    />
                  </div>
                </div>
              </Grid>
            </Grid>

            <Grid container className={classes.control} justify="flex-end">
              <Grid item xs={12}>
                <FormLabel>Notify Frequency</FormLabel>
                <RadioGroup
                  aria-label="NotificationFrequency"
                  name="frequency"
                  className={classes.group}
                  onChange={this.handleRadioChange}
                  value={this.state.value}
                  disabled={this.state.loading}
                >
                  <FormControlLabel
                    value="DaysBefore"
                    control={<Radio disabled={this.state.loading} />}
                    label="Days Before"
                  />
                  <FormControlLabel
                    value="HoursBefore"
                    control={<Radio disabled={this.state.loading} />}
                    label="Hours Before"
                  />
                </RadioGroup>
              </Grid>
            </Grid>

            <div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={this.state.loading}
                onClick={this.handleButtonClick}
              >
                Save Settings
              </Button>
              {this.state.loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>

            <Snackbar
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              open={this.state.open}
              autoHideDuration={6000}
              onClose={this.handleClose}
            >
              <MySnackbarContentWrapper
                onClose={this.handleClose}
                variant="success"
                message="Settings have been saved"
              />
            </Snackbar>
          </form>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(Settings);
