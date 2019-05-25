/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Dimensions, View, TouchableOpacity, Text} from 'react-native';
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
  render() {
    const timer = {id: 1,
      name: 'DF',
      restTimeMinutes: 3,
      restTimeSeconds: 3,
      activeTimeMinutes: 0.11,
      activeTimeSeconds: 5,
      sets: 2,
      createdDate: null,
      modifiedDate: null};

    return (
      <View style={styles.container}>
        <CustomCounterTimerContainer
          leftUpperElement={this.renderUpperElement()}
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  settingsIconWrapper: {
    // position: 'absolute',
    // left: 20,
  },
});
