import React, { memo, useEffect } from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
    AnimatedStyle,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

export type ScrimProps = {
    onPress?: () => void;
    animatedStyle: AnimatedStyle<StyleProp<ViewStyle>>;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Scrim: React.FC<ScrimProps> = memo((props) => {
    const mounted = useSharedValue(false);
    const opacity = useAnimatedStyle(
        () => ({
            opacity: withTiming(mounted.value ? 1 : 0),
        }),
        []
    );

    useEffect(() => {
        mounted.value = true;
    }, []);

    return (
        <AnimatedPressable
            onPress={props.onPress}
            style={[StyleSheet.absoluteFill, opacity, props.animatedStyle]}
        />
    );
});
