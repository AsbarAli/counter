// @flow
import {StyleSheet} from 'react-native';

// import {typeFace} from '@crock:theme/base';
import colors from '@RNCounterTimer:theme/colors';

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
    // marginTop: 20,
    height: 180,
  },

  circularProgress: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressLabelsContainer: {
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 20,
    height: 100,
    width: 130,
  },

  timeTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  totalTimeText: {
    // ...typeFace,
    flex: 1,
    fontSize: 16,
    color: colors.font.weightColor,
  },
  totalTimeColon: {
    // ...typeFace,
    fontSize: 16,
  },
  elapsedTimeText: {
    // ...typeFace,
    flex: 1,
    fontSize: 38,
    color: colors.background.black,
    // width: 40,
  },
  timeMinutesRightAlignText: {
    // justifyContent: 'flex-end',
    textAlign: 'right',
    alignSelf: 'stretch',
  },
  elapsedTimeSeconds: {},
  elapsedTimeColon: {
    // ...typeFace,
    fontSize: 38,
    color: colors.background.black,
  },
  labelText: {
    // ...typeFace,
    fontSize: 20,
    color: colors.background.black,
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
});

export default style;

export const progressCircleDefaultStyleProps = {
  borderWidth: 0,
  size: 140,
  thickness: 4,
  unfilledColor: colors.activity.progressBackground,
};
