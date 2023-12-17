import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SimpleSheet, useSimpleSheet } from 'react-native-simple-sheet';

export default function App() {
    const { ref, show, hide } = useSimpleSheet();

    return (
        <GestureHandlerRootView style={styles.root}>
            <View style={styles.container}>
                <Text onPress={show} style={styles.title}>
                    React Native Simple Sheet
                </Text>
                <Button title="Open" onPress={show} />
            </View>

            <SimpleSheet ref={ref}>
                <View style={styles.sheet}>
                    <Text style={styles.title}>I am Simple Sheet</Text>
                    <Text style={styles.message}>Set components you want.</Text>
                    <Button title="Close sheet" onPress={hide} />
                </View>
            </SimpleSheet>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },
    sheet: {
        alignItems: 'center',
        padding: 20,
        gap: 24,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    message: {
        fontSize: 16,
    },
});
