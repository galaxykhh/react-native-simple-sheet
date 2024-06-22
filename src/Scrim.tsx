import React, { memo } from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Animated, { AnimatedStyle } from 'react-native-reanimated';

export type ScrimProps = {
    onPress?: () => void;
    animatedStyle: AnimatedStyle<StyleProp<ViewStyle>>;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Scrim: React.FC<ScrimProps> = memo((props) => {
    return (
        <AnimatedPressable
            onPress={props.onPress}
            style={[StyleSheet.absoluteFill, props.animatedStyle]}
        />
    );
});
