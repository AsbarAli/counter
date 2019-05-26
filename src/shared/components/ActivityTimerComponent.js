// @flow
import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import {Circle as CircularProgress} from 'react-native-progress';
import PropTypes from 'prop-types';
import type {Element as ReactElement} from 'react';

import styles, {
  progressCircleDefaultStyleProps,
} from './ActivityTimer.styles';

type ActivityTimerProps = {
  autoStartOnMount: bool,
  label: string,
  onCountFinish: () => void,
  progressColor: string | null,
  started: bool,
  timeToRun: number,
  type: 10001 | 10002,
};
type ActivityTimerState = {
  elapsedTime: number,
  totalTime: number,
};

class ActivityTimerComponent extends React.PureComponent<ActivityTimerProps, ActivityTimerState> {
  static defaultProps: any
  static COUNT_TYPE = {
    COUNTDOWN: 10001,
    COUNTUP: 10002,
  }

  constructor(props: ActivityTimerProps) {
    super(props);

    this.state = {
      elapsedTime: 0,
      totalTime: props.timeToRun,
    };
  }

  componentDidMount() {
    this.resolveStartOnMount();
  }

  componentWillReceiveProps(newProps: ActivityTimerProps) {
    this.resolveTimerRunningStatusChangeRequested(newProps);
    this.resolveActivityTimeChanged(newProps);
  }

  componentWillUnmount() {
    this._counter && clearInterval(this._counter);
  }

  _counter = null

  resolveStartOnMount = (): void => {
    if (this.props.autoStartOnMount || this.props.started) {
      this.start();
    }
  }

  resolveTimerRunningStatusChangeRequested = (newProps: ActivityTimerProps): void => {
    if (this.props.started !== newProps.started) {
      // The "started" status has changed. Now we have to start/pause the timer
      const action = newProps.started ? this.start : this.pause;

      action();
    }
  }

  resolveActivityTimeChanged = (newProps: ActivityTimerProps): void => {
    if (this.props.timeToRun !== newProps.timeToRun) {
      this._counter && clearInterval(this._counter);
      this.setState({
        elapsedTime: 0,
        totalTime: newProps.timeToRun,
      });
    }
  }

  initTimer = (): void => {
    const oneSecondTimeout = 1000;
    const countHandler = () => {
      const {elapsedTime, totalTime} = this.state;
      const newElapsedTime = elapsedTime + 1;
      // As requested and noticed on timer takes extra 1 sec
      if (newElapsedTime <= totalTime) {
        this.setState({
          elapsedTime: newElapsedTime,
        });
      } else {
        // Timer has run it's course. Let's finish this
        this.handleCountFinished();
        this._counter && clearInterval(this._counter);
      }
    };

    this._counter = setInterval(countHandler, oneSecondTimeout);
  }

  start = (): void => {
    this.initTimer();
  }

  pause = (): void => {
    this._counter && clearInterval(this._counter);
  }

  // We don't need a specific "STOP" action right?
  // stop = (): void => {}

  reset = (): void => {
    this._counter && clearInterval(this._counter);
    this.setState({
      elapsedTime: 0,
    });
  }

  formatSecondsValueForDisplay = (totalTimeInSeconds: number): {minutes: string, seconds: string} => {
    // When the app returns from background, we are adding 0.00001 to it to force render the circle
    // So we need to convert this back to an integer.
    const timeInInt = Math.ceil(totalTimeInSeconds);
    // Append a "0" at the beginning and substring the last two digits. This means we will always get a double digit value
    const minutes = `0${Math.floor(timeInInt / 60)}`.substr(-2);
    const seconds = `0${timeInInt % 60}`.substr(-2);

    return {minutes, seconds};
  }

  handleCountFinished = (): void => {
    this.props.onCountFinish();
  }

  renderCounterTimer = () => {
    const {type} = this.props;
    const {elapsedTime, totalTime} = this.state;
    let timeToDisplay = {minutes: '--', seconds: '--'};

    if (type === ActivityTimerComponent.COUNT_TYPE.COUNTUP) {
      timeToDisplay = this.formatSecondsValueForDisplay(elapsedTime);
    } else if (type === ActivityTimerComponent.COUNT_TYPE.COUNTDOWN) {
      timeToDisplay = this.formatSecondsValueForDisplay(totalTime - elapsedTime);
    }

    return (
      <View style={styles.timeTextWrapper}>
        <Text style={[styles.elapsedTimeText, styles.timeMinutesRightAlignText]}>
          {timeToDisplay.minutes}
        </Text>
        <Text style={styles.elapsedTimeColon}>
          {`:`}
        </Text>
        <Text style={styles.elapsedTimeText}>
          {timeToDisplay.seconds}
        </Text>
      </View>

    );
  }

  renderMaxTime = () => {
    const {totalTime} = this.state;
    const totalTimeToDisplay = this.formatSecondsValueForDisplay(totalTime);

    return (
      <View style={styles.timeTextWrapper}>
        <Text style={[styles.totalTimeText, styles.timeMinutesRightAlignText]}>
          {totalTimeToDisplay.minutes}
        </Text>
        <Text style={styles.totalTimeColon}>
          {`:`}
        </Text>
        <Text style={styles.totalTimeText}>
          {totalTimeToDisplay.seconds}
        </Text>
      </View>
    );
  }

  renderShowSets = () => {
    return (
      <Text style={styles.labelText}>
        {this.props.label}
      </Text>
    );
  }

  renderLabelsInsideProgressCircle = (): ReactElement<any> => {
    const {showCounterTimer, showMaxTime, showSets} = this.props;
    const timer = showCounterTimer ? this.renderCounterTimer() : null;
    const maxTime = showMaxTime ? this.renderMaxTime() : null;
    const sets = showSets ? this.renderShowSets() : null;

    return (
      <View style={styles.progressLabelsContainer}>
        {maxTime}
        {timer}
        {sets}
      </View>
    );
  }

  renderContent = (): ReactElement<any> => {
    const {type, circularProgressAnimate} = this.props;
    const {elapsedTime, totalTime} = this.state;
    const elapsedTimePercentage = elapsedTime / totalTime;
    let progress = 0;
    const color = this.props.progressColor || progressCircleDefaultStyleProps.unfilledColor;

    if (type === ActivityTimerComponent.COUNT_TYPE.COUNTUP) {
      progress = elapsedTimePercentage;
    } else if (type === ActivityTimerComponent.COUNT_TYPE.COUNTDOWN) {
      // Set to 0.9999 because otherwise the unfilled color doesn't show for a bit while the component realizes its running
      progress = 0.999999999999 - elapsedTimePercentage;
    }

    return (
      <View style={styles.container}>
        <CircularProgress
          {...progressCircleDefaultStyleProps}
          animated={circularProgressAnimate}
          color={color}
          direction="counter-clockwise"
          progress={progress}
          style={styles.circularProgress}
        >
          {this.renderLabelsInsideProgressCircle()}
        </CircularProgress>
      </View>
    );
  }

  render() {
    const content = this.renderContent();

    return content;
  }
}

ActivityTimerComponent.propTypes = {
  autoStartOnMount: PropTypes.bool,
  circularProgressAnimate: PropTypes.bool,
  label: PropTypes.string,
  onCountFinish: PropTypes.func.isRequired,
  progressColor: PropTypes.string,
  showCounterTimer: PropTypes.bool,
  showMaxTime: PropTypes.bool,
  showSets: PropTypes.bool,
  started: PropTypes.bool,
  timeToRun: PropTypes.number.isRequired,
  type: PropTypes.oneOf([ActivityTimerComponent.COUNT_TYPE.COUNTDOWN, ActivityTimerComponent.COUNT_TYPE.COUNTUP]),
};

ActivityTimerComponent.defaultProps = {
  circularProgressAnimate: true,
  autoStartOnMount: false,
  label: ' ',
  progressColor: 'black', // Do we need a default color? Maybe there's a default color to the component itself?
  started: false,
  type: ActivityTimerComponent.COUNT_TYPE.COUNTUP,
  showCounterTimer: true,
  showMaxTime: true,
  showSets: true,
};

export default ActivityTimerComponent;
