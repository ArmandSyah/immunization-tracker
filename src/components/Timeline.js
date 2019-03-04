import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import CssBaseline from "@material-ui/core/CssBaseline";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Icon from "@mdi/react";
import {
  mdiPill,
  mdiClipboardPulse,
  mdiCalendar,
  mdiAccount,
  mdiBaby,
  mdiNeedle
} from "@mdi/js";

import styles from "./Styles";

const TimelineList = [
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    date="January 1st, 2019"
    iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
    icon={<Icon path={mdiBaby} />}
  >
    <h3 className="vertical-timeline-element-title">Your baby was born</h3>
  </VerticalTimelineElement>,

  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    date="March 1st, 2019 - May 1st, 2019"
    iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
    icon={<Icon path={mdiNeedle} />}
  >
    <h3 className="vertical-timeline-element-title">
      At 2 and 4 months old, babies should receive the following vaccines
    </h3>
    <p>diphtheria, tetanus, pertussis, polio, haemophilus influenza type b</p>
    <p>pneumococcal conjugate</p>
    <p>rotavirus</p>
  </VerticalTimelineElement>,

  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    date="March 1st, 2019 - May 1st, 2019"
    iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
    icon={<Icon path={mdiNeedle} />}
  >
    <h3 className="vertical-timeline-element-title">
      At 6 months old, babies should receive the following vaccine
    </h3>
    <p>diphtheria, tetanus, pertussis, polio, haemophilus influenza type b</p>
    <p>rotavirus</p>
  </VerticalTimelineElement>,

  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    date="March 1st, 2019 - May 1st, 2019"
    iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
    icon={<Icon path={mdiNeedle} />}
  >
    <h3 className="vertical-timeline-element-title">
      At 12 months old, babies should receive the following vaccine
    </h3>
    <p>pneumococcal conjugate</p>
    <p>meningococcal conjugate (Men-C-C)</p>
    <p>measles, mumps and rubella</p>
  </VerticalTimelineElement>
];

class Timeline extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Typography component="h1" variant="h2" align="center">
          Immunization Records Timeline
        </Typography>
        <VerticalTimeline layout="one-column">{TimelineList}</VerticalTimeline>>
      </main>
    );
  }
}

export default withStyles(styles)(Timeline);
