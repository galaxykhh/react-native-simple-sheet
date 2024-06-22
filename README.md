# react-native-simple-sheet

Simple & Customizable Bottom Sheet for React Native.
This library is suitable for one-time action.

## Preview

![simple sheet](https://github.com/galaxykhh/react-native-simple-sheet/assets/79380337/63289096-b0b5-4de5-a738-902f8c751f6e)

## Features

- Gesture control
- Style customizable
- Keyboard Avoiding Sheet

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

## Must be

- Wrap your App with `GestureHandlerRootView`
- Wrap your App with `SimpleSheetProvider`

```jsx
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SimpleSheetProvider>
        <MyScreen />
      </SimpleSheetProvider>
    </GestureHandlerRootView>
  );
}
```

## Usage

```jsx
export default function MyScreen() {
  const sheet = useSimpleSheet();

  return (
    <Button
      title="Open Sheet"
      onPress={() =>
        sheet.open((props) => (
          <SimpleSheet {...props}>// My Content</SimpleSheet>
        ))
      }
    />
  );
}
```

## Parameters

| name                 | type     | required | description                                                                                         | default              |
| -------------------- | -------- | -------- | --------------------------------------------------------------------------------------------------- | -------------------- |
| visible              | boolean  | O        | determines whether the bottom sheet is visible. The animation operates based on the visible value.  | -                    |
| close                | function | O        | triggers the animation to close the bottom sheet.                                                   | -                    |
| unmount              | function | O        | unmounts the bottom sheet from the root. It is typically called after the close animation finished. | -                    |
| onDismiss            | function | X        | called when the sheet is dismissed via a gesture or a scrim touch.                                  | -                    |
| dismissible          | boolean  | X        | dismiss when scrim tapped                                                                           | true                 |
| gestureEnable        | boolean  | X        | determines whether the sheet will be animate when swipe gesture.                                    | true                 |
| avoidKeyboard        | boolean  | X        | determines whether the bottom sheet will also move up when the keyboard is shown.                   | true                 |
| sheetColor           | string   | X        | color of bottom sheet.                                                                              | #FFFFFF              |
| borderTopLeftRadius  | number   | X        | -                                                                                                   | 12                   |
| borderTopRightRadius | number   | X        | -                                                                                                   | 12                   |
| maxHeight            | number   | X        | max height of sheet                                                                                 | screen height \* 0.8 |
| scrimColor           | string   | X        | color of scrim (backdrop)                                                                           | #11111188            |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
