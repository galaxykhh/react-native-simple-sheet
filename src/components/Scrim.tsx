import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Pressable } from 'react-native';

export type ScrimProps = {
    onPress?: () => void;
    backgroundColor?: string;
};

export const Scrim: React.FC<ScrimProps> = memo((props) => {
    return (
        <Pressable
            onPress={props.onPress}
            style={{
                ...styles.scrim,
                backgroundColor:
                    props.backgroundColor ?? styles.scrim.backgroundColor,
            }}
        />
    );
});

const styles = StyleSheet.create({
    scrim: {
        flex: 1,
        backgroundColor: '#11111188',
    },
});
