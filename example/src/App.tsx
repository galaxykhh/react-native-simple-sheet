import * as React from 'react';
import { Button, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SimpleSheetProvider, useSimpleSheet } from '../../src';
import ConfirmCancelSheet from './ConfirmCancelSheet';
import AvoidKeyboardSheet from './AvoidKeyboardSheet';

export default function App() {
    return (
        <GestureHandlerRootView style={styles.root}>
            <SimpleSheetProvider>
                <MyView />
            </SimpleSheetProvider>
        </GestureHandlerRootView>
    );
}

function MyView() {
    const sheet = useSimpleSheet();
    const [result, setResult] = React.useState<string>('none');
    const scheme = useColorScheme();
    const isDark = scheme === 'dark';

    const backgroundColor = isDark ? '#111111' : '#FFFFFF';
    const textColor = isDark ? '#FFFFFF' : '#000000';

    return (
        <View style={{ ...styles.container, backgroundColor }}>
            <Text style={{ ...styles.title, color: textColor }}>
                React Native Simple Sheet
            </Text>
            <Text>current result: {result}</Text>
            <Button
                title="Open Simple Sheet"
                onPress={async () => {
                    const result = await new Promise<string>((resolve) => {
                        sheet.open((props) => (
                            <ConfirmCancelSheet
                                {...props}
                                onCancel={() =>
                                    props.close(() => resolve('cancel'))
                                }
                                onConfirm={() =>
                                    props.close(() => resolve('confirm'))
                                }
                                onDismiss={() => resolve('dismissed')}
                            />
                        ));
                    });

                    console.log('BottomSheet closed!');

                    setResult(result);
                }}
            />

            <Button
                title="Open AvoidKeyboard Sheet"
                onPress={() =>
                    sheet.open(({ visible, close, unmount }) => (
                        <AvoidKeyboardSheet
                            visible={visible}
                            close={close}
                            unmount={unmount}
                        />
                    ))
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 12,
    },
});
