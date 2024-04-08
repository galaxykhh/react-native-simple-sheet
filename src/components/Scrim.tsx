import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Pressable } from 'react-native';

export type ScrimStyleProps = {
    /**
     * The color of scrim.
     * @default #11111188
     * */
    scrimColor?: string;
};

export type ScrimProps = ScrimStyleProps & {
    onPress?: () => void;
};

export const Scrim: React.FC<ScrimProps> = memo((props) => {
    return (
        <Pressable
            onPress={props.onPress}
            style={{
                ...styles.scrim,
                backgroundColor:
                    props.scrimColor ?? styles.scrim.backgroundColor,
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
