// @flow
import React from 'react';
import {
  View,
  // Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import type {Element as ReactElement} from 'react';
// import PubSub from 'pubsub-js';

// import ActivityTimerComponent from '@RNCounterTimer:shared/components/ActivityTimerComponent';
import ActivityTimerComponent from '../shared/components/ActivityTimerComponent';
// import type {TimerModel} from '@crock:storage/realm/models/Timer';

// import {PUB_SUB_TOPICS, ACTIVE} from '@crock:shared/constants';
import {
  SKIP,
  START,
  REST,
  PAUSE,
  RESET,
  COMPLETED,
} from '@RNCounterTimer:shared/strings';
import styles, {
  containerStyleProps,
  gradientColorsRepsDefault,
  gradientColorsRepsInactive,
  gradientColorsRepsActive,
  gradientColorsRestInactive,
  gradientColorsRestActive,
  progressColorRest,
  progressColorTimer,
} from './CustomCounterTimer.styles';
import PrimaryButtonComponent from '../shared/components/primaryButton.component';
// const soundPlayer = require('react-native-sound');
// import {timerDataActions} from '@crock:app/storage/realm';

type CustomCounterTimerProps = {
  timer: TimerModel,
};
type CustomCounterTimerState = {
  currentRunningSet: number,
  // status: ACTIVITY_STATUS.NOT_STARTED | ACTIVITY_STATUS.IN_PROGRESS | ACTIVITY_STATUS.RESTING | ACTIVITY_STATUS.COMPLETED,
  timerRunning: bool,
  restTimerRunning: bool,
};

// const mutedIcon = require('@crock:assets/icons/cf_volume_off_black_24.png');
// const muteIcon = require('@crock:assets/icons/cf_volume_on_black_24.png');
// const settingsIcon = require('@crock:assets/icons/cf_settings_black_24.png');
const ACTIVITY_STATUS = {
  NOT_STARTED: 10001,
  IN_PROGRESS: 10002,
  REST: 10003,
  COMPLETED: 10004,
};
class CustomCounterTimerContainer extends React.PureComponent<CustomCounterTimerProps, CustomCounterTimerState> {
  static defaultProps: any

  constructor(props: CustomCounterTimerProps) {
    super(props);
  }

  state = {
    currentRunningSet: 0,
    status: ACTIVITY_STATUS.NOT_STARTED,
    timerRunning: false,
    timer: this.props.timer,
    name: '',
    restTimerRunning: false,

    isMuted: false,
  }

  componentWillMount() {
    const {timer} = this.props;
    if (timer) {
      const timerData = {
        activeTimeMinutes: timer.activeTimeMinutes,
        activeTimeSeconds: timer.activeTimeSeconds,
        id: timer.id,
        name: timer.name,
        restTimeMinutes: timer.restTimeMinutes,
        restTimeSeconds: timer.restTimeSeconds,
        sets: timer.sets,
      };
      this.setState({
        // maxTime: timerData,
        name: timerData.name,
      });
    }
  }

  componentWillUnmount() {
  }

  restTone = null;
  activeTone = null;

  // _timerRef: ActivityTimerComponent;
  // _restTimerRef: ActivityTimerComponent;

  handleTimeRef = (ref) => {
    this._timerRef = ref;
  };

  handleRestTimeRef = (ref) => {
    this._restTimerRef = ref;
  };

  resetTimerRef = () => {
    this._timerRef && this._timerRef.reset();
    this._restTimerRef && this._restTimerRef.reset();
  }

  resolveContainerBorderStyle = (): number | null => {
    const {status} = this.state;
    let borderStyle = {
      borderRadius: 8,
    };

    switch (status) {
    case ACTIVITY_STATUS.IN_PROGRESS:
      borderStyle = styles.borderGreen;
      break;
    case ACTIVITY_STATUS.REST:
      borderStyle = styles.borderOrange;
      break;
    }

    return borderStyle;
  }

  formatSetLabel = (): string | null => {
    const {timer: {sets}} = this.state;
    const {currentRunningSet} = this.state;
    let result = null;

    if (sets > 1) {
      result = `Set ${currentRunningSet + 1}/${sets}`;
    }

    return result;
  }

  restSoundPlay = () => {
    if (this.restTone != null && !this.state.isMuted) {
      this.restTone.play((success) => {
        if (!success) {
          // ToastAndroid.show(ERROR_WHEN_INIT_SOUND_PLAYER, ToastAndroid.SHORT);
        }
      });
    }
  }

  activeSoundPlay = () => {
    if (this.activeTone != null && !this.state.isMuted) {
      this.activeTone.play((success) => {
        if (!success) {
          // ToastAndroid.show(ERROR_WHEN_INIT_SOUND_PLAYER, ToastAndroid.SHORT);
        }
      });
    }
  }

  moveForwardToNextSet = (): void => {
    const {currentRunningSet} = this.state;

    this.setState({
      currentRunningSet: currentRunningSet + 1,
      restTimerRunning: false,
      timerRunning: true,
      status: ACTIVITY_STATUS.IN_PROGRESS,
    });
  }

  moreSetsAvaileble = (): bool => {
    const {timer: {sets: totalSets}} = this.state;
    const {currentRunningSet} = this.state;

    return (currentRunningSet + 1) < totalSets;
  }

  restAvailableForActivity = (): bool => {
    const {timer: {restTimeMinutes, restTimeSeconds}} = this.state;

    return restTimeMinutes > 0 || restTimeSeconds > 0;
  }

  resolveMovingForwardFromRest = (): void => {
    if (this.moreSetsAvaileble()) {
      // There are more sets to go. Moving on to next set
      this.activeSoundPlay();
      this.moveForwardToNextSet();
    } else {
      // This is the final rest of the activity. Let's wrap this up
      this.handleActivityCompleted();
    }
  }

  handleMuteToggled = (): void => {
    this.setState({
      isMuted: !this.state.isMuted,
    });
  }

  handleResetPressed = (): void => {
    this.resetTimerRef();
    this.setState({
      currentRunningSet: 0,
      status: ACTIVITY_STATUS.NOT_STARTED,
      restTimerRunning: false,
      timerRunning: false,
    });
  }

  handleStartTimerPressed = (): void => {
    this.activeSoundPlay();
    this.setState({
      status: ACTIVITY_STATUS.IN_PROGRESS,
      timerRunning: true,
    });
  }

  handleSkipSet = (): void => {
    const lastSet = !this.moreSetsAvaileble();
    let partialState = null;

    if (lastSet) {
      this.resetTimerRef();
      partialState = {status: ACTIVITY_STATUS.COMPLETED};
    } else if (!lastSet) {
      partialState = {
        status: ACTIVITY_STATUS.NOT_STARTED,
        currentRunningSet: this.state.currentRunningSet + 1,
        timerRunning: false,
        restTimerRunning: false,
      };
    } else {
      this.handleActivityCompleted();
    }

    if (partialState) {
      this.setState(partialState);
    }
  }

  handlePauseRestPressed = (): void => {
    this.setState({
      restTimerRunning: false,
    });
  }

  handleStartRestPressed = (): void => {
    this.setState({
      restTimerRunning: true,
    });
  }

  handlePauseTimerPressed = (): void => {
    this.setState({
      timerRunning: false,
    });
  }

  handleContinueTimerPressed = (): void => {
    this.setState({
      timerRunning: true,
    });
  }

  handleNextSet = (): void => {
    this.activeSoundPlay();
    const partialState = {
      restTimerRunning: false,
      timerRunning: true,
      status: ACTIVITY_STATUS.IN_PROGRESS,
      currentRunningSet: this.state.currentRunningSet + 1,
    };
    this.setState(partialState);
  }

  handleActivityCompleted = (): void => {
    const partialState = {
      restTimerRunning: false,
      timerRunning: false,
      status: ACTIVITY_STATUS.COMPLETED,
    };
    this.setState(partialState);
  }

  handleSkipPressed = (): void => {
    const {status} = this.state;

    switch (status) {
    case ACTIVITY_STATUS.NOT_STARTED:
      this.handleSkipSet();
      break;
    case ACTIVITY_STATUS.IN_PROGRESS:
      this.handleSkipSet();
      break;
    case ACTIVITY_STATUS.REST:
      this.resolveMovingForwardFromRest();
      break;
    }
  }

  handleRestTimeEnd = (): void => {
    this.restSoundPlay();
    this.resolveMovingForwardFromRest();
  }

  handleTimeEnd = (): void => {
    const lastSet = !this.moreSetsAvaileble();
    let partialState = null;

    if (this.restAvailableForActivity()) {
      this.restSoundPlay();
      partialState = {
        status: ACTIVITY_STATUS.REST,
        restTimerRunning: true,
      };
    } else {
      if (lastSet) {
        partialState = {
          status: ACTIVITY_STATUS.COMPLETED,
          timerRunning: false,
          restTime: false,
        };
      } else {
        this.handleNextSet();
      }
    }

    if (partialState) {
      this.setState(partialState);
    }
  }

  handleSettingModal = () => {
    this.setState({
      timerRunning: false,
      restTimerRunning: false,
    });
  }

  renderActivityTopItems = (): Array<ReactElement<any>> => {
    const {status} = this.state;
    let statusText = this.state.name.toUpperCase();
    let statusTextStyle = styles.defaultStatusTextStyle;
    if (status == ACTIVITY_STATUS.REST) {
      statusText = REST;
      statusTextStyle = styles.resetTextStyle;
    } else if (status == ACTIVITY_STATUS.IN_PROGRESS) {
      // statusText = ACTIVE;
      statusTextStyle = styles.activeTextStyle;
    } else {
      statusText = this.state.name.toUpperCase();
    }

    return (
      <View style={styles.topItemsWrapper}>
        <View style={styles.settingsIconWrapper}>
          {this.props.leftUpperElement}
        </View>

        <Text style={[styles.activityStatusText, statusTextStyle]}>
          {statusText}
        </Text>

        <TouchableOpacity
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          onPress={this.handleMuteToggled}
          style={styles.muteIconWrapper}
        >
          <Text>sss</Text>
          {/* <Image
            source={isMuted ? mutedIcon : muteIcon}
            style={styles.settingStyle}
          /> */}
        </TouchableOpacity>
      </View>
    );
  }

  renderPrimaryActionButton = (): ReactElement<any> => {
    const {status, restTimerRunning, timerRunning} = this.state;
    let buttonText = null;
    let buttonType = null;
    let onButtonPress = null;
    let isCompleted = false;

    switch (status) {
    case ACTIVITY_STATUS.NOT_STARTED:
      buttonText = START;
      buttonType = PrimaryButtonComponent.TYPE.PRIMARY;
      onButtonPress = this.handleStartTimerPressed;

      break;
    case ACTIVITY_STATUS.IN_PROGRESS:
      buttonText = timerRunning ? PAUSE : START;
      buttonType = timerRunning ? PrimaryButtonComponent.TYPE.SECONDARY : PrimaryButtonComponent.TYPE.PRIMARY;
      onButtonPress = timerRunning ? this.handlePauseTimerPressed : this.handleContinueTimerPressed;

      break;
    case ACTIVITY_STATUS.REST:
      buttonText = restTimerRunning ? PAUSE : START;
      buttonType = restTimerRunning ? PrimaryButtonComponent.TYPE.SECONDARY : PrimaryButtonComponent.TYPE.PRIMARY;
      onButtonPress = restTimerRunning ? this.handlePauseRestPressed : this.handleStartRestPressed;

      break;
    case ACTIVITY_STATUS.COMPLETED:
      buttonText = COMPLETED;
      buttonType = PrimaryButtonComponent.TYPE.PRIMARY;
      onButtonPress = this.handleActivityCompleted;
      isCompleted = true;

      break;
    }

    return (
      <PrimaryButtonComponent
        disabled={isCompleted}
        onPress={onButtonPress}
        text={buttonText}
        type={buttonType}
      />
    );
  }

  renderResetButton = (): ReactElement<any> => {
    const {status, currentRunningSet} = this.state;
    const textStyles = [styles.resetContainer];
    const disabled = currentRunningSet === 0 && status === ACTIVITY_STATUS.NOT_STARTED;

    if (disabled) {
      textStyles.push(styles.textDisabled);
    }

    return (
      <TouchableOpacity
        disabled={disabled}
        hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
        onPress={this.handleResetPressed}
        style={styles.resetWrapper}
      >
        <Text style={textStyles}>
          {RESET}
        </Text>
      </TouchableOpacity>
    );
  }

  renderSkipButton = (): ReactElement<any> => {
    const {status} = this.state;
    const textStyles = [styles.skipContainer];
    const disabled = status === ACTIVITY_STATUS.COMPLETED;

    if (disabled) {
      textStyles.push(styles.textDisabled);
    }

    return (
      <TouchableOpacity
        disabled={disabled}
        hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
        onPress={this.handleSkipPressed}
        style={styles.skipWrapper}
      >
        <Text style={textStyles}>
          {SKIP}
        </Text>
      </TouchableOpacity>
    );
  }

  renderActivityControls = (): ReactElement<any> => {
    return (
      <View style={styles.controlsWrapper}>
        {this.renderResetButton()}
        {this.renderPrimaryActionButton()}
        {this.renderSkipButton()}
      </View>
    );
  }
  getTimerDuration = (minutes, seconds): number => {
    const duration = (minutes * 60) + seconds;

    return duration;
  }

  renderTimerContent = (): ReactElement<any> => {
    const {timer: {activeTimeMinutes, activeTimeSeconds}} = this.state;
    const {status, currentRunningSet} = this.state;
    const timerKey = `workoutTimer${currentRunningSet}`;
    let progressColor = null;

    const duration = this.getTimerDuration(activeTimeMinutes, activeTimeSeconds);

    switch (status) {
    case ACTIVITY_STATUS.IN_PROGRESS:
      progressColor = progressColorTimer;

      break;
    case ACTIVITY_STATUS.REST:
      progressColor = progressColorRest;

      break;
    }

    return (
      <ActivityTimerComponent
        key={timerKey}
        label={this.formatSetLabel()}
        onCountFinish={this.handleTimeEnd}
        progressColor={progressColor}
        ref={this.handleTimeRef}
        started={this.state.timerRunning}
        timeToRun={duration}
        type={ActivityTimerComponent.COUNT_TYPE.COUNTDOWN}
      />
    );
  }

  renderRestContent = (): ReactElement<any> => {
    const {timer: {restTimeMinutes, restTimeSeconds}} = this.state;
    const {status, currentRunningSet} = this.state;
    const timerKey = `restTimer${currentRunningSet}`;
    let progressColor = null;

    const restTime = this.getTimerDuration(restTimeMinutes, restTimeSeconds);
    switch (status) {
    case ACTIVITY_STATUS.IN_PROGRESS:
      progressColor = progressColorTimer;

      break;
    case ACTIVITY_STATUS.REST:
      progressColor = progressColorRest;

      break;
    }

    return (
      <ActivityTimerComponent
        key={timerKey}
        label={this.formatSetLabel()}
        onCountFinish={this.handleRestTimeEnd}
        progressColor={progressColor}
        ref={this.handleRestTimeRef}
        started={this.state.restTimerRunning}
        timeToRun={restTime}
        type={ActivityTimerComponent.COUNT_TYPE.COUNTDOWN}
      />
    );
  }

  renderCompletedPlaceholder = (): ReactElement<any> => {
    return (
      <View style={styles.completedPlaceholder}>
        <Text style={styles.completedText}>All sets completed</Text>
      </View>
    );
  }

  renderCounterContent = (): ReactElement<any> => {
    const {status, restTimerRunning} = this.state;
    let counter = null;
    let gradientColors = gradientColorsRepsDefault;
    let borderStyle = {
      borderRadius: 8,
    };

    switch (status) {
    case ACTIVITY_STATUS.NOT_STARTED:
      gradientColors = gradientColorsRepsInactive;
      counter = this.renderTimerContent();
      break;
    case ACTIVITY_STATUS.IN_PROGRESS:
      gradientColors = gradientColorsRepsActive;
      borderStyle = styles.borderGreen;
      counter = this.renderTimerContent();
      break;
    case ACTIVITY_STATUS.REST:
      gradientColors = restTimerRunning ? gradientColorsRestActive : gradientColorsRestInactive;
      borderStyle = styles.borderOrange;
      counter = this.renderRestContent();
      break;
    case ACTIVITY_STATUS.COMPLETED:
      counter = this.renderTimerContent();
      break;
    }

    return (
      <LinearGradient
        colors={gradientColors}
        style={[styles.contentWrapper, borderStyle]}
      >
        {this.renderActivityTopItems()}
        <View style={styles.timerContent}>
          {counter}
        </View>
      </LinearGradient>
    );
  }

  render() {
    const controls = this.renderActivityControls();
    const content = this.renderCounterContent();
    const containerBorderStyle = this.resolveContainerBorderStyle();

    return (
      <View
        {...containerStyleProps}
        style={[styles.container, containerBorderStyle]}
      >
        {content}
        {controls}
      </View>
    );
  }
}

CustomCounterTimerContainer.propTypes = {
  leftUpperElement: PropTypes.element,
  timer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    restTimeMinutes: PropTypes.number.isRequired,
    restTimeSeconds: PropTypes.number.isRequired,
    activeTimeMinutes: PropTypes.number.isRequired,
    activeTimeSeconds: PropTypes.number.isRequired,
    sets: PropTypes.number.isRequired,
    // createdDate: PropTypes.any.isRequired,
    // modifiedDate: PropTypes.any.isRequired,
  }).isRequired,
};

CustomCounterTimerContainer.defaultProps = {
  leftUpperElement: null,
};

export default CustomCounterTimerContainer;
