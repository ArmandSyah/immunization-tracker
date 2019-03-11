import React, { Component } from "react";
import NavBar from "./components/NavBar";
import LoginTab from "./components/LoginTab";
import Timeline from "./components/Timeline";
import Settings from "./components/Settings";
import "./App.css";
import AddToddlerTab from "./components/AddToddlerTab";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import SearchPage from "./components/SearchPage";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const pages = {
  timeline: "Timeline",
  search: "Search",
  settings: "Settings"
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#87A878"
    },
    secondary: {
      main: "#87A878"
    },
    background: { default: "#C7CCB9" }
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      toddlerRegistered: false,
      currentPage: "Timeline",
      name: "John Smith",
      dateOfBirth: new Date()
    };
  }

  handleLoginState = event => {
    this.setState({ loggedIn: true });
    event.preventDefault();
  };

  handleToddlerRegisterState = (name, date) => event => {
    this.setState({
      toddlerRegistered: true,
      currentPage: pages["timeline"],
      name: name,
      dateOfBirth: date
    });
    event.preventDefault();
  };

  handleCurrentPageChange = pageName => () => {
    this.setState({ currentPage: pageName });
  };

  handleSignout = event => {
    this.setState({
      loggedIn: false,
      toddlerRegistered: false,
      currentPage: "Timeline",
      name: "John Smith",
      dateOfBirth: new Date()
    });
  };

  render() {
    const {
      loggedIn,
      toddlerRegistered,
      currentPage,
      name,
      dateOfBirth
    } = this.state;
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <MuiThemeProvider theme={theme}>
          <NavBar
            handleCurrentPageChange={this.handleCurrentPageChange}
            handleSignout={this.handleSignout}
            revealIcons={loggedIn && toddlerRegistered}
          />
          {!loggedIn && <LoginTab handleLoginState={this.handleLoginState} />}
          {loggedIn && !toddlerRegistered && (
            <AddToddlerTab
              handleToddlerRegisterState={this.handleToddlerRegisterState}
            />
          )}
          {loggedIn && toddlerRegistered && currentPage === "Timeline" && (
            <Timeline name={name} dateOfBirth={dateOfBirth} />
          )}
          {loggedIn && toddlerRegistered && currentPage === "Search" && (
            <SearchPage />
          )}
          {loggedIn && toddlerRegistered && currentPage === "Settings" && (
            <Settings />
          )}
        </MuiThemeProvider>
      </MuiPickersUtilsProvider>
    );
  }
}

export default App;
