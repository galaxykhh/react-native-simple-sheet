import * as React from 'react';
import { Button, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SimpleSheetProvider, useSimpleSheet, SimpleSheet } from '../../src';

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
    const scheme = useColorScheme();
    const isDark = scheme === 'dark';

    const backgroundColor = isDark ? '#111111' : '#FFFFFF';
    const scrimColor = isDark ? '#FFFFFF33' : '#11111188';
    const textColor = isDark ? '#FFFFFF' : '#000000';

    return (
        <View style={{ ...styles.container, backgroundColor }}>
            <Text style={{ ...styles.title, color: textColor }}>
                React Native Simple Sheet
            </Text>
            <Button
                title="Open A"
                onPress={async () => {
                    const result = await new Promise((resolve) => {
                        sheet.open(({ visible, close, exit }) => {
                            const confirm = () => {
                                close(() => resolve('confirm'));
                            };
                            const cancel = () => {
                                close(() => resolve('cancel'));
                            };

                            return (
                                <SimpleSheet
                                    visible={visible}
                                    exit={exit}
                                    close={cancel}
                                    onDismiss={cancel}
                                    scrimColor={scrimColor}
                                >
                                    <View
                                        style={{
                                            height: 500,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Text style={styles.title}>
                                            Hello modal
                                        </Text>
                                        <Button
                                            title="CONFIRM"
                                            onPress={confirm}
                                        />
                                        <Button
                                            title="CANCEL"
                                            onPress={cancel}
                                        />
                                    </View>
                                </SimpleSheet>
                            );
                        });
                    });
                    console.log(result);
                }}
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
    sheet: {
        alignItems: 'center',
        padding: 24,
        marginBottom: 48,
        gap: 24,
    },
    scrollable: {
        height: 500,
        padding: 12,
        paddingBottom: 32,
        gap: 12,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    message: {
        fontSize: 16,
    },
    item: {
        padding: 20,
        backgroundColor: '#ECECEC',
        borderRadius: 12,
    },
    separator: {
        height: 4,
    },
    input: {
        fontSize: 24,
    },
});
