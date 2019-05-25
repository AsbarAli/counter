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
    backgroundColor: colors.background.blueCrock,
    borderColor: colors.background.blueCrock,
    borderWidth: Platform.OS == 'ios' ? 1.5 : 0,
  },
  primaryDisabledButton: {
    backgroundColor: colors.background.disabledBlue,
    borderColor: colors.background.disabledBlue,
    borderWidth: Platform.OS == 'ios' ? 1.5 : 0,
  },
  secondaryButton: {
    backgroundColor: colors.background.white,
    borderColor: colors.background.blueCrock,
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
    color: colors.background.blueCrock,
  },
  secondaryDisabledText: {
    color: colors.background.disabledBlue,
  },
});

export default styles;
