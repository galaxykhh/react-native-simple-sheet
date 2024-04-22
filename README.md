# react-native-simple-sheet

Simple & Customizable Bottom Sheet for React Native.
This library is suitable for one-time action.

## Preview
![simple sheet](https://github.com/galaxykhh/react-native-simple-sheet/assets/79380337/63289096-b0b5-4de5-a738-902f8c751f6e)


## Features
* Gesture
* Style customizable
* Keyboard Avoiding Sheet

## Installation

This library needs react-native-reanimated and react-native-gesture-handler.

#### Yarn
```sh
yarn add react-native-reanimated react-native-gesture-handler react-native-simple-sheet
```

#### Expo
```sh
npx expo install react-native-reanimated react-native-gesture-handler react-native-simple-sheet
```

## Usage

* Make sure to wrap with <code>GestureHandlerRootView</code>
* Make sure pass the <code>**ref**</code> to controll
```tsx
import { SimpleSheet, useSimpleSheet } from 'react-native-simple-sheet';

export default function App() {
    return (
        <GestureHandlerRootView style={styles.root}>
            <MyScreen />
        </GestureHandlerRootView>
    );
}

...

export default function MyScreen() {
    const [ref, show, hide] = useSimpleSheet();
    // or name what you want.
    // const [mySheetRef, showMySheet, hideMySheet] = useSimpleSheet();

    return (
        <SimpleSheet ref={ref}>
            <View style={styles.sheet}>
                <Text style={styles.title}>I am Simple Sheet</Text>
                <Text style={styles.message}>Set components you want.</Text>
                <Button
                    title='Close sheet'
                    onPress={hide}
                />
            </View>
        </SimpleSheet>
    );
}
```
## Parameters
| name            	            | type    	| required 	| description               	| default   	                |
|---------------------------	|---------	|----------	|---------------------------	|---------------------------	|
| ref 	                        | React.Ref | O    	| sheet controller    	        | -   	                        |
| sheetColor 	                | string  	| X    	| color of bottom sheet.    	| #FFFFFF   	                |
| scrimColor      	            | string  	| X    	| color of scrim (backdrop) 	| #11111188 	                |
| borderTopLeftRadius     	    | number  	| X    	| -           	                | 12   	                        |
| borderTopRightRadius     	    | number 	| X    	| -      	                    | 12      	                    |
| maxHeight     	            | number 	| X    	| max height of sheet      	    | screen height * 0.8      	    |
| dismissible     	            | boolean 	| X    	| dismiss when scrim tapped     | true      	                |
| avoidKeyboard     	        | boolean 	| X    	| determines whether the bottom sheet will also move up when the keyboard is shown. | false      	                |
| gestureEnable     	        | boolean 	| X    	| determines whether the sheet will be animate when swipe gesture.                             | true      	                    |
| onShow     	| function 	| X    	| will be called once the modal has been shown.                             | -      	                    |
| onDismiss     	| function 	| X    	| will be called once the modal has been dismissed.                             | -      	                    |


## Known Issue
The Keyboard Avoiding feature does not work as smoothly as expected on Android.
* This issue is related to an issue with reanimated. For more details, please refer this [PR](https://github.com/software-mansion/react-native-reanimated/issues/5754).
* When setting the avoidKeyboard property to true on Android, the top status bar will visible.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
