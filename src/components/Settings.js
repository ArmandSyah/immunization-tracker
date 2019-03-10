import React from "react";
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

import styles from "./Styles";
import MySnackbarContent from "./MySnackbarContent";

class Settings extends React.Component {
  state = {
    checkedEmail: true,
    checkedText: false,
    value: "DaysBefore",
    loading: false,
    success: false,
    open: false,
    missingChecked: false
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleButtonClick = event => {
    event.preventDefault();
    this.setState({ open: false, missingChecked: false });
    const { loading, checkedEmail, checkedText } = this.state;

    if (!checkedEmail && !checkedText) {
      this.setState({ missingChecked: true, open: true });
      return;
    }

    if (!loading) {
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

    this.setState({ open: false, missingChecked: false });
  };

  render() {
    const { missingChecked } = this.state;
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

            {!missingChecked && (
              <Snackbar
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left"
                }}
                open={this.state.open}
                autoHideDuration={2000}
                onClose={this.handleClose}
              >
                <MySnackbarContent
                  onClose={this.handleClose}
                  variant="success"
                  message="Settings have been saved"
                />
              </Snackbar>
            )}

            {missingChecked && (
              <Snackbar
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left"
                }}
                open={this.state.open}
                autoHideDuration={2000}
                onClose={this.handleClose}
              >
                <MySnackbarContent
                  onClose={this.handleClose}
                  variant="error"
                  message="You must check at least 1 way to receive notifications"
                />
              </Snackbar>
            )}
          </form>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(Settings);
