import React, { type PropsWithChildren } from 'react';
import {
    StyleSheet,
    type StyleProp,
    type ViewStyle,
    useWindowDimensions,
} from 'react-native';
import Animated, {
    SequencedTransition,
    SlideInDown,
    type AnimatedStyle,
} from 'react-native-reanimated';
import {
    GestureDetector,
    type GestureType,
    type ComposedGesture,
} from 'react-native-gesture-handler';
import { Handle } from './Handle';

export type SheetProps = {
    gesture: ComposedGesture | GestureType;
    animatedStyle: AnimatedStyle<StyleProp<ViewStyle>>;
    maxHeight?: number;
    backgroundColor?: string;
    handleShown?: boolean;
    handleColor?: string;
    onLayout: (height: number) => void;
};

export const Sheet: React.FC<PropsWithChildren<SheetProps>> = (props) => {
    const { height } = useWindowDimensions();

    return (
        <GestureDetector gesture={props.gesture}>
            <Animated.View
                style={[
                    props.animatedStyle,
                    {
                        ...styles.sheet,
                        backgroundColor:
                            props.backgroundColor ??
                            styles.sheet.backgroundColor,
                        maxHeight: props.maxHeight ?? height * 0.8,
                    },
                ]}
                onLayout={(event) =>
                    props.onLayout(event.nativeEvent.layout.height)
                }
                layout={SequencedTransition}
                entering={SlideInDown.springify().damping(19)}
            >
                {(props.handleShown ?? true) && (
                    <Handle color={props.handleColor} />
                )}
                {props.children}
            </Animated.View>
        </GestureDetector>
    );
};

const styles = StyleSheet.create({
    sheet: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        backgroundColor: '#FFFFFF',
    },
});
