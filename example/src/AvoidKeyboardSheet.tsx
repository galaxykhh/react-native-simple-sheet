import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SimpleSheet, SimpleSheetProps } from '../../src/SimpleSheet';

const AvoidKeyboardSheet = (props: SimpleSheetProps) => {
    return (
        <SimpleSheet {...props}>
            <View style={styles.container}>
                <Text style={styles.title}>Hello AvoidKeyboard Sheet!</Text>
                <TextInput style={styles.input} placeholder="tab here.." />
            </View>
        </SimpleSheet>
    );
};

export default AvoidKeyboardSheet;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingBottom: 60,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    message: {
        fontSize: 16,
        marginBottom: 16,
    },
    input: {
        fontSize: 24,
    },
});
