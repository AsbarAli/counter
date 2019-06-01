/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Dimensions, Alert, View, TouchableOpacity, Text} from 'react-native';
import {CustomCounterTimerContainer} from './src/containers';
import colors from '@RNCounterTimer:theme/colors';

const screen = Dimensions.get('window');

type Props = {};
export default class App extends Component<Props> {
  renderUpperElement = () => {
    return (
      <TouchableOpacity
        hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
        onPress={this.handleSettingModal}
        style={styles.settingsIconWrapper}
      >
        {/* <Image
            source={settingsIcon}
            style={styles.settingStyle}
          /> */}
        <Text>Text</Text>
      </TouchableOpacity>
    );
  }

  renderMiddleElement = () => {
    return (
      <Text>Something</Text>
    );
  }

  handleMuteToggle = () => {
    Alert.alert('mute');
  }

  handleStartTimePressed = () => {
    Alert.alert('start');
  }

  handleResetButtonPressed = () => {
    Alert.alert('handleResetButtonPressed');
  }

  handleSecondaryModeStartPressed = () => {
    Alert.alert('handleStartRestPressed');
  }

  handleSecondaryModePausePressed = () => {
    Alert.alert('handlePauseRestPressed');
  }

  handlePrimaryModeStartPressed = () => {
    Alert.alert('handleContinueTimerPressed');
  }

  handleSecondaryModeEnd = () => {
    Alert.alert('handleRestTimeEnd');
  }

  handlePrimaryModePausePressed = () => {
    Alert.alert('handleTimerPressed');
  }

  handleActivityCompleted = () => {
    Alert.alert('handleActivityCompleted');
  }

  handleSkipPressed = () => {
    Alert.alert('handleSkipPressed');
  }

  handleUnMuteTogglePressed = () => {
    Alert.alert('handleUnMuteTogglePressed');
  }

  render() {
    const timer = {id: 1,
      name: 'DF',
      restTimeHours: 0,
      restTimeMinutes: 0,
      restTimeSeconds: 0,
      activiTimeHours: 0,
      activeTimeMinutes: 0,
      activeTimeSeconds: 5,
      sets: 2,
      createdDate: null,
      modifiedDate: null};

    return (
      <View style={styles.container}>
        <CustomCounterTimerContainer

          // =========Controllers==========
          // controllerButtons={['PRIMARY_ACTION']}
          // controllerDisabledResetButtonStyle={{backgroundColor: 'yellow'}}
          // controllerDisabledResetButtonTextStyle={{color: 'red'}}
          // controllerDisabledSkipButtonStyle={{backgroundColor: 'green'}}
          // controllerDisabledSkipButtonTextStyle={{color: 'green'}}
          // controllerMainPrimaryActionButtonStyle={{backgroundColor: 'red'}}
          // controllerMainPrimaryActionDisabledButtonStyle={{backgroundColor: 'black'}}
          controllerPosition="TOP"
          // controllerResetButtonStyle={{paddingTop: 10, backgroundColor: 'blue', flex: 1, alignItems: 'center'}}
          // controllerResetButtonTextStyle={{color: 'red'}}
          // controllerResetText="RESET"
          // controllerSecondPrimaryActionButtonStyle={{backgroundColor: 'yellow'}}
          // controllerSkipButtonStyle={{backgroundColor: 'yellow'}}
          // controllerSkipButtonText="skipText"
          // controlsWrapperStyle={{
          //   // flexDirection: 'column',
          //   // justifyContent: 'space-between',
          //   alignItems: 'center',
          //   padding: 10,
          // }}

          counterTexts={['TIMER', 'SET']}
          // counterSetSeperatorText="-"
          // counterSetText="Setss"
          // counterSetTextWrapperStyle={{color: 'blue'}}
          counterTimer={['HOURS', 'MINUITES', 'SECONDS']}
          // onStartTimerPressed={this.handleStartTimePressed}
          // TODO: counterTimerDefaultStatusText, counterTimerPrimaryStatusText,counterTimerSecondaryStatusText
          counterTimerDefaultStatusText="Not startted"
          counterTimerPrimaryStatusText="primary"
          counterTimerSecondaryStatusText="secondary"
          counterTimerStatusTextVisible={false}

          // ===========Gradients==========
          // gradientColorsDefault={['#6B7A8F', 'white']}
          // gradientColorsRepsActive={['red', 'blue']}
          // gradientColorsRestActive={['#DAAD86', 'white']}

          // ========== Events =======================
          // onActivityCompleted={this.handleActivityCompleted}
          // onPrimaryModeStartPressed={this.handlePrimaryModeStartPressed}
          // onSecondaryModePausePressed={this.handleSecondaryModePausePressed}
          // onPrimaryModePausePressed={this.handlePrimaryModePausePressed}
          // onSecondaryModeEnd={this.handleSecondaryModeEnd}
          // onSecondaryModeStartPressed={this.handleSecondaryModeStartPressed}
          // onMuteToggle={this.handleMuteToggle}
          // onResetButtonPressed={this.handleResetButtonPressed}
          // onSkipPressed={this.handleSkipPressed}
          // onUnMuteToggle={this.handleUnMuteTogglePressed}

          // leftUpperElement={this.renderUpperElement()}
          // middleUpperElement={this.renderMiddleElement()}
          // showMuteElement={false}
          // showCounterTimer={false} // TODO: remove this

          // =========== Progress================
          // progressAnimation={false}
          // progressBorderWidth={5}
          // progressDirection="clockwise"
          // progressPrimaryStatusColor="red"
          // progressSecondaryStatusColor="blue"
          // progressSize={188}
          // progressStyle={{backgroundColor: 'red'}}
          // progressThickness={23}
          progressVisible={false}
          // progressWrapper={{paddingTop: 0, backgroundColor: 'blue'}}

          timer={timer}
          // topItemsWrapperStyle={{flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'stretch'}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    // flex: 1,
    // flexDirection: 'row',
    // height: 320,
    // marginTop: 32,
    // // paddingHorizontal: 16,
    // // paddingLeft: 12,
    // alignItems: 'flex-start',
    // // flexDirection: 'row',
    // // justifyContent: 'flex-start',
    // width: screen.width - 13,
    // // paddingVertical: 10,
    // marginLeft: 'auto',
    // marginRight: 'auto',
    // // flexDirection: 'column',
    // // justifyContent: 'flex-start',
    // borderWidth: 2,
    // borderColor: colors.activity.borderDefault,
    // // borderColor: colors.activity.borderGreen,
    // backgroundColor: colors.activity.white,
    // // marginRight: 20,
    // shadowColor: colors.activity.black,
    // shadowRadius: 4,
    // shadowOffset: {
    //   height: 0,
    //   width: 0,
    // },
    // shadowOpacity: 0.25,
    // borderRadius: 8,
  },
  settingsIconWrapper: {
    // position: 'absolute',
    // left: 20,
  },
});
