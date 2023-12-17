# react-native-simple-sheet

Simple react native package for bottom sheet.

## Preview
![simple-sheet](https://github.com/galaxykhh/react-native-simple-sheet/assets/79380337/96ae56a3-7af0-462c-85ea-fb00344bfb60)


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

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
