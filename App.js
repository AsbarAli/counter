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
          // gradientColorsRepsActive={['red', 'blue']}
          // gradientColorsDefault={['red', 'blue']}
          // gradientColorsRestActive={['red', 'blue']}
          // circularProgressAnimate={false}
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
          // showCircularProgress={false}
          // showMuteElement={false}
          // showCounterTimer={false}
          // skipText="BRR"

          // =========Controllers==========
          // controllerButtons={['RESET', 'PRIMARY_ACTION', 'SKIP']}
          // controllerDisabledResetButtonTextStyle={{color: 'red'}}
          // controllerResetButtonStyle={{paddingTop: 10}}
          // controllerResetButtonTextStyle={{color: 'red'}}
          // controllerResetButtonTextStyle={{color: 'green'}}
          // controllerResetText="RESET"
          // controlPosition="TOP"
          // controlsWrapperStyle={{
          //   flexDirection: 'row',
          //   justifyContent: 'space-between',
          //   padding: 10,
          // }}
          timer={timer}
          // timerContentWrapperStyle={{paddingTop: 30}}
          // topItemsWrapperStyle={{flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'stretch'}}
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
