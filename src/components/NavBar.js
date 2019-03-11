import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import withStyles from "@material-ui/core/styles/withStyles";
import { Timeline, Search, Settings, ExitToApp } from "@material-ui/icons";

import styles from "./Styles";

class NavBar extends React.Component {
  render() {
    const {
      classes,
      handleCurrentPageChange,
      revealIcons,
      handleSignout
    } = this.props;
    return (
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Immunization Tracker For Toddlers
            </Typography>

            <div className={classes.grow} />
            {revealIcons && (
              <div className={classes.sectionDesktop}>
                <Tooltip title="Timeline">
                  <IconButton
                    color="inherit"
                    onClick={handleCurrentPageChange("Timeline")}
                  >
                    <Timeline />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Search">
                  <IconButton
                    color="inherit"
                    onClick={handleCurrentPageChange("Search")}
                  >
                    <Search />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Settings">
                  <IconButton
                    color="inherit"
                    onClick={handleCurrentPageChange("Settings")}
                  >
                    <Settings />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Sign Out">
                  <IconButton color="inherit" onClick={handleSignout}>
                    <ExitToApp />
                  </IconButton>
                </Tooltip>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
export default withStyles(styles)(NavBar);
