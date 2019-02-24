import React, { Component } from "react";
import NavBar from "./components/NavBar";
import LoginTab from "./components/LoginTab";
import "./App.css";
import AddToddlerTab from "./components/AddToddlerTab";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false, toddlerRegistered: false };
  }

  handleLoginState = e => {
    this.setState({ loggedIn: true });
    e.preventDefault();
  };

  render() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <NavBar />
        {!this.state.loggedIn && (
          <LoginTab handleLoginState={this.handleLoginState} />
        )}
        {this.state.loggedIn && !this.state.toddlerRegistered && (
          <AddToddlerTab />
        )}
      </MuiPickersUtilsProvider>
    );
  }
}

export default App;
