// @flow
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';
import type {Element as ReactElement} from 'react';

import styles from './Reset.styles';

type ResetProps = {};
type ResetState = {};

const ACTIVITY_STATUS = {
  NOT_STARTED: 10001,
  IN_PROGRESS: 10002,
  REST: 10003,
  COMPLETED: 10004,
};

import {
  RESET,
} from '@RNCounterTimer:shared/strings';
import colors from '@RNCounterTimer:theme/colors';

class ResetComponent extends React.PureComponent<ResetProps, ResetState> {
  static defaultProps: any

  constructor(props: ResetProps) {
    super(props);
  }

  handleResetPressed = () => {
    this.props.onResetPressed();
  }

  renderContent = (): ReactElement<any> => {
    const {controllerResetText, controllerResetButtonStyle, controllerDisabledResetButtonTextStyle, status, currentRunningSet,
      controllerDisabledResetButtonStyle, controllerResetButtonTextStyle, controllerResetButtonElement, controllerDisabledResetButtonElement} = this.props;
    const textStyles = [controllerResetButtonTextStyle];
    const buttonStyle = [controllerResetButtonStyle];
    const disabled = currentRunningSet === 0 && status === ACTIVITY_STATUS.NOT_STARTED;
    let resetButtonElement = controllerResetButtonElement;

    if (disabled) {
      textStyles.push(styles.textDisabled);
      if (controllerDisabledResetButtonTextStyle) {
        textStyles.push(controllerDisabledResetButtonTextStyle);
      }
      if (controllerDisabledResetButtonStyle) {
        buttonStyle.push(controllerDisabledResetButtonStyle);
      }

      if (controllerDisabledResetButtonElement) {
        resetButtonElement = controllerDisabledResetButtonElement;
      }
    }

    const butttonElement = controllerResetButtonElement ? resetButtonElement : (<Text style={textStyles}>{controllerResetText}</Text>);

    return (
      <TouchableOpacity
        disabled={disabled}
        // hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
        onPress={this.handleResetPressed}
        style={buttonStyle}
      >
        {butttonElement}
      </TouchableOpacity>
    );
  }

  render() {
    const content = this.renderContent();

    return content;
  }
}

ResetComponent.propTypes = {
  controllerDisabledResetButtonElement: PropTypes.any,
  controllerDisabledResetButtonStyle: PropTypes.any,
  controllerDisabledResetButtonTextStyle: PropTypes.any,
  controllerResetButtonElement: PropTypes.any,
  controllerResetButtonStyle: PropTypes.any,
  controllerResetButtonTextStyle: PropTypes.any,
  controllerResetText: PropTypes.string,
  currentRunningSet: PropTypes.number.isRequired,
  onResetPressed: PropTypes.func.isRequired,
  status: PropTypes.number.isRequired,
};

ResetComponent.defaultProps = {
  controllerResetButtonStyle: {
    paddingTop: 10,
    alignItems: 'center',
    flex: 1,
  },
  controllerResetText: RESET,
  controllerDisabledResetButtonTextStyle: null,
  controllerDisabledResetButtonStyle: null,
  controllerResetButtonTextStyle: {
    color: colors.background.greenCrock,
    fontSize: 16,
  },
  controllerResetButtonElement: null,
  controllerDisabledResetButtonElement: null,
};

export default ResetComponent;

