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
  PRIMARY_ACTION,
  TOP,
  BOTTOM,
  MAX_TIME,
  TIMER,
  SET,
  HOURS,
  MINUITES,
  SECONDS,
} from '@RNCounterTimer:shared/strings';
import styles, {
  containerStyleProps,
  gradientColorsRepsDefault,
  gradientColorsDefault,
  gradientColorsRepsActive,
  gradientColorsRestActive,
  progressColorRest,
  progressColorTimer,
} from './CustomCounterTimer.styles';
import PrimaryButtonComponent from '../shared/components/primaryButton.component';
// const soundPlayer = require('react-native-sound');
// import {timerDataActions} from '@crock:app/storage/realm';

import colors from '@RNCounterTimer:theme/colors';

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
        activiTimeHours: timer.activiTimeHours,
        activeTimeMinutes: timer.activeTimeMinutes,
        activeTimeSeconds: timer.activeTimeSeconds,
        id: timer.id,
        name: timer.name,
        restTimeHours: timer.restTimeHours,
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
    const {timer: {sets}, currentRunningSet} = this.state;
    const {counterSetText, counterSetSeperatorText} = this.props;

    let result = null;

    if (sets > 1) {
      result = `${counterSetText} ${currentRunningSet + 1}${counterSetSeperatorText}${sets}`;
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
    // TODO:
    if (this.moreSetsAvaileble()) {
      // TODO:
      // Alert.alert('if (this.moreSetsAvaileble()) {');
      // There are more sets to go. Moving on to next set
      this.activeSoundPlay();
      this.moveForwardToNextSet();
    } else {
      // TODO:
      // Alert.alert('} else {');
      // This is the final rest of the activity. Let's wrap this up
      this.handleActivityCompleted();
    }
  }

  handleMuteToggled = (): void => {
    const {onMuteToggle, onUnMuteToggle} = this.props;
    const {isMuted} = this.state;

    if (!isMuted && onMuteToggle) {
      onMuteToggle();
    }

    if (isMuted && onUnMuteToggle) {
      onUnMuteToggle();
    }

    this.setState({
      isMuted: !isMuted,
    });
  }

  handleResetPressed = (): void => {
    const {onResetButtonPressed} = this.props;

    if (onResetButtonPressed) {
      onResetButtonPressed();
    }

    this.resetTimerRef();
    this.setState({
      currentRunningSet: 0,
      status: ACTIVITY_STATUS.NOT_STARTED,
      restTimerRunning: false,
      timerRunning: false,
    });
  }

  handleStartTimerPressed = (): void => {
    const {onStartTimerPressed} = this.props;
    if (onStartTimerPressed) {
      onStartTimerPressed();
    }
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
    const {onPauseRestPressed} = this.props;

    if (onPauseRestPressed) {
      onPauseRestPressed();
    }

    this.setState({
      restTimerRunning: false,
    });
  }

  handleStartRestPressed = (): void => {
    const {onStartRestPressed} = this.props;

    if (onStartRestPressed) {
      onStartRestPressed();
    }

    this.setState({
      restTimerRunning: true,
    });
  }

  handlePauseTimerPressed = (): void => {
    const {onPauseTimerPressed} = this.props;

    if (onPauseTimerPressed) {
      onPauseTimerPressed();
    }

    this.setState({
      timerRunning: false,
    });
  }

  handleContinueTimerPressed = (): void => {
    const {onContinueTimerPressed} = this.props;

    if (onContinueTimerPressed) {
      onContinueTimerPressed();
    }
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
    const {onActivityCompleted} = this.props;

    if (onActivityCompleted) {
      onActivityCompleted();
    }

    const partialState = {
      restTimerRunning: false,
      timerRunning: false,
      status: ACTIVITY_STATUS.COMPLETED,
    };
    this.setState(partialState);
  }

  handleSkipPressed = (): void => {
    const {status} = this.state;
    const {onSkipPressed} = this.props;

    if (onSkipPressed) {
      onSkipPressed();
    }

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
    const {onRestTimeEnd} = this.props;

    if (onRestTimeEnd) {
      onRestTimeEnd();
    }

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

  renderMuteIcon = () => {
    return (
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
    );
  }

  renderActivityTopItems = (): Array<ReactElement<any>> => {
    const {status} = this.state;
    const {showMuteElement, topItemsWrapperStyle} = this.props;

    let statusText = this.state.name.toUpperCase();
    let statusTextStyle = styles.defaultStatusTextStyle;
    const muteIcon = showMuteElement ? this.renderMuteIcon() : null;

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
      <View style={topItemsWrapperStyle}>
        <View style={styles.settingsIconWrapper}>
          {this.props.leftUpperElement}
        </View>

        <Text style={[styles.activityStatusText, statusTextStyle]}>
          {statusText}
        </Text>
        {muteIcon}
      </View>
    );
  }

  renderPrimaryActionButton = (): ReactElement<any> => {
    const {status, restTimerRunning, timerRunning} = this.state;
    const {controllerMainPrimaryActionButtonStyle, controllerMainPrimaryActionDisabledButtonStyle, controllerSecondPrimaryActionButtonStyle} = this.props;

    let buttonText = null;
    let buttonType = null;
    let onButtonPress = null;
    let isCompleted = false;
    let userDefinedButtonStyle = null;

    switch (status) {
    case ACTIVITY_STATUS.NOT_STARTED:
      buttonText = START;
      buttonType = PrimaryButtonComponent.TYPE.PRIMARY;
      onButtonPress = this.handleStartTimerPressed;
      userDefinedButtonStyle = controllerMainPrimaryActionButtonStyle;
      break;

    case ACTIVITY_STATUS.IN_PROGRESS:
      buttonText = timerRunning ? PAUSE : START;
      buttonType = timerRunning ? PrimaryButtonComponent.TYPE.SECONDARY : PrimaryButtonComponent.TYPE.PRIMARY;
      onButtonPress = timerRunning ? this.handlePauseTimerPressed : this.handleContinueTimerPressed;
      userDefinedButtonStyle = timerRunning ? controllerSecondPrimaryActionButtonStyle : controllerMainPrimaryActionButtonStyle;
      break;

    case ACTIVITY_STATUS.REST:
      buttonText = restTimerRunning ? PAUSE : START;
      buttonType = restTimerRunning ? PrimaryButtonComponent.TYPE.SECONDARY : PrimaryButtonComponent.TYPE.PRIMARY;
      onButtonPress = restTimerRunning ? this.handlePauseRestPressed : this.handleStartRestPressed;
      userDefinedButtonStyle = timerRunning ? controllerSecondPrimaryActionButtonStyle : controllerMainPrimaryActionButtonStyle;
      break;

    case ACTIVITY_STATUS.COMPLETED:
      buttonText = COMPLETED;
      buttonType = PrimaryButtonComponent.TYPE.PRIMARY;
      onButtonPress = this.handleActivityCompleted;
      isCompleted = true;
      userDefinedButtonStyle = controllerMainPrimaryActionDisabledButtonStyle;
      break;
    }

    return (
      <View style={{flex: 1}}>
        <PrimaryButtonComponent
          disabled={isCompleted}
          onPress={onButtonPress}
          text={buttonText}
          type={buttonType}
          userDefinedButtonStyle={userDefinedButtonStyle}
        />
      </View>
    );
  }

  renderResetButton = (): ReactElement<any> => {
    const {status, currentRunningSet} = this.state;
    const {controllerResetText, controllerResetButtonStyle, controllerDisabledResetButtonTextStyle,
      controllerDisabledResetButtonStyle, controllerResetButtonTextStyle} = this.props;
    const textStyles = [controllerResetButtonTextStyle];
    const buttonStyle = [controllerResetButtonStyle];
    const disabled = currentRunningSet === 0 && status === ACTIVITY_STATUS.NOT_STARTED;

    if (disabled) {
      textStyles.push(styles.textDisabled);
      if (controllerDisabledResetButtonTextStyle) {
        textStyles.push(controllerDisabledResetButtonTextStyle);
      }
      if (controllerDisabledResetButtonStyle) {
        buttonStyle.push(controllerDisabledResetButtonStyle);
      }
    }

    return (
      <TouchableOpacity
        disabled={disabled}
        // hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
        onPress={this.handleResetPressed}
        style={buttonStyle}
      >
        <Text style={textStyles}>
          {controllerResetText}
        </Text>
      </TouchableOpacity>
    );
  }

  renderSkipButton = (): ReactElement<any> => {
    const {status} = this.state;
    const {controllerSkipButtonText, controllerDisabledSkipButtonTextStyle, controllerSkipButtonTextStyle,
      controllerSkipButtonStyle, controllerDisabledSkipButtonStyle} = this.props;
    const textStyles = [controllerSkipButtonTextStyle];
    const buttonStyle = [controllerSkipButtonStyle];
    const disabled = status === ACTIVITY_STATUS.COMPLETED;

    if (disabled) {
      textStyles.push(styles.textDisabled);
      if (controllerDisabledSkipButtonTextStyle) {
        textStyles.push(controllerDisabledSkipButtonTextStyle);
      }
      if (controllerDisabledSkipButtonStyle) {
        buttonStyle.push(controllerDisabledSkipButtonStyle);
      }
    }

    return (
      <TouchableOpacity
        disabled={disabled}
        // hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
        onPress={this.handleSkipPressed}
        style={buttonStyle}
      >
        <Text style={textStyles}>
          {controllerSkipButtonText}
        </Text>
      </TouchableOpacity>
    );
  }

  renderActivityControls = (): ReactElement<any> => {
    const {controlsWrapperStyle, controllerButtons} = this.props;

    const resetButton = this.renderResetButton();
    const primaryActionButton = this.renderPrimaryActionButton();
    const skipButton = this.renderSkipButton();
    const content = [];

    controllerButtons.forEach((element) => {
      switch (element) {
      case RESET:
        content.push(resetButton);
        break;

      case PRIMARY_ACTION:
        content.push(primaryActionButton);
        break;

      case SKIP:
        content.push(skipButton);
        break;
      }
    });

    return (
      <View style={controlsWrapperStyle}>
        {content}
      </View>
    );
  }
  getTimerDuration = (hours, minutes, seconds): number => {
    const duration = (hours * 3600) + (minutes * 60) + seconds;

    return duration;
  }

  renderTimerContent = (): ReactElement<any> => {
    const {timer: {activeTimeMinutes, activeTimeSeconds, activiTimeHours}} = this.state;
    const {status, currentRunningSet} = this.state;
    const {progressColorActive, progressColorRestTime, progressVisible,
      progressBorderWidth, progressSize, progressThickness, progressUnfilledColor, progressAnimation, progressDirection, progressStyle, counterTexts,
      counterSetTextWrapperStyle, counterTimer} = this.props;
    const timerKey = `workoutTimer${currentRunningSet}`;
    let progressColor = null;

    const duration = this.getTimerDuration(activiTimeHours, activeTimeMinutes, activeTimeSeconds);

    switch (status) {
    case ACTIVITY_STATUS.IN_PROGRESS:
      progressColor = progressColorActive;

      break;
    case ACTIVITY_STATUS.REST:
      progressColor = progressColorRestTime;

      break;
    }

    return (
      <ActivityTimerComponent
        counterSetTextWrapperStyle={counterSetTextWrapperStyle}
        counterTexts={counterTexts}
        counterTimer={counterTimer}
        key={timerKey}
        label={this.formatSetLabel()}
        onCountFinish={this.handleTimeEnd}
        progressAnimation={progressAnimation}
        progressBorderWidth={progressBorderWidth}
        progressColor={progressColor}
        progressDirection={progressDirection}
        progressSize={progressSize}
        progressStyle={progressStyle}
        progressThickness={progressThickness}
        progressUnfilledColor={progressUnfilledColor}
        progressVisible={progressVisible}
        ref={this.handleTimeRef}
        started={this.state.timerRunning}
        timeToRun={duration}
        type={ActivityTimerComponent.COUNT_TYPE.COUNTDOWN}
      />
    );
  }

  renderRestContent = (): ReactElement<any> => {
    const {timer: {restTimeMinutes, restTimeSeconds, restTimeHours}} = this.state;
    const {status, currentRunningSet} = this.state;
    const {progressColorActive, progressColorRestTime, progressVisible,
      progressBorderWidth, progressSize, progressThickness, progressUnfilledColor, progressAnimation, progressDirection, progressStyle,
      counterTexts, counterSetTextWrapperStyle, counterTimer} = this.props;
    const timerKey = `restTimer${currentRunningSet}`;
    let progressColor = null;

    const restTime = this.getTimerDuration(restTimeHours, restTimeMinutes, restTimeSeconds);
    switch (status) {
    case ACTIVITY_STATUS.IN_PROGRESS:
      progressColor = progressColorActive;

      break;
    case ACTIVITY_STATUS.REST:
      progressColor = progressColorRestTime;

      break;
    }

    return (
      <ActivityTimerComponent
        counterSetTextWrapperStyle={counterSetTextWrapperStyle}
        counterTexts={counterTexts}
        counterTimer={counterTimer}
        key={timerKey}
        label={this.formatSetLabel()}
        onCountFinish={this.handleRestTimeEnd}
        progressAnimation={progressAnimation}
        progressBorderWidth={progressBorderWidth}
        progressColor={progressColor}
        progressDirection={progressDirection}
        progressSize={progressSize}
        progressStyle={progressStyle}
        progressThickness={progressThickness}
        progressUnfilledColor={progressUnfilledColor}
        progressVisible={progressVisible}
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
    const {status} = this.state;
    const {gradientColorsRepsActive, gradientColorsRestActive, progressWrapper, gradientColorsDefault} = this.props;
    let counter = null;
    let gradientColors = gradientColorsRepsDefault;
    let borderStyle = {
      borderRadius: 8,
    };

    switch (status) {
    case ACTIVITY_STATUS.NOT_STARTED:
      gradientColors = gradientColorsDefault;
      counter = this.renderTimerContent();
      break;
    case ACTIVITY_STATUS.IN_PROGRESS:
      gradientColors = gradientColorsRepsActive;
      borderStyle = styles.borderGreen;
      counter = this.renderTimerContent();
      break;
    case ACTIVITY_STATUS.REST:
      gradientColors = gradientColorsRestActive;
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
        {/* {this.renderActivityTopItems()} */}
        <View style={progressWrapper}>
          {counter}
        </View>
      </LinearGradient>
    );
  }

  renderBoxContainer = () => {
    const {controllerPosition} = this.props;
    const controls = this.renderActivityControls();
    const content = this.renderCounterContent();
    const elements = controllerPosition == TOP ? (
      <View
        {...containerStyleProps}
        style={[containerBorderStyle]}
      >
        {controls}
        {content}
      </View>
    ) : (
      <View
        {...containerStyleProps}
        style={[containerBorderStyle]}
      >
        {content}
        {controls}
      </View>
    );

    const containerBorderStyle = this.resolveContainerBorderStyle();

    return (
      elements
    );
  }

  render() {
    const container = this.renderBoxContainer();

    return container;
  }
}

CustomCounterTimerContainer.propTypes = {
  controllerButtons: PropTypes.any,
  controllerDisabledResetButtonStyle: PropTypes.any,
  controllerDisabledResetButtonTextStyle: PropTypes.any,
  controllerDisabledSkipButtonStyle: PropTypes.any,
  controllerDisabledSkipButtonTextStyle: PropTypes.any,
  controllerMainPrimaryActionButtonStyle: PropTypes.any,
  controllerMainPrimaryActionDisabledButtonStyle: PropTypes.any,
  controllerPosition: PropTypes.string,
  controllerResetButtonStyle: PropTypes.any,
  controllerResetButtonTextStyle: PropTypes.any,
  controllerResetText: PropTypes.string,
  controllerSecondPrimaryActionButtonStyle: PropTypes.any,
  controllerSkipButtonStyle: PropTypes.any,
  controllerSkipButtonText: PropTypes.string,
  controllerSkipButtonTextStyle: PropTypes.any,
  controlsWrapperStyle: PropTypes.any,
  counterSetSeperatorText: PropTypes.string,
  counterSetText: PropTypes.string,
  counterSetTextWrapperStyle: PropTypes.any,
  counterTexts: PropTypes.any,
  counterTimer: PropTypes.any,
  gradientColorsDefault: PropTypes.array,
  gradientColorsRepsActive: PropTypes.array,
  gradientColorsRestActive: PropTypes.array,
  leftUpperElement: PropTypes.element,
  onActivityCompleted: PropTypes.func,
  onContinueTimerPressed: PropTypes.func,
  onMuteToggle: PropTypes.func,
  onPauseRestPressed: PropTypes.func,
  onPauseTimerPressed: PropTypes.func,
  onResetButtonPressed: PropTypes.func,
  onRestTimeEnd: PropTypes.func,
  onSkipPressed: PropTypes.func,
  onStartRestPressed: PropTypes.func,
  onStartTimerPressed: PropTypes.func,
  onUnMuteToggle: PropTypes.func,
  progressAnimation: PropTypes.bool,
  progressBorderWidth: PropTypes.number,
  progressColorActive: PropTypes.string,
  progressColorRestTime: PropTypes.string,
  progressDirection: PropTypes.string,
  progressSize: PropTypes.number,
  progressStyle: PropTypes.any,
  progressThickness: PropTypes.number,
  progressVisible: PropTypes.bool,
  progressWrapper: PropTypes.any,
  showMuteElement: PropTypes.bool,
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
  topItemsWrapperStyle: PropTypes.any,
};

CustomCounterTimerContainer.defaultProps = {
  leftUpperElement: null,
  onMuteToggle: null,
  onPauseTimerPressed: null,
  onStartTimerPressed: null,
  onResetButtonPressed: null,
  onStartRestPressed: null,
  onPauseRestPressed: null,
  onContinueTimerPressed: null,
  onRestTimeEnd: null,
  onActivityCompleted: null,
  onSkipPressed: null,
  onUnMuteToggle: null,
  progressColorRestTime: progressColorRest,
  progressColorActive: progressColorTimer,
  gradientColorsDefault: gradientColorsDefault,
  gradientColorsRepsActive: gradientColorsRepsActive,
  gradientColorsRestActive: gradientColorsRestActive,
  counterSetText: 'Set',
  showMuteElement: true,
  progressVisible: true,
  controlsWrapperStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 10,
    paddingTop: 10,
  },
  progressWrapper: {
    paddingTop: 30,
  },
  topItemsWrapperStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  controllerButtons: [RESET, PRIMARY_ACTION, SKIP],
  controllerPosition: BOTTOM,
  controllerResetText: RESET,
  controllerResetButtonStyle: {
    paddingTop: 10,
    alignItems: 'center',
    flex: 1,
  },
  controllerDisabledResetButtonTextStyle: null,
  controllerResetButtonTextStyle: {
    color: colors.background.blueCrock,
    fontSize: 16,
  },
  controllerSkipButtonText: SKIP,
  controllerDisabledSkipButtonTextStyle: null,
  controllerSkipButtonTextStyle: {
    color: colors.background.blueCrock,
    fontSize: 16,
  },
  controllerSkipButtonStyle: {
    paddingTop: 10,
    alignItems: 'center',
    flex: 1,
  },
  controllerDisabledSkipButtonStyle: null,
  controllerDisabledResetButtonStyle: null,
  controllerMainPrimaryActionButtonStyle: null,
  controllerMainPrimaryActionDisabledButtonStyle: null,
  controllerSecondPrimaryActionButtonStyle: null,

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
  counterSetSeperatorText: '/',
  counterSetTextWrapperStyle: {
    fontSize: 20,
    color: colors.background.black,
  },
  counterTimer: [HOURS, MINUITES, SECONDS],
};

export default CustomCounterTimerContainer;
