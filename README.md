# react-native-simple-sheet

Simple & Customizable bottom sheet for React Native.
This library is suitable for one-time action.

## Preview
![simple sheet](https://github.com/galaxykhh/react-native-simple-sheet/assets/79380337/63289096-b0b5-4de5-a738-902f8c751f6e)


## Features
* Gesture
* Style customizable
* Functional show / hide also

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

* make sure to wrap with <code>GestureHandlerRootView</code>
* Make sure pass the <code>**ref**</code> to controll
```tsx
import { SimpleSheet, useSimpleSheet } from 'react-native-simple-sheet';

export default function App() {
    const { ref, show, hide } = useSimpleSheet();

    // *** You can also use useRef ***
    // const ref = useRef<SheetHandler>(null);

    return (
        <GestureHandlerRootView style={styles.root}>
            <Text onPress={show} style={styles.title}>React Native Simple Sheet</Text>
            <Button
                title='Open'
                onPress={show}
            />

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
        </GestureHandlerRootView>
    );
}
```
## Parameters
| name            	            | type    	| required 	| description               	| default   	                |
|---------------------------	|---------	|----------	|---------------------------	|---------------------------	|
| sheetColor 	                | string  	| false    	| color of bottom sheet.    	| #FFFFFF   	                |
| scrimColor      	            | string  	| false    	| color of scrim (backdrop) 	| #11111188 	                |
| borderTopLeftRadius     	    | number  	| false    	| -           	                | 12   	                        |
| borderTopRightRadius     	    | number 	| false    	| -      	                    | 12      	                    |
| maxHeight     	            | number 	| false    	| max height of sheet      	    | screen height * 0.8      	    |
| dismissible     	            | boolean 	| false    	| dismiss when scrim tapped     | true      	                |


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
