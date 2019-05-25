/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Dimensions, View} from 'react-native';
import {CustomCounterTimerContainer} from './src/containers';

const screen = Dimensions.get('window');

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
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
});
