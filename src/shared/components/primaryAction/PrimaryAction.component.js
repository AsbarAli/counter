// @flow
import React from 'react';
import PropTypes from 'prop-types';
import type {Element as ReactElement} from 'react';

import PrimaryButtonComponent from '../primaryButton.component';

import {
  START,
  PAUSE,
  COMPLETED,
} from '@RNCounterTimer:shared/strings';

type PrimaryActionProps = {};
type PrimaryActionState = {};

const ACTIVITY_STATUS = {
  NOT_STARTED: 10001,
  IN_PROGRESS: 10002,
  REST: 10003,
  COMPLETED: 10004,
};

class PrimaryActionComponent extends React.PureComponent<PrimaryActionProps, PrimaryActionState> {
  static defaultProps: any

  constructor(props: PrimaryActionProps) {
    super(props);
  }

  handleStartTimerPressed = () => {
    this.props.onStartTimerPressed();
  }

  handlePrimaryModeStartPressed = () => {
    this.props.onPrimaryModeStartPressed();
  }

  handlePrimaryModePausePressed = () => {
    this.props.onPrimaryModePausePressed();
  }

  handleSecondaryModeStartPressed = () => {
    this.props.onSecondaryModeStartPressed();
  }

  handleSecondaryModePausePressed = () => {
    this.props.onSecondaryModePausePressed();
  }

  handleActivityCompleted = () => {
    this.props.onActivityCompleted();
  }

  renderContent = (): ReactElement<any> => {
    const {controllerMainPrimaryActionButtonStyle, controllerMainPrimaryActionDisabledButtonStyle, controllerMainPrimaryActionButtonElement,
      status, restTimerRunning, timerRunning, controllerMainPrimaryActionButtonTextStyle, controllerSecondPrimaryActionButtonTextStyle,
      controllerSecondPrimaryActionButtonElement, controllerSecondPrimaryActionButtonStyle} = this.props;

    let buttonText = null;
    let buttonType = null;
    let onButtonPress = null;
    let isCompleted = false;
    let userDefinedButtonStyle = null;
    let userDefinedTextStyle = null;
    let renderActionElement = null;

    switch (status) {
    case ACTIVITY_STATUS.NOT_STARTED:
      buttonText = START;
      buttonType = PrimaryButtonComponent.TYPE.PRIMARY;
      onButtonPress = this.handleStartTimerPressed;
      userDefinedButtonStyle = controllerMainPrimaryActionButtonStyle;
      userDefinedTextStyle = controllerMainPrimaryActionButtonTextStyle;
      renderActionElement = controllerMainPrimaryActionButtonElement;
      break;

    case ACTIVITY_STATUS.IN_PROGRESS:
      buttonText = timerRunning ? PAUSE : START;
      buttonType = timerRunning ? PrimaryButtonComponent.TYPE.SECONDARY : PrimaryButtonComponent.TYPE.PRIMARY;
      onButtonPress = timerRunning ? this.handlePrimaryModePausePressed : this.handlePrimaryModeStartPressed;
      userDefinedButtonStyle = timerRunning ? controllerSecondPrimaryActionButtonStyle : controllerMainPrimaryActionButtonStyle;
      userDefinedTextStyle = timerRunning ? controllerSecondPrimaryActionButtonTextStyle : controllerMainPrimaryActionButtonTextStyle;
      renderActionElement = timerRunning ? controllerSecondPrimaryActionButtonElement : controllerMainPrimaryActionButtonElement;
      break;

    case ACTIVITY_STATUS.REST:
      buttonText = restTimerRunning ? PAUSE : START;
      buttonType = restTimerRunning ? PrimaryButtonComponent.TYPE.SECONDARY : PrimaryButtonComponent.TYPE.PRIMARY;
      onButtonPress = restTimerRunning ? this.handleSecondaryModePausePressed : this.handleSecondaryModeStartPressed;
      userDefinedButtonStyle = timerRunning ? controllerSecondPrimaryActionButtonStyle : controllerMainPrimaryActionButtonStyle;
      userDefinedTextStyle = timerRunning ? controllerSecondPrimaryActionButtonTextStyle : controllerMainPrimaryActionButtonTextStyle;
      renderActionElement = timerRunning ? controllerSecondPrimaryActionButtonElement : controllerMainPrimaryActionButtonElement;
      break;

    case ACTIVITY_STATUS.COMPLETED:
      buttonText = COMPLETED;
      buttonType = PrimaryButtonComponent.TYPE.PRIMARY;
      onButtonPress = this.handleActivityCompleted;
      isCompleted = true;
      userDefinedButtonStyle = controllerMainPrimaryActionDisabledButtonStyle;
      userDefinedTextStyle = controllerMainPrimaryActionButtonTextStyle;
      break;
    }

    return (
      <PrimaryButtonComponent
        disabled={isCompleted}
        onPress={onButtonPress}
        renderActionElement={renderActionElement}
        text={buttonText}
        type={buttonType}
        userDefinedButtonStyle={userDefinedButtonStyle}
        userDefinedTextStyle={userDefinedTextStyle}
      />
    );
  }

  render() {
    const content = this.renderContent();

    return content;
  }
}

PrimaryActionComponent.propTypes = {
  controllerMainPrimaryActionButtonElement: PropTypes.any,
  controllerMainPrimaryActionButtonStyle: PropTypes.any,
  controllerMainPrimaryActionButtonTextStyle: PropTypes.any,
  controllerMainPrimaryActionDisabledButtonStyle: PropTypes.any,
  controllerSecondPrimaryActionButtonElement: PropTypes.any,
  controllerSecondPrimaryActionButtonStyle: PropTypes.any,
  controllerSecondPrimaryActionButtonTextStyle: PropTypes.any,
  onActivityCompleted: PropTypes.func.isRequired,
  onPrimaryModePausePressed: PropTypes.func.isRequired,
  onPrimaryModeStartPressed: PropTypes.func.isRequired,
  onSecondaryModePausePressed: PropTypes.func.isRequired,
  onSecondaryModeStartPressed: PropTypes.func.isRequired,
  onStartTimerPressed: PropTypes.func.isRequired,
  restTimerRunning: PropTypes.bool.isRequired,
  status: PropTypes.number.isRequired,
  timerRunning: PropTypes.bool.isRequired,
};

PrimaryActionComponent.defaultProps = {
  controllerMainPrimaryActionButtonStyle: null,
  controllerMainPrimaryActionDisabledButtonStyle: null,
  controllerSecondPrimaryActionButtonStyle: null,
  controllerMainPrimaryActionButtonTextStyle: null,
  controllerMainPrimaryActionButtonElement: null,
  controllerSecondPrimaryActionButtonTextStyle: null,
  controllerSecondPrimaryActionButtonElement: null,
};

export default PrimaryActionComponent;
