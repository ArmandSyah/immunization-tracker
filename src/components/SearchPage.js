import React from "react";
import {
  CssBaseline,
  TextField,
  InputAdornment,
  IconButton,
  withStyles,
  Typography,
  CircularProgress,
  Snackbar,
  Modal,
  Slide,
  Button,
  Grid,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Avatar
} from "@material-ui/core";
import { Search } from "@material-ui/icons";

import Icon from "@mdi/react";
import { mdiNeedle, mdiPencil, mdiClose } from "@mdi/js";

import styles from "./Styles";
import MySnackbarContent from "./MySnackbarContent";

import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const vaccines = [
  {
    name: "Rotarix",
    disease: "Rotavirus",
    sideEffects:
      "Decreased Urination, Frequent Thirst, Dry Mouth and Throat, Dizziness",
    description:
      "This vaccine is used to prevent a certain virus infection (rotavirus) in infants and young children. Rotavirus can cause fever, vomiting, and diarrhea. Although nearly all children become infected with this virus before they are 5 years old, some severe cases can lead to a dangerous (rarely fatal) loss of body fluids (dehydration). Most severe cases occur in children between 6 to 24 months old. This vaccine helps the body produce immunity (protection) to prevent infection with rotavirus or to lessen the severity of an infection."
  },
  {
    name: "Rotateq",
    disease: "Rotavirus",
    sideEffects: "Mild Fever, Diarrhea, Vomiting",
    description:
      "This vaccine is used to prevent a certain virus infection (rotavirus) in infants and young children. Rotavirus can cause fever, vomiting, and diarrhea. Although nearly all children become infected with this virus before they are 5 years old, some severe cases can lead to a dangerous (rarely fatal) loss of body fluids (dehydration). Most severe cases occur in children between 6 to 24 months old. This vaccine helps the body produce immunity (protection) to prevent infection with rotavirus or to lessen the severity of an infection."
  },
  {
    name: "Varivax",
    disease: "Chickenpox",
    sideEffects: "Pain, Fever, Rash, Itching",
    description:
      "This medication is used to help prevent varicella virus infection (commonly known as chickenpox). Chickenpox is a common childhood illness, but can cause more serious illnesses in people who have not yet had either chickenpox or this vaccine. Serious (rarely fatal) problems (such as pneumonia and inflammation of the liver or brain) may rarely occur from this infection, and first-time infections in adults may be very severe. It may also cause a very serious brain/liver condition called Reyes syndrome in children or teenagers. If you are infected while pregnant, your unborn infant may be harmed. Vaccination during childhood may help prevent this infection and the problems that can occur. The virus in this vaccine is alive, but it has been weakened (attenuated) and therefore has a decreased ability to cause illness. It works by helping the body produce immunity (protection) that will prevent you from getting chickenpox, or will lessen the seriousness of the infection. As with any vaccine, it may not fully protect everyone who receives it."
  }
];

const searchResultStyles = theme => ({
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
  };
}

class NoResult extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          paddingTop: "30px"
        }}
      >
        <CssBaseline />
        <Avatar className={classes.avatar}>
          <Search fontSize="large" />
        </Avatar>
        <Typography component="h1" variant="h2">
          No search results found, try another query
        </Typography>
      </div>
    );
  }
}

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    const { vaccine } = this.props;
    const { description, sideEffects } = vaccine;
    this.state = {
      modalOpen: false,
      updated: false,
      currentDescription: description,
      currentSideEffects: sideEffects,
      ...vaccine
    };
  }

  handleModalOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleModalClose = () => {
    const { description, sideEffects } = this.state;
    this.setState({
      modalOpen: false,
      currentDescription: description,
      sideEffects: sideEffects
    });
  };

  handleDescriptionOnChange = event => {
    this.setState({ currentDescription: event.target.value });
  };

  handleSideEffectsOnChange = event => {
    this.setState({ currentSideEffects: event.target.value });
  };

  handleModalUpdate = () => {
    const { currentDescription, currentSideEffects } = this.state;
    const { handleUpdateSuccessful } = this.props;
    this.setState({
      description: currentDescription,
      sideEffects: currentSideEffects,
      modalOpen: false
    });
    handleUpdateSuccessful();
  };

  render() {
    const { classes } = this.props;
    const {
      modalOpen,
      name,
      disease,
      sideEffects,
      description,
      currentDescription,
      currentSideEffects
    } = this.state;
    return (
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        iconStyle={{ background: "#87A878", color: "#fff" }}
        icon={<Icon path={mdiNeedle} />}
        color="#DBF9B8"
      >
        <span
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between"
          }}
        >
          <h1 className="vertical-timeline-element-title">{`Vaccine Name: ${name}`}</h1>
          <IconButton onClick={this.handleModalOpen}>
            <Icon path={mdiPencil} size={1} />
          </IconButton>
        </span>
        <h3>{`Disease vaccine used for: ${disease}`}</h3>
        <h3>Description</h3>
        <p>{description}</p>
        <h3>Side Effects include</h3>
        <p>{sideEffects}</p>
        <Modal
          open={modalOpen}
          onClose={this.handleModalClose}
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
                <Typography variant="title">
                  Update Vaccine Information
                </Typography>
                <IconButton onClick={this.handleModalClose}>
                  <Icon path={mdiClose} size={1} />
                </IconButton>
              </span>
              <Typography variant="subtitle1">{`Vaccine Name: ${name}`}</Typography>
              <Typography variant="subtitle1">{`Disease: ${disease}`}</Typography>
              <Typography variant="subtitle1">Description</Typography>
              <TextField
                id="outlined-multiline-static"
                label="Edit Description"
                multiline
                defaultValue="Default Value"
                margin="normal"
                variant="filled"
                value={currentDescription}
                onChange={this.handleDescriptionOnChange}
                fullWidth
              />

              <Typography variant="subtitle1">Side Effects</Typography>
              <TextField
                id="outlined-multiline-static"
                label="Edit Side Effects"
                defaultValue="Default Value"
                margin="normal"
                variant="filled"
                value={currentSideEffects}
                onChange={this.handleSideEffectsOnChange}
                fullWidth
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
                  onClick={this.handleModalUpdate}
                  color="primary"
                >
                  Update
                </Button>
              </div>
            </div>
          </Slide>
        </Modal>
      </VerticalTimelineElement>
    );
  }
}

const VaccineSearchResult = withStyles(searchResultStyles)(SearchResult);
const NoVaccineSearchResult = withStyles(styles)(NoResult);

class SearchPage extends React.Component {
  state = {
    searchValue: "",
    foundVaccines: [],
    searchClicked: false,
    loading: false,
    success: false,
    open: false,
    update: false,
    firstSearch: true,
    searchType: "Vaccination",
    searchEmpty: false
  };

  handleSearchOnChange = event => {
    this.setState({
      searchEmpty: false,
      searchValue: event.target.value
    });
  };

  handleSearchOnClick = () => {
    const { searchValue, searchType } = this.state;

    if (searchValue.length === 0) {
      this.setState({ searchEmpty: true });
      return;
    }

    this.setState({ foundVaccines: [], searchClicked: false });

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
          }, 1000);
        }
      );
    }

    const foundVaccines =
      searchType === "Vaccination"
        ? vaccines.filter(vaccine =>
            vaccine.name.toLowerCase().startsWith(searchValue.toLowerCase())
          )
        : vaccines.filter(vaccine =>
            vaccine.disease.toLowerCase().startsWith(searchValue.toLowerCase())
          );
    this.setState({ foundVaccines, searchClicked: true, firstSearch: false });
  };

  handleClose = reason => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false, update: false, searchClicked: false });
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.handleSearchOnClick();
      event.preventDefault();
    }
  };

  handleUpdateSuccessful = event => {
    this.setState({ open: true, update: true });
  };

  handleRadioChange = event => {
    this.setState({ searchType: event.target.value });
  };

  render() {
    const {
      foundVaccines,
      searchValue,
      searchClicked,
      loading,
      open,
      searchType,
      firstSearch,
      searchEmpty
    } = this.state;
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <div style={{ paddingTop: "30px" }}>
          <Typography component="h1" variant="h2" align="center">
            Vaccine Search
          </Typography>
          <form className={classes.form}>
            <TextField
              id="search-field"
              variant="filled"
              label="Search"
              type="text"
              fullWidth
              value={searchValue}
              onChange={this.handleSearchOnChange}
              onKeyPress={this.handleKeyPress}
              error={searchEmpty}
              helperText={
                searchEmpty ? "Please type a query into the search bar" : ""
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={this.handleSearchOnClick}>
                      <Search />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Grid
              container
              className={classes.control}
              justify="flex-start"
              direction="row"
            >
              <Grid item xs={12}>
                <FormLabel>Search By</FormLabel>
                <RadioGroup
                  aria-label="NotificationFrequency"
                  name="searchType"
                  className={classes.group}
                  onChange={this.handleRadioChange}
                  value={searchType}
                  disabled={loading}
                  row={true}
                >
                  <FormControlLabel
                    value="Vaccination"
                    control={<Radio disabled={loading} />}
                    label="Vaccination"
                  />
                  <FormControlLabel
                    value="Disease"
                    control={<Radio disabled={loading} />}
                    label="Disease"
                  />
                </RadioGroup>
              </Grid>
            </Grid>
          </form>
        </div>
        <div>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
          {foundVaccines.length === 0 && !firstSearch && !loading && (
            <NoVaccineSearchResult />
          )}
          {foundVaccines.length > 0 && !loading && (
            <VerticalTimeline layout="one-column">
              {foundVaccines.map(foundVaccine => (
                <VaccineSearchResult
                  vaccine={foundVaccine}
                  handleUpdateSuccessful={this.handleUpdateSuccessful}
                />
              ))}
            </VerticalTimeline>
          )}
        </div>
        {foundVaccines.length === 0 && searchClicked && (
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            open={open}
            autoHideDuration={3000}
            onClose={this.handleClose}
          >
            <MySnackbarContent
              onClose={this.handleClose}
              variant="warning"
              message="No search results found"
            />
          </Snackbar>
        )}
        {foundVaccines.length > 0 && searchClicked && (
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            open={this.state.open}
            autoHideDuration={3000}
            onClose={this.handleClose}
          >
            <MySnackbarContent
              onClose={this.handleClose}
              variant="success"
              message="Search results found"
            />
          </Snackbar>
        )}
        {this.state.update && (
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            open={this.state.open}
            autoHideDuration={3000}
            onClose={this.handleClose}
          >
            <MySnackbarContent
              onClose={this.handleClose}
              variant="success"
              message="Vaccine information updated"
            />
          </Snackbar>
        )}
      </main>
    );
  }
}

export default withStyles(styles)(SearchPage);
