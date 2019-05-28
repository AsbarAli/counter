// @flow
import {StyleSheet} from 'react-native';

// import {typeFace, typeFaceMontserrat, secondaryText} from '@crock:theme/base';
import colors from '@RNCounterTimer:theme/colors';
// import colors from './../../theme/colors';

const style = StyleSheet.create({
  borderGreen: {
    borderColor: colors.activity.borderGreen,
    borderRadius: 8,
  },
  borderOrange: {
    borderColor: colors.activity.borderOrange,
    borderRadius: 8,
  },
  activityStatusWrapper: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityStatusText: {
    // ...typeFace,
    // ...secondaryText,
    color: colors.background.black,
    fontSize: 16,

    // marginLeft: 'auto',
    // marginRight: 'auto',
  },
  muteIconWrapper: {
    // position: 'absolute',
    // top: 10,
    // right: 20,
  },

  settingsIconWrapper: {
    // position: 'absolute',
    // left: 20,
  },

  muteIcon: {
    width: 24,
    height: 24,
  },

  contentWrapper: {
    // height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },

  resetWrapper: {
    paddingTop: 10,
    // width: 60,
  },
  resetContainer: {
    // ...typeFace,

    color: colors.background.blueCrock,
    fontSize: 16,
  },
  resetContainerDisabled: {
    // ...typeFace,
    color: colors.background.disableBlueCrock,
    fontSize: 16,
  },
  skipWrapper: {
    paddingTop: 10,
    // width: 60,
  },
  skipContainer: {
    // ...typeFace,
    color: colors.background.blueCrock,
    fontSize: 16,
  },
  textDisabled: {
    color: colors.background.disabledBlue,
  },

  repsInstructionsContainer: {
    marginTop: 20,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },
  repInstructionCompletionText: {
    // ...typeFaceMontserrat,
    fontSize: 16,
    alignItems: 'center',
    textAlign: 'center',
  },
  repInstructionSetText: {
    // ...typeFace,
    fontSize: 22,
    color: colors.background.black,
  },

  completedPlaceholder: {
    marginTop: 20,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedText: {
    // ...typeFace,
    fontSize: 22,
    color: colors.background.black,
    alignSelf: 'center',
  },
  activeTextStyle: {
    color: colors.activity.borderGreen,
  },
  resetTextStyle: {
    color: colors.activity.borderOrange,
  },
  defaultStatusTextStyle: {
    color: colors.activity.black,
  },
});

export default style;

export const containerStyleProps = {
  // Android shadow
  elevation: 5,

  // iOS shadow
  // shadowColor: colors.background.crockfitGray,
  // shadowRadius: 2,
  // shadowOffset: {
  //   height: 0,
  //   width: 0,
  // },
  // shadowOpacity: 1,
  // Moved up to the styles
};

export const gradientColorsRepsDefault = [colors.activity.white, colors.activity.white];
export const gradientColorsRepsInactive = gradientColorsRepsDefault;
export const gradientColorsRepsActive = [colors.activity.backgroundGreen, colors.activity.white];
export const gradientColorsRestInactive = [colors.activity.backgroundOrange, colors.activity.white];
export const gradientColorsRestActive = [colors.activity.backgroundOrange, colors.activity.white];

export const progressColorRest = colors.activity.borderOrange;
export const progressColorTimer = colors.activity.borderGreen;
