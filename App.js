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

  handleStartRestPressed = () => {
    Alert.alert('handleStartRestPressed');
  }

  handlePauseRestPressed = () => {
    Alert.alert('handlePauseRestPressed');
  }

  handleContinueTimerPressed = () => {
    Alert.alert('handleContinueTimerPressed');
  }

  handleRestTimeEnd = () => {
    Alert.alert('handleRestTimeEnd');
  }

  handleTimerPressed = () => {
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
      restTimeMinutes: 0,
      restTimeSeconds: 4,
      activeTimeMinutes: 0,
      activeTimeSeconds: 9,
      sets: 2,
      createdDate: null,
      modifiedDate: null};

    return (
      <View style={styles.container}>
        <CustomCounterTimerContainer
          // ===========Gradients==========
          // gradientColorsDefault={['red', 'blue']}
          // gradientColorsRepsActive={['red', 'blue']}
          // gradientColorsRestActive={['red', 'blue']}

          // onActivityCompleted={this.handleActivityCompleted}
          // onContinueTimerPressed={this.handleContinueTimerPressed}
          // onMuteToggle={this.handleMuteToggle}
          // onPauseRestPressed={this.handlePauseRestPressed}
          // onPauseTimerPressed={this.handleTimerPressed}
          // onResetButtonPressed={this.handleResetButtonPressed}
          // onRestTimeEnd={this.handleRestTimeEnd}
          // onSkipPressed={this.handleSkipPressed}
          // onStartRestPressed={this.handleStartRestPressed}
          // onStartTimerPressed={this.handleStartTimePressed}
          // onUnMuteToggle={this.handleUnMuteTogglePressed}
          // progressColorActive="red"
          // progressColorRestTime="blue"
          // leftUpperElement={this.renderUpperElement()}
          // showMaxTime={false}
          // showSets={false}
          // setText="SEtss"
          // middleUpperElement={this.renderMiddleElement()}
          // showMuteElement={false}
          // showCounterTimer={false}

          // =========Controllers==========
          // controllerButtons={['RESET', 'PRIMARY_ACTION', 'SKIP']}
          // controllerDisabledResetButtonStyle={{backgroundColor: 'yellow'}}
          // controllerDisabledResetButtonTextStyle={{color: 'red'}}
          // controllerDisabledSkipButtonStyle={{backgroundColor: 'green'}}
          // controllerDisabledSkipButtonTextStyle={{color: 'green'}}
          // controllerMainPrimaryActionButtonStyle={{backgroundColor: 'red'}}
          // controllerMainPrimaryActionDisabledButtonStyle={{backgroundColor: 'black'}}
          // controllerResetButtonStyle={{paddingTop: 10, backgroundColor: 'blue', flex: 1, alignItems: 'center'}}
          // controllerResetButtonTextStyle={{color: 'green'}}
          // controllerResetButtonTextStyle={{color: 'red'}}
          // controllerResetText="RESET"
          // controllerSecondPrimaryActionButtonStyle={{backgroundColor: 'yellow'}}
          // controllerSkipButtonStyle={{backgroundColor: 'yellow'}}

          // controllerSkipButtonText="skipText"
          // controlPosition="TOP"
          // controlsWrapperStyle={{
          //   flexDirection: 'row',
          //   justifyContent: 'space-between',
          //   padding: 10,
          // }}

          // =========== Progress================
          // progressAnimation={false}
          // progressBorderWidth={5}
          // progressDirection="clockwise"
          // progressSize={98}
          // progressStyle={{backgroundColor: 'red'}}
          // progressThickness={23}
          // progressVisible={false}
          // progressWrapper={{paddingTop: 0, backgroundColor: 'blue'}}

          // topItemsWrapperStyle={{flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'stretch'}}
          timer={timer}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // height: 320,
    marginTop: 32,
    // paddingHorizontal: 16,
    // paddingLeft: 12,
    // alignItems: 'flex-start',
    // flexDirection: 'row',
    // justifyContent: 'flex-start',
    width: screen.width - 13,
    // paddingVertical: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    // flexDirection: 'column',
    // justifyContent: 'flex-start',
    borderWidth: 2,
    borderColor: colors.activity.borderDefault,
    // borderColor: colors.activity.borderGreen,
    backgroundColor: colors.activity.white,
    // marginRight: 20,
    shadowColor: colors.activity.black,
    shadowRadius: 4,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 0.25,
    borderRadius: 8,
  },
  settingsIconWrapper: {
    // position: 'absolute',
    // left: 20,
  },
});
