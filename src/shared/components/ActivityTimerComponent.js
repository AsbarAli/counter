// @flow
import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import {Circle as CircularProgress} from 'react-native-progress';
import PropTypes from 'prop-types';
import type {Element as ReactElement} from 'react';

import {
  MAX_TIME,
  TIMER,
  SET,
  HOURS,
  MINUITES,
  SECONDS,
} from '@RNCounterTimer:shared/strings';
import colors from '@RNCounterTimer:theme/colors';
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

  formatSecondsValueForDisplay = (totalTimeInSeconds: number): {hours: string, minutes: string, seconds: string} => {
    // When the app returns from background, we are adding 0.00001 to it to force render the circle
    // So we need to convert this back to an integer.
    const timeInInt = Math.ceil(totalTimeInSeconds);
    // Append a "0" at the beginning and substring the last two digits. This means we will always get a double digit value
    const hours = `0${Math.floor(timeInInt / 3600)}`.substr(-2);
    const minutes = `0${Math.floor(timeInInt / 60) % 60}`.substr(-2);
    const seconds = `0${timeInInt % 60}`.substr(-2);

    return {hours, minutes, seconds};
  }

  handleCountFinished = (): void => {
    this.props.onCountFinish();
  }

  renderCounterTimer = () => {
    const {type, counterTimer} = this.props;
    const {elapsedTime, totalTime} = this.state;
    let timeToDisplay = {minutes: '--', seconds: '--'};
    const content = [];

    if (type === ActivityTimerComponent.COUNT_TYPE.COUNTUP) {
      timeToDisplay = this.formatSecondsValueForDisplay(elapsedTime);
    } else if (type === ActivityTimerComponent.COUNT_TYPE.COUNTDOWN) {
      timeToDisplay = this.formatSecondsValueForDisplay(totalTime - elapsedTime);
    }

    counterTimer.forEach((element, index) => {
      if (index != 0) {
        content.push(
          <Text style={styles.elapsedTimeColon}>
            {`:`}
          </Text>
        );
      }

      switch (element) {
      case HOURS:
        content.push(
          <Text style={[styles.elapsedTimeText]}>
            {timeToDisplay.hours}
          </Text>
        );
        break;

      case MINUITES:
        content.push(
          <Text style={styles.elapsedTimeText}>
            {timeToDisplay.minutes}
          </Text>
        );
        break;

      case SECONDS:
        content.push(
          <Text style={styles.elapsedTimeText}>
            {timeToDisplay.seconds}
          </Text>
        );
      }
    });

    return (
      <View style={styles.timeTextWrapper}>
        {content}
      </View>

    );
  }

  renderMaxTime = () => {
    const {totalTime} = this.state;
    const {counterTimer} = this.props;
    const totalTimeToDisplay = this.formatSecondsValueForDisplay(totalTime);
    const content = [];

    counterTimer.forEach((element, index) => {
      if (index != 0) {
        content.push(
          <Text style={styles.totalTimeColon}>
            {`:`}
          </Text>
        );
      }

      switch (element) {
      case HOURS:
        content.push(
          <Text style={[styles.totalTimeText]}>
            {totalTimeToDisplay.hours}
          </Text>
        );
        break;

      case MINUITES:
        content.push(
          <Text style={styles.totalTimeText}>
            {totalTimeToDisplay.minutes}
          </Text>
        );
        break;

      case SECONDS:
        content.push(
          <Text style={styles.totalTimeText}>
            {totalTimeToDisplay.seconds}
          </Text>
        );
      }
    });

    return (
      <View style={styles.timeTextWrapper}>
        {content}
      </View>
    );
  }

  renderShowSets = () => {
    const setStyle = [styles.labelText];
    const {counterSetTextWrapperStyle} = this.props;

    if (counterSetTextWrapperStyle) {
      setStyle.push(counterSetTextWrapperStyle);
    }

    return (
      <Text style={setStyle}>
        {this.props.label}
      </Text>
    );
  }

  renderLabelsInsideProgressCircle = (): ReactElement<any> => {
    const {progressVisible, labelsWithStyle, labelsWithoutProgreessStyle, counterTexts} = this.props;
    const maxTime = this.renderMaxTime();
    const timer = this.renderCounterTimer();
    const sets = this.renderShowSets();

    const content = [];

    counterTexts.forEach((element) => {
      switch (element) {
      case MAX_TIME:
        content.push(maxTime);
        break;
      case TIMER:
        content.push(timer);
        break;
      case SET:
        content.push(sets);
      }
    });

    const labelStyle = progressVisible ? labelsWithStyle : labelsWithoutProgreessStyle;

    return (
      <View style={labelStyle}>
        {content}
      </View>
    );
  }

  renderCirucularProgress = () => {
    const {type, progressBorderWidth, progressSize, progressThickness, progressUnfilledColor, progressAnimation, progressDirection, progressStyle} = this.props;
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
          animated={progressAnimation}
          borderWidth={progressBorderWidth}
          color={color}
          direction={progressDirection}
          progress={progress}
          size={progressSize}
          style={progressStyle}
          thickness={progressThickness}
          unfilledColor={colors.activity.progressBackground}
        >
          {this.renderLabelsInsideProgressCircle()}
        </CircularProgress>
      </View>
    );
  };

  renderLabelWithoutCircularProgress = () => {
    const labelInsideProgress = this.renderLabelsInsideProgressCircle();

    return (
      <View style={styles.container}>
        {labelInsideProgress}
      </View>);
  };

  render() {
    const {progressVisible} = this.props;

    const circularProgress = progressVisible ? this.renderCirucularProgress() : this.renderLabelWithoutCircularProgress();

    return circularProgress;
  }
}

ActivityTimerComponent.propTypes = {
  autoStartOnMount: PropTypes.bool,
  counterSetTextWrapperStyle: PropTypes.any,
  counterTexts: PropTypes.any,
  label: PropTypes.string,
  labelsWithStyle: PropTypes.any,
  labelsWithoutProgreessStyle: PropTypes.any,
  onCountFinish: PropTypes.func.isRequired,
  progressAnimation: PropTypes.bool,
  progressBorderWidth: PropTypes.number,
  progressColor: PropTypes.string,
  progressDirection: PropTypes.string,
  progressSize: PropTypes.number,
  progressStyle: PropTypes.any,
  progressThickness: PropTypes.number,
  progressVisible: PropTypes.bool,
  started: PropTypes.bool,
  timeToRun: PropTypes.number.isRequired,
  type: PropTypes.oneOf([ActivityTimerComponent.COUNT_TYPE.COUNTDOWN, ActivityTimerComponent.COUNT_TYPE.COUNTUP]),
};

ActivityTimerComponent.defaultProps = {
  autoStartOnMount: false,
  label: ' ',
  progressColor: 'black', // Do we need a default color? Maybe there's a default color to the component itself?
  started: false,
  type: ActivityTimerComponent.COUNT_TYPE.COUNTUP,
  progressVisible: true,
  labelsWithStyle: {
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: 130,
  },
  labelsWithoutProgreessStyle: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  progressBorderWidth: 0,
  progressSize: 140,
  progressThickness: 4,
  progressAnimation: true,
  progressDirection: 'counter-clockwise',
  progressStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterTexts: [MAX_TIME, TIMER, SET],
  counterSetTextWrapperStyle: {
    fontSize: 20,
    color: colors.background.black,
  },

};

export default ActivityTimerComponent;
