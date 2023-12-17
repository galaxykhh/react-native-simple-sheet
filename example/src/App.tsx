import * as React from 'react';
import { Button, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SimpleSheet, useSimpleSheet } from 'react-native-simple-sheet';

export default function App() {
    const { ref, show, hide } = useSimpleSheet();
    const scheme = useColorScheme();
    const isDark = scheme === 'dark';

    const backgroundColor = isDark ? '#111111' : '#FFFFFF';
    const handleColor = isDark ? '#555555' : '#ECECEC';
    const scrimColor = isDark ? '#FFFFFF33' : '#11111188';
    const textColor = isDark ? '#FFFFFF' : '#000000';

    return (
        <GestureHandlerRootView style={styles.root}>
            <View style={{ ...styles.container, backgroundColor }}>
                <Text
                    onPress={show}
                    style={{ ...styles.title, color: textColor }}
                >
                    React Native Simple Sheet
                </Text>
                <Button title="Open" onPress={show} />
            </View>

            <SimpleSheet
                ref={ref}
                backgroundColor={backgroundColor}
                handleColor={handleColor}
                scrimColor={scrimColor}
            >
                <View style={styles.sheet}>
                    <Text style={{ ...styles.title, color: textColor }}>
                        I am Simple Sheet
                    </Text>
                    <Text style={{ ...styles.message, color: textColor }}>
                        Set components you want.
                    </Text>
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
