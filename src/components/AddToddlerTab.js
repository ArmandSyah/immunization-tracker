import React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { TextField, Button } from "@material-ui/core";
import { Face } from "@material-ui/icons";
import { DatePicker } from "material-ui-pickers";
import Icon from "@mdi/react";
import { mdiPill, mdiClipboardPulse, mdiCalendar, mdiAccount } from "@mdi/js";
import Grid from "@material-ui/core/Grid";

import styles from "./Styles";

class AddToddlerTab extends React.Component {
  state = {
    name: "",
    nameValid: false,
    nameHelpMessage: "Type in your toddler's name",
    nameFocus: false,
    nameFirstShow: true,
    selectedDate: null,
    dateValid: false,
    dateHelpMessage:
      "Type in your toddler's date of birth in the following format: MM/dd/yyyy",
    medications: "",
    medicationsValid: false,
    medicationHelpMessage:
      "Type in the medication your toddler is currently on",
    medicationFirstShow: true,
    healthConcerns: "",
    healthConcernsValid: false,
    healthConcernsHelpMessage:
      "Type any other health concerns your toddler has",
    healthConcernsFirstShow: true
  };

  handleNameChange = event => {
    let { nameValid, nameHelpMessage, nameFirstShow } = this.state;
    if (nameFirstShow) {
      this.setState({ nameFirstShow: false });
    }
    const name = event.target.value;

    nameValid = name.length > 0;
    nameHelpMessage = nameValid
      ? "Toddler name field has been filled"
      : "Do not leave toddler name field empty";

    this.setState({ name, nameValid, nameHelpMessage });
  };

  handleNameFocus = e => {
    this.setState({ nameFocus: true });
  };

  handleNameBlur = e => {
    this.setState({ nameFocus: false });
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  handleMedicationsChange = event => {
    let {
      medicationsValid,
      medicationHelpMessage,
      medicationFirstShow
    } = this.state;
    if (medicationFirstShow) {
      this.setState({ medicationFirstShow: false });
    }
    const medications = event.target.value;

    medicationsValid = medications.length > 0;
    medicationHelpMessage = medicationsValid
      ? "Medications field has been filled"
      : "Do not leave medication field empty";

    this.setState({ medications, medicationsValid, medicationHelpMessage });
  };

  handleMedicationFocus = e => {
    this.setState({ medicationFocus: true });
  };

  handleMedicationBlur = e => {
    this.setState({ medicationFocus: false });
  };

  handleHealthConcerns = event => {
    let {
      healthConcernsValid,
      healthConcernsHelpMessage,
      healthConcernsFirstShow
    } = this.state;
    if (healthConcernsFirstShow) {
      this.setState({ healthConcernsFirstShow: false });
    }
    const healthConcerns = event.target.value;

    healthConcernsValid = healthConcerns.length > 0;
    healthConcernsHelpMessage = healthConcernsValid
      ? "Health concerns field has been filled"
      : "Do not leave Health concerns field empty";

    this.setState({
      healthConcerns,
      healthConcernsValid,
      healthConcernsHelpMessage
    });
  };

  handleHealthConcernsFocus = e => {
    this.setState({ healthConcernsFocus: true });
  };

  handleHealthConcernsBlur = e => {
    this.setState({ healthConcernsFocus: false });
  };

  render() {
    const { classes, handleToddlerRegisterState } = this.props;
    const {
      name,
      nameValid,
      nameFocus,
      nameFirstShow,
      nameHelpMessage,
      selectedDate,
      medications,
      medicationsValid,
      medicationFocus,
      medicationFirstShow,
      medicationHelpMessage,
      healthConcerns,
      healthConcernsValid,
      healthConcernsFocus,
      healthConcernsFirstShow,
      healthConcernsHelpMessage
    } = this.state;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Face />
          </Avatar>
          <Typography component="h1" variant="h5">
            Enter your toddler's info, and start tracking your toddlers
            vaccinations
          </Typography>

          <form className={classes.form}>
            <Grid spacing={16} container alignItems="center">
              <Grid item xs={1}>
                <Icon path={mdiAccount} />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  id="email"
                  name="email"
                  label="Enter Name"
                  margin="normal"
                  variant="filled"
                  value={name}
                  onChange={this.handleNameChange}
                  onFocus={this.handleNameFocus}
                  onBlur={this.handleNameBlur}
                  error={
                    !nameValid &&
                    name.length === 0 &&
                    !nameFocus &&
                    !nameFirstShow
                  }
                  helperText={nameHelpMessage}
                  autoFocus
                  fullWidth
                  required
                />
              </Grid>
            </Grid>

            <Grid
              spacing={16}
              style={{ paddingTop: "12px", paddingBottom: "8px" }}
              container
              alignItems="center"
            >
              <Grid item xs={1}>
                <Icon path={mdiCalendar} />
              </Grid>
              <Grid item xs={11}>
                <DatePicker
                  label="Date of birth"
                  format="MM/dd/yyyy"
                  openTo="year"
                  variant="filled"
                  value={selectedDate}
                  onChange={this.handleDateChange}
                  views={["year", "month", "day"]}
                  placeholder="MM/dd/yyyy"
                  helperText="Click on this field to start selecting your date"
                  mask={value =>
                    // handle clearing outside if value can be changed outside of the component
                    value
                      ? [
                          /\d/,
                          /\d/,
                          "/",
                          /\d/,
                          /\d/,
                          "/",
                          /\d/,
                          /\d/,
                          /\d/,
                          /\d/
                        ]
                      : []
                  }
                  clearable
                  disableFuture
                  fullWidth
                  required
                />
              </Grid>
            </Grid>

            <Grid spacing={16} container alignItems="center">
              <Grid item xs={1}>
                <Icon path={mdiPill} />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  name="medication"
                  label="Enter Medications Taken"
                  margin="normal"
                  variant="filled"
                  value={medications}
                  onChange={this.handleMedicationsChange}
                  onFocus={this.handleMedicationFocus}
                  onBlur={this.handleMedicationBlur}
                  error={
                    !medicationsValid &&
                    medications.length === 0 &&
                    !medicationFocus &&
                    !medicationFirstShow
                  }
                  helperText={medicationHelpMessage}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>

            <Grid spacing={16} container alignItems="center">
              <Grid item xs={1}>
                <Icon path={mdiClipboardPulse} />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  name="medication"
                  label="Enter Medications Taken"
                  margin="normal"
                  variant="filled"
                  value={healthConcerns}
                  onChange={this.handleHealthConcerns}
                  onFocus={this.handleHealthConcernsFocus}
                  onBlur={this.handleHealthConcernsBlur}
                  error={
                    !healthConcernsValid &&
                    healthConcerns.length === 0 &&
                    !healthConcernsFocus &&
                    !healthConcernsFirstShow
                  }
                  helperText={healthConcernsHelpMessage}
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
              disabled={
                healthConcerns.length === 0 ||
                name.length === 0 ||
                medications === 0 ||
                selectedDate === null
              }
              onClick={handleToddlerRegisterState(name, selectedDate)}
            >
              Submit Toddler Information
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

AddToddlerTab.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddToddlerTab);
