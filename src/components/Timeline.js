import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { DatePicker } from "material-ui-pickers";

import {
  Button,
  Typography,
  withStyles,
  CssBaseline,
  Modal,
  Slide,
  IconButton,
  TextField
} from "@material-ui/core";
import Icon from "@mdi/react";
import { mdiBaby, mdiNeedle, mdiPlusCircle, mdiClose } from "@mdi/js";

import styles from "./Styles";

const addDays = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

class VaccinationRecord extends React.Component {
  render() {
    const { name, vaccinationDate, vaccineName } = this.props;
    const options = { year: "numeric", month: "long", day: "numeric" };

    return (
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date={vaccinationDate.toLocaleDateString("en-US", options)}
        iconStyle={{ background: "#87A878", color: "#fff" }}
        icon={<Icon path={mdiNeedle} />}
      >
        <h3 className="vertical-timeline-element-title">{`${name} received a vacination for ${vaccineName}`}</h3>
      </VerticalTimelineElement>
    );
  }
}

const AddVaccinationStyles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 100,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

function getModalStyle() {
  const top = 20;
  const left = 30;

  return {
    top: `${top}%`,
    margin: "auto",
    left: `${left}%`
    // transform: `translate(-${top}%, -${left}%)`,
  };
}

class TimelineAddModal extends React.Component {
  state = {
    vaccineName: "",
    vaccinationDate: null
  };

  handleVaccinationNameChange = event => {
    this.setState({ vaccineName: event.target.value });
  };

  handleDateChange = date => {
    this.setState({ vaccinationDate: date });
  };

  handleSubmit = () => {
    const { addNewVaccinationRecord } = this.props;
    const { vaccineName, vaccinationDate } = this.state;

    addNewVaccinationRecord(vaccineName, vaccinationDate);
  };

  render() {
    const { classes, modalOpen, handleModalClose } = this.props;
    const { vaccineName, vaccinationDate } = this.state;
    return (
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        style={{
          alignItems: "center",
          justifyContent: "center",
          overflow: "scroll"
        }}
      >
        <Slide direction="up" in={modalOpen} mountOnEnter unmountOnExit>
          <div className={classes.paper} style={getModalStyle()}>
            <span
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between"
              }}
            >
              <Typography variant="title">Add new vaccine record</Typography>
              <IconButton onClick={handleModalClose}>
                <Icon path={mdiClose} size={1} />
              </IconButton>
            </span>
            <Typography variant="subtitle1">Vaccine Name</Typography>
            <TextField
              id="outlined-multiline-static"
              label="Vaccine Name"
              multiline
              defaultValue="Default Value"
              margin="normal"
              variant="filled"
              value={vaccineName}
              onChange={this.handleVaccinationNameChange}
              fullWidth
              required
            />

            <Typography variant="subtitle1">
              Date Vaccine will be Received
            </Typography>
            <DatePicker
              label="Vaccination Received"
              format="MM/dd/yyyy"
              openTo="year"
              value={vaccinationDate}
              onChange={this.handleDateChange}
              views={["year", "month", "day"]}
              placeholder="MM/dd/yyyy"
              mask={value =>
                // handle clearing outside if value can be changed outside of the component
                value
                  ? [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]
                  : []
              }
              variant="filled"
              style={{ marginTop: "16px" }}
              clearable
              disablePast
              fullWidth
              required
            />
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "flex-end"
              }}
            >
              <Button
                variant="contained"
                className={classes.button}
                onClick={this.handleSubmit}
                disabled={vaccinationDate === null || vaccineName.length === 0}
                color="primary"
              >
                Add Vaccination Record
              </Button>
            </div>
          </div>
        </Slide>
      </Modal>
    );
  }
}

const VaccineAdd = withStyles(AddVaccinationStyles)(TimelineAddModal);

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datesUsed: [this.props.dateOfBirth],
      events: [],
      today: Date.now(),
      latestVaccinationDate: Date.now(),
      openAddModal: false
    };
  }

  componentDidMount() {
    const { name, dateOfBirth } = this.props;
    const { datesUsed } = this.state;

    let options = { year: "numeric", month: "long", day: "numeric" };
    const es = [];

    es.unshift(
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date={dateOfBirth.toLocaleDateString("en-US", options)}
        iconStyle={{ background: "#87A878", color: "#fff" }}
        icon={<Icon path={mdiBaby} />}
      >
        <h3 className="vertical-timeline-element-title">{`Your baby, ${name} was born`}</h3>
      </VerticalTimelineElement>
    );

    let days = 60;
    const vaccineList1 = [
      "diphtheria",
      "tetanus",
      "pertusis",
      "haemophilus influenza type b",
      "pneumococcal conjugate",
      "rotavirus"
    ];
    vaccineList1.forEach(vaccine => {
      es.unshift(
        <VaccinationRecord
          name={name}
          vaccinationDate={addDays(dateOfBirth, days)}
          vaccineName={vaccine}
        />
      );
      datesUsed.unshift(addDays(dateOfBirth, days));
      days += 7;
    });

    days = 365;
    const vaccineList2 = [
      "pneumococcal conjugate",
      "meningococcal conjugate (Men-C-C)",
      "measles",
      "mumps",
      "rubella"
    ];
    vaccineList2.forEach(vaccine => {
      es.unshift(
        <VaccinationRecord
          name={name}
          vaccinationDate={addDays(dateOfBirth, days)}
          vaccineName={vaccine}
        />
      );
      datesUsed.unshift(addDays(dateOfBirth, days));
      days += 7;
    });

    this.setState({ events: es });
  }

  handleModalAddVaccinationRecord = () => {
    this.setState({ openAddModal: true });
  };

  handleModalClose = () => {
    this.setState({ openAddModal: false });
  };

  addNewVaccinationRecord = (vaccineName, vaccinationDate) => {
    const { name } = this.props;
    const { datesUsed, events } = this.state;
    const record = (
      <VaccinationRecord
        name={name}
        vaccinationDate={vaccinationDate}
        vaccineName={vaccineName}
      />
    );
    var trueIndex = -1;
    let trueIndexFound = false;
    datesUsed.forEach((date, index) => {
      if (!trueIndexFound) {
        if (datesUsed.length === index + 1) {
          trueIndex = index;
          trueIndexFound = true;
        } else if (date <= vaccinationDate && date >= datesUsed[index + 1]) {
          trueIndex = index;
          trueIndexFound = true;
        }
      }
    });

    events.splice(trueIndex, 0, record);
    datesUsed.splice(trueIndex, 0, vaccinationDate);

    this.setState({ events, datesUsed, openAddModal: false });
  };

  render() {
    const { classes } = this.props;
    const { events, openAddModal } = this.state;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <div
          style={{
            paddingTop: "30px",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Typography
            component="h1"
            variant="h2"
            align="center"
            style={{ marginTop: "10px", marginBottom: "10px" }}
          >
            Immunization Records Timeline
          </Typography>
          <Button
            variant="contained"
            className={classes.button}
            onClick={this.handleModalAddVaccinationRecord}
            style={{
              marginTop: "10px",
              marginBottom: "10px",
              alignSelf: "center"
            }}
            color="primary"
          >
            <Icon
              style={{ marginRight: "5px" }}
              path={mdiPlusCircle}
              size={1}
            />
            Add Vaccination Record
          </Button>
          <VerticalTimeline layout="one-column">{events}</VerticalTimeline>
          {openAddModal && (
            <VaccineAdd
              modalOpen={openAddModal}
              addNewVaccinationRecord={this.addNewVaccinationRecord}
              handleModalClose={this.handleModalClose}
            />
          )}
        </div>
      </main>
    );
  }
}

export default withStyles(styles)(Timeline);
