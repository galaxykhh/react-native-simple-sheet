import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SimpleSheet, SimpleSheetProps } from '../../src/SimpleSheet';

type ConfirmCancelSheetProps = SimpleSheetProps & {
    onConfirm: () => void;
    onCancel: () => void;
};

const ConfirmCancelSheet = ({
    onConfirm,
    onCancel,
    ...props
}: ConfirmCancelSheetProps) => {
    return (
        <SimpleSheet {...props}>
            <View style={styles.container}>
                <Text style={styles.title}>Hello Confirm Cancel Sheet!</Text>
                <Text style={styles.message}>Select</Text>
                <Button title="Confirm" onPress={onConfirm} />
                <Button title="Cancel" onPress={onCancel} />
            </View>
        </SimpleSheet>
    );
};

export default ConfirmCancelSheet;

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
});
