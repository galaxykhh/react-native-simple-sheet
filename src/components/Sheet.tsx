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

export type SheetStyleProps = {
    borderTopLeftRadius?: number;
    borderTopRightRadius?: number;
    sheetColor?: string;
    maxHeight?: number;
};

export type SheetProps = SheetStyleProps & {
    gesture: ComposedGesture | GestureType;
    animatedStyle: AnimatedStyle<StyleProp<ViewStyle>>;
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
                        borderTopLeftRadius:
                            props.borderTopLeftRadius ??
                            styles.sheet.borderTopLeftRadius,
                        borderTopRightRadius:
                            props.borderTopRightRadius ??
                            styles.sheet.borderTopRightRadius,
                        backgroundColor:
                            props.sheetColor ?? styles.sheet.backgroundColor,
                        maxHeight: props.maxHeight ?? height * 0.8,
                    },
                ]}
                onLayout={(event) =>
                    props.onLayout(event.nativeEvent.layout.height)
                }
                layout={SequencedTransition}
                entering={SlideInDown.springify().damping(19)}
            >
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
        overflow: 'hidden',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        backgroundColor: '#FFFFFF',
    },
});
