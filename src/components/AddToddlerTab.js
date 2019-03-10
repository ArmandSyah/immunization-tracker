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
    selectedDate: null,
    medications: "",
    healthConcerns: ""
  };

  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  handleMedicationsChange = event => {
    this.setState({ medications: event.target.value });
  };

  handleHealthConcerns = event => {
    this.setState({ healthConcerns: event.target.value });
  };

  render() {
    const { classes, handleToddlerRegisterState } = this.props;
    const { name, selectedDate, medications, healthConcerns } = this.state;
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
            <Grid spacing={16} container alignItems="flex-end">
              <Grid item xs={1}>
                <Icon path={mdiAccount} />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  id="email"
                  name="email"
                  label="Enter Name"
                  margin="normal"
                  value={name}
                  onChange={this.handleNameChange}
                  autoFocus
                  fullWidth
                  required
                />
              </Grid>
            </Grid>

            <Grid spacing={16} container alignItems="flex-end">
              <Grid item xs={1}>
                <Icon path={mdiCalendar} />
              </Grid>
              <Grid item xs={11}>
                <DatePicker
                  label="Date of birth"
                  format="MM/dd/yyyy"
                  openTo="year"
                  value={selectedDate}
                  onChange={this.handleDateChange}
                  views={["year", "month", "day"]}
                  placeholder="MM/dd/yyyy"
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
                  keyboard
                />
              </Grid>
            </Grid>

            <Grid spacing={16} container alignItems="flex-end">
              <Grid item xs={1}>
                <Icon path={mdiPill} />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  name="medication"
                  label="Enter Medications Taken"
                  margin="normal"
                  value={medications}
                  onChange={this.handleMedicationsChange}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>

            <Grid spacing={16} container alignItems="flex-end">
              <Grid item xs={1}>
                <Icon path={mdiClipboardPulse} />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  name="medication"
                  label="Enter Medications Taken"
                  margin="normal"
                  value={healthConcerns}
                  onChange={this.handleHealthConcerns}
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
