import * as React from 'react';
import {
    Button,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    View,
    useColorScheme,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SimpleSheet, useSimpleSheet } from 'react-native-simple-sheet';

export default function App() {
    const [ref1, show1, hide1] = useSimpleSheet();
    const [ref2, show2, hide2] = useSimpleSheet();
    const [ref3, show3, hide3] = useSimpleSheet();

    const scheme = useColorScheme();
    const isDark = scheme === 'dark';

    const backgroundColor = isDark ? '#111111' : '#FFFFFF';
    const scrimColor = isDark ? '#FFFFFF33' : '#11111188';
    const textColor = isDark ? '#FFFFFF' : '#000000';

    return (
        <GestureHandlerRootView style={styles.root}>
            <View style={{ ...styles.container, backgroundColor }}>
                <Text style={{ ...styles.title, color: textColor }}>
                    React Native Simple Sheet
                </Text>
                <Button title="Open" onPress={show1} />
                <Button title="Open List" onPress={show2} />
                <Button title="Keyboard Avoiding" onPress={show3} />
            </View>

            <SimpleSheet
                ref={ref1}
                sheetColor={backgroundColor}
                scrimColor={scrimColor}
            >
                <View style={styles.sheet}>
                    <Text style={{ ...styles.title, color: textColor }}>
                        Simple Sheet
                    </Text>
                    <Text style={{ ...styles.message, color: textColor }}>
                        Set components you want.
                    </Text>
                    <Button title="Close sheet" onPress={hide1} />
                </View>
            </SimpleSheet>

            <SimpleSheet
                ref={ref2}
                sheetColor={backgroundColor}
                scrimColor={scrimColor}
            >
                <View style={styles.scrollable}>
                    <Text style={styles.title}>Numbers</Text>
                    <FlatList
                        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]}
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <Text>{item}</Text>
                            </View>
                        )}
                        ItemSeparatorComponent={() => (
                            <View style={styles.separator} />
                        )}
                    />
                    <Button title="Close Sheet" onPress={hide2} />
                </View>
            </SimpleSheet>

            <SimpleSheet
                ref={ref3}
                avoidKeyboard
                sheetColor={backgroundColor}
                scrimColor={scrimColor}
            >
                <View style={styles.container}>
                    <TextInput style={styles.input} placeholder="Edit here" />
                    <Button title="Close Sheet" onPress={hide3} />
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
        height: '100%',
        padding: 12,
        paddingBottom: 32,
        gap: 12,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
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
