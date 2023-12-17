import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';

type HandleProps = {
    color?: string;
};

export const Handle: React.FC<HandleProps> = memo((props) => {
    return (
        <View
            style={{
                ...styles.handle,
                backgroundColor: props.color ?? styles.handle.backgroundColor,
            }}
        />
    );
});

const styles = StyleSheet.create({
    handle: {
        marginVertical: 6,
        width: 40,
        height: 6,
        alignSelf: 'center',
        borderRadius: 999,
        backgroundColor: '#E5E7EB',
    },
});
