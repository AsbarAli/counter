// @flow
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import type {Element as ReactElement} from 'react';

import styles from './PrimaryButton.styles';

type PrimaryButtonProps = {
  buttonStyle: {[string]: any} | number | null,
  disabled: bool,
  textStyle: {[string]: any} | number | null,
  type: PrimaryButtonComponent.TYPE.PRIMARY | PrimaryButtonComponent.TYPE.SECONDARY,
};
type PrimaryButtonState = null;

class PrimaryButtonComponent extends React.PureComponent<PrimaryButtonProps, PrimaryButtonState> {
  static defaultProps: any
  static TYPE = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
  }

  constructor(props: PrimaryButtonProps) {
    super(props);
  }

  _buttonStyleMap = {
    [PrimaryButtonComponent.TYPE.PRIMARY]: styles.primaryButton,
    [PrimaryButtonComponent.TYPE.SECONDARY]: styles.secondaryButton,
  }

  _disabledButtonStyleMap = {
    [PrimaryButtonComponent.TYPE.PRIMARY]: styles.primaryDisabledButton,
    [PrimaryButtonComponent.TYPE.SECONDARY]: styles.secondaryDisabledButton,
  }

  _disabledTextStylesMap = {
    [PrimaryButtonComponent.TYPE.PRIMARY]: styles.primaryText,
    [PrimaryButtonComponent.TYPE.SECONDARY]: styles.secondaryDisabledText,
  }

  _buttonTextStyleMap = {
    [PrimaryButtonComponent.TYPE.PRIMARY]: styles.primaryText,
    [PrimaryButtonComponent.TYPE.SECONDARY]: styles.secondaryText,
  }

  renderContent = (): ReactElement<any> => {
    const {text, type, onPress, disabled, buttonStyle, textStyle, userDefinedButtonStyle} = this.props;
    const buttonStyles = [styles.button, this._buttonStyleMap[type]];
    const buttonTextStyles = [styles.text, this._buttonTextStyleMap[type]];

    if (disabled) {
      buttonStyles.push(this._disabledButtonStyleMap[type]);
      buttonTextStyles.push(this._disabledTextStylesMap[type]);
    }

    if (buttonStyle) {
      buttonStyles.push({buttonStyle});
    }

    if (textStyle) {
      buttonTextStyles.push(textStyle);
    }

    // Should give priority for user define styles
    if (userDefinedButtonStyle) {
      buttonStyles.push(userDefinedButtonStyle);
    }

    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={buttonStyles}
      >
        <Text style={buttonTextStyles}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    const content = this.renderContent();

    return content;
  }
}

PrimaryButtonComponent.propTypes = {
  buttonStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  disabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  type: PropTypes.oneOf([PrimaryButtonComponent.TYPE.PRIMARY, PrimaryButtonComponent.TYPE.SECONDARY]).isRequired,
  userDefinedButtonStyle: PropTypes.any,
};

PrimaryButtonComponent.defaultProps = {
  buttonStyle: null,
  disabled: false,
  textStyle: null,
  userDefinedButtonStyle: null,
};

export default PrimaryButtonComponent;
