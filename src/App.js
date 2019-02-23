import React, { Component } from "react";
import NavBar from "./components/NavBar";
import LoginTab from "./components/LoginTab";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };
  }

  handleClick = e => {
    this.setState({ loggedIn: true });
    e.preventDefault();
  };

  render() {
    return (
      <div>
        <NavBar />
        <LoginTab />
      </div>
    );
  }
}

export default App;
