

## Props

### Controller Props

| Props | Type | Default Values |
| ------------- | ------------- |----|
| controllerButtons                             |  Array | ['RESET', 'PRIMARY_ACTION', 'SKIP'] |
| controllerDisabledResetButtonStyle            | Object | null |
|controllerDisabledResetButtonTextStyle         | Object | null |
|controllerDisabledSkipButtonStyle              | Object | null |
|controllerDisabledSkipButtonTextStyle          | Object | null |
|controllerMainPrimaryActionButtonStyle         | Object | null |
|controllerMainPrimaryActionDisabledButtonStyle | Object | null |
|controllerResetButtonStyle                     | Object | {paddingTop: 10,alignItems: 'center',flex: 1}| 
|controllerResetButtonTextStyle                 | Object | {color: colors.background.blueCrock,fontSize: 16}|
|controllerResetText                            | String | 'RESET'|
|controllerSecondPrimaryActionButtonStyle       | Object | null |
|controllerSkipButtonStyle                      | Object | {paddingTop: 10,alignItems: 'center',flex: 1,}|
|controllerSkipButtonText                       | String | 'SKIP'|
|controllerPosition                             | String | 'BOTTOM'|
|controlsWrapperStyle                           | Object | {flexDirection: 'row',justifyContent: 'space-around',paddingBottom: 10,paddingTop: 10,}|

### Progress Props

| Props | Type | Default Values |
|------------|---------------|----------------|
| progressAnimation       | bool   | true                                             |
| progressBorderWidth     | Number | 0                                                |
| progressDirection       | String | 'clockwise'                                      |
| progressStyle           | Object | {alignItems: 'center',justifyContent: 'center',} |
| progressThickness       | Number | 4                                                |
| progressVisible         | bool   | true                                             |
| progressSize            | Number | 140                                              |
| progressWrapper         | Object | { paddingTop: 30}                                |

### Counter Props

| Props | Type | Default Values |
|------------|---------------|----------------|
| counterSetSeperatorText | String | '/' |
| counterSetText          | String | 'Set' |
| counterSetTextWrapperStyle | Object | counterSetTextWrapperStyle: {fontSize: 20, color: colors.background.black} |
| counterTexts | Array | ['MAX_TIME', 'TIMER', 'SET'] } |
| counterTimer | Array | ['HOURS', 'MINUITES', 'SECONDS'] |
