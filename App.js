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
        <Text>sss</Text>
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
      restTimeSeconds: 0.3,
      activeTimeMinutes: 0.11,
      activeTimeSeconds: 0.02,
      sets: 2,
      createdDate: null,
      modifiedDate: null};

    return (
      <View style={styles.container}>
        <CustomCounterTimerContainer
          // gradientColorsRepsActive={['red', 'blue']}
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
          leftUpperElement={this.renderUpperElement()}
          // showCounterTimer={false}
          // showMaxTime={false}
          // showSets={false}
          // setText="SEtss"
          middleUpperElement={this.renderMiddleElement()}
          // showPrimaryActionButton={false}
          // showResetButton={false}
          // showSkipButton={false}
          // showMuteElement={false}
          timer={timer}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 320,
    marginTop: 32,
    paddingHorizontal: 16,
    // paddingLeft: 12,
    paddingBottom: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: screen.width - 13,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  settingsIconWrapper: {
    // position: 'absolute',
    // left: 20,
  },
});
