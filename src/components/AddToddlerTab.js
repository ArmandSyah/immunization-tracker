import React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  Input,
  FormControl,
  Chip
} from "@material-ui/core";
import { Person, Face, DateRange } from "@material-ui/icons";
import { DatePicker } from "material-ui-pickers";
import Icon from "@mdi/react";
import { mdiPill, mdiClipboardPulse, mdiCalendar, mdiAccount } from "@mdi/js";
import Grid from "@material-ui/core/Grid";

import styles from "./Styles";

const medicationList = ["A", "B", "C"];
const healthConcernsList = ["A", "B", "C", "D"];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

class AddToddlerTab extends React.Component {
  state = {
    name: "",
    selectedDate: null,
    medications: [],
    healthConcerns: []
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
    const { classes } = this.props;
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
                  format="dd/MM/yyyy"
                  openTo="year"
                  value={selectedDate}
                  onChange={this.handleDateChange}
                  views={["year", "month", "day"]}
                  clearable
                  disableFuture
                  fullWidth
                  required
                />
              </Grid>
            </Grid>

            <Grid spacing={16} container alignItems="flex-end">
              <Grid item xs={1}>
                <Icon path={mdiPill} />
              </Grid>
              <Grid item xs={11}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="select-multiple" required>
                    Medications Taken
                  </InputLabel>
                  <Select
                    value={medications}
                    onChange={this.handleMedicationsChange}
                    input={<Input id="select-multiple" />}
                    renderValue={selected => (
                      <div className={classes.chips}>
                        {selected.map(value => (
                          <Chip
                            key={value}
                            label={value}
                            className={classes.chip}
                          />
                        ))}
                      </div>
                    )}
                    MenuProps={MenuProps}
                    multiple
                  >
                    {medicationList.map(medication => (
                      <MenuItem key={medication} value={medication}>
                        {medication}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid spacing={16} container alignItems="flex-end">
              <Grid item xs={1}>
                <Icon path={mdiClipboardPulse} />
              </Grid>
              <Grid item xs={11}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="select-multiple" required>
                    Health Concerns
                  </InputLabel>
                  <Select
                    value={healthConcerns}
                    onChange={this.handleHealthConcerns}
                    input={<Input id="select-multiple" />}
                    renderValue={selected => (
                      <div className={classes.chips}>
                        {selected.map(value => (
                          <Chip
                            key={value}
                            label={value}
                            className={classes.chip}
                          />
                        ))}
                      </div>
                    )}
                    MenuProps={MenuProps}
                    multiple
                  >
                    {healthConcernsList.map(healthConcerns => (
                      <MenuItem key={healthConcerns} value={healthConcerns}>
                        {healthConcerns}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
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
