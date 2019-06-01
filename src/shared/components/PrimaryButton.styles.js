// @flow
import {StyleSheet, Platform} from 'react-native';

// import {typeFace} from '@crock:theme/base';
import colors from '@RNCounterTimer:theme/colors';

const styles = StyleSheet.create({
  // Base button style
  button: {
    borderRadius: 20,
    borderWidth: 1.5,
    width: 120,
    alignItems: 'center',
    height: 42,
    justifyContent: 'center',
  },

  // Button types
  primaryButton: {
    backgroundColor: colors.background.greenCrock,
    borderColor: colors.background.greenCrock,
    borderWidth: Platform.OS == 'ios' ? 1.5 : 0,
  },
  primaryDisabledButton: {
    backgroundColor: colors.background.disbaledGreenCrock,
    borderColor: colors.background.disbaledGreenCrock,
    borderWidth: Platform.OS == 'ios' ? 1.5 : 0,
  },
  secondaryButton: {
    backgroundColor: colors.background.white,
    borderColor: colors.background.greenCrock,
  },
  secondaryDisabledButton: {
    backgroundColor: colors.background.white,
    borderColor: colors.background.disabledBlue,
  },

  // Base button
  text: {
    // ...typeFace,
    fontSize: 16,
  },

  // Button text types
  primaryText: {
    color: colors.background.white,
  },
  secondaryText: {
    color: colors.background.greenCrock,
  },
  secondaryDisabledText: {
    color: colors.background.disabledBlue,
  },
});

export default styles;
