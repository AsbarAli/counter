/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Dimensions, Alert, Image, View, TouchableOpacity, Text} from 'react-native';
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

  renderResetButtonElement = () => {
    return (
      <Image
        source={{uri: 'https://previews.123rf.com/images/trankvilizator/trankvilizator1605/trankvilizator160500179/56141854-icon-the-button-with-the-restart-symbol.jpg'}}
        style={{width: 40, height: 40}}
      />
    );
  }

  renderDisabledResetButtonElement = () => {
    return (
      <Image
        source={{uri: 'https://banner2.kisspng.com/20180404/cfe/kisspng-computer-icons-reset-button-restart-5ac475ab2b43b6.6521509415228246191772.jpg'}}
        style={{width: 40, height: 40}}
      />
    );
  }

  renderSkipButtonElement = () => {
    return (
      <Image
        source={{uri: 'http://www.iconarchive.com/download/i7928/hopstarter/soft-scraps/Button-Forward.ico'}}
        style={{width: 40, height: 40}}
      />
    );
  }

  renderMainPrimaryActionButtonElement = () => {
    return (
      <Image
        source={{uri: 'http://images.clipartlogo.com/files/images/12/122831/windows-media-player-play-button-updated_p'}}
        style={{width: 40, height: 40}}
      />
    );
  }

  renderSecondPrimaryActionButtonElement = () => {
    return (
      <Image
        source={{uri: 'https://thewellofshelby.com/wp-content/uploads/2015/06/Pause-Queue.png'}}
        style={{width: 40, height: 40}}
      />
    );
  }

  render() {
    const timer = {id: 1,
      name: 'DF',
      restTimeHours: 0,
      restTimeMinutes: 0,
      restTimeSeconds: 7,
      activiTimeHours: 0,
      activeTimeMinutes: 0,
      activeTimeSeconds: 8,
      sets: 7,
      createdDate: null,
      modifiedDate: null};

    return (
      <View style={styles.container}>
        <CustomCounterTimerContainer

          // =========Controllers==========
          controllerButtons={[ 'RESET','PRIMARY_ACTION', 'SKIP']}
          // controllerDisabledResetButtonStyle={{backgroundColor: 'yellow'}}
          // controllerDisabledResetButtonTextStyle={{color: 'red'}}
          // controllerDisabledSkipButtonStyle={{backgroundColor: 'green'}}
          // controllerDisabledSkipButtonTextStyle={{color: 'green'}}
          controllerDisabledResetButtonElement={this.renderDisabledResetButtonElement()}
          controllerMainPrimaryActionButtonElement={this.renderMainPrimaryActionButtonElement()}
          controllerMainPrimaryActionButtonStyle={{ paddingTop: 10,
            alignItems: 'center',
            flex: 1,backgroundColor: 'white', borderColor: 'white'}}
          // controllerPosition="TOP"
          controllerMainPrimaryActionButtonTextStyle={{color: colors.background.greenCrock}}
          controllerMainPrimaryActionDisabledButtonStyle={{backgroundColor: 'white', borderColor: 'white'}}
          controllerPrimaryActionButtonStyle={{backgroundColor: 'red', borderColor: 'red'}}
          controllerResetButtonElement={this.renderResetButtonElement()}
          controllerSecondPrimaryActionButtonStyle={{ paddingTop: 10,
            alignItems: 'center',
            flex: 1,backgroundColor: 'white', borderColor: 'white'}}
          // controllerResetButtonStyle={{paddingTop: 10, backgroundColor: 'blue', flex: 1, alignItems: 'center'}}          
          // controllerResetButtonTextStyle={{color: 'red'}}
          // controllerResetText="RESET"
          controllerSecondPrimaryActionButtonTextStyle={{color: colors.background.greenCrock}}
          // controllerSkipButtonStyle={{backgroundColor: 'yellow'}}
          // controllerSkipButtonText="skipText"
          // controlsWrapperStyle={{
          //   // flexDirection: 'column',
          //   // justifyContent: 'space-between',
          //   alignItems: 'center',
          //   padding: 10,
          // }}
          controllerSkipButtonElement={this.renderSkipButtonElement()}

          controlleSecondPrimaryActionButtonElement={this.renderSecondPrimaryActionButtonElement()}
          // counterSetSeperatorText="-"
          // counterSetText="Setss"
          // counterSetTextWrapperStyle={{color: 'blue'}}
          counterTexts={['SET', 'TIMER', 'MAX_TIME']}
          // onStartTimerPressed={this.handleStartTimePressed}
          // TODO: counterTimerDefaultStatusText, counterTimerPrimaryStatusText,counterTimerSecondaryStatusText
          counterTimer={['HOURS', 'MINUITES', 'SECONDS']}
          counterTimerDefaultStatusText="START"
          counterTimerPrimaryStatusText="PLAYING"
          counterTimerSecondaryStatusText="RESTING"

          counterTimerStatusTextVisible

          // ===========Gradients==========
          gradientColorsDefault={['white', 'white']}
          gradientColorsRepsActive={['#FFDC00', 'white']}
          gradientColorsRestActive={['#FFC0CB', 'white']}

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
          progressDirection="clockwise"
          // progressPrimaryStatusColor="red"
          // progressSecondaryStatusColor="blue"
          progressSize={200}
          // progressStyle={{backgroundColor: 'red'}}
          progressThickness={10}
          // progressVisible={false}
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
