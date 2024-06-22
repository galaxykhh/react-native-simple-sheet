import React, {
    type PropsWithChildren,
    useCallback,
    useState,
    useEffect,
} from 'react';
import { Gesture } from 'react-native-gesture-handler';
import {
    interpolateColor,
    runOnJS,
    useAnimatedKeyboard,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { SheetStyleProps } from './Sheet';
import { BottomSheet } from './BottomSheet';

export type SheetHandler = {
    show: () => void;
    hide: () => void;
};

export type SimpleSheetBasicProps = {
    /**
     * The `visible` prop determines whether the bottom sheet is visible. The animation operates based on the visible value.
     *
     */
    visible: boolean;

    /**
     * The `close` prop triggers the animation to close the bottom sheet.
     */
    close: () => void;

    /**
     * The `unmount` prop unmounts the bottom sheet from the root. It is typically called after the close animation finished.
     */
    unmount: () => void;

    /**
     * The `onDismiss` prop is called when the sheet is dismissed via a gesture or a scrim touch.
     */
    onDismiss?: () => void;
};

export type SimpleSheetProps = SimpleSheetBasicProps &
    SheetStyleProps & {
        /**
         * The `dismissible` props determines whether the sheet will be dismissed when touching outside of sheet.
         * @default true
         */
        dismissible?: boolean;

        /**
         * The `gestureEnable` props determines whether the sheet will be animate when swipe gesture.
         * @default true
         */
        gestureEnable?: boolean;

        /**
         * The `avoidKeyboard` props determines whether the bottom sheet will also move up when the keyboard is shown.
         * @default true
         */
        avoidKeyboard?: boolean;

        /**
         * The color of scrim.
         * @default #11111188
         */
        scrimColor?: string;
    };

const DEFAULT_SCRIM_COLOR = '#11111188';
const FAST_VELOCITY_POINT = 1000;

export const SimpleSheet = ({
    visible,
    close,
    unmount,
    onDismiss,
    dismissible = true,
    gestureEnable = true,
    avoidKeyboard = true,
    scrimColor = DEFAULT_SCRIM_COLOR,
    ...props
}: PropsWithChildren<SimpleSheetProps>) => {
    const [sheetHeight, setSheetHeight] = useState<number>(0);
    const offsetY = useSharedValue<number>(0);
    const keyboard = useAnimatedKeyboard();
    const sheetStyle = useAnimatedStyle(
        () => ({
            transform: [
                {
                    translateY: avoidKeyboard
                        ? offsetY.value - keyboard.height.value
                        : offsetY.value,
                },
            ],
        }),
        [avoidKeyboard]
    );
    const scrimStyle = useAnimatedStyle(
        () => ({
            backgroundColor: interpolateColor(
                offsetY.value,
                [0, sheetHeight],
                [scrimColor, '#11111100']
            ),
        }),
        [scrimColor, sheetHeight]
    );

    const restore = useCallback(() => {
        offsetY.value = withSpring(0, { damping: 20 }, () => {});
    }, []);

    const show = () => {
        offsetY.value && restore();
    };

    const hide = useCallback(() => {
        offsetY.value = withTiming(
            sheetHeight + keyboard.height.value,
            {},
            () => {
                onDismiss && runOnJS(onDismiss)();
                runOnJS(unmount)();
            }
        );
    }, [sheetHeight, avoidKeyboard]);

    const panGesture = Gesture.Pan()
        .onChange((event) => {
            if (gestureEnable) {
                const delta = event.changeY + offsetY.value;
                offsetY.value = delta > 0 ? delta : 0;
            }
        })
        .onEnd((event) => {
            if (gestureEnable) {
                const isFast = event.velocityY >= FAST_VELOCITY_POINT;
                const isOver = offsetY.value > sheetHeight * 0.5;
                const shouldClose = isFast || isOver;

                runOnJS(shouldClose ? hide : restore)();
            }
        });

    useEffect(() => {
        visible ? show() : hide();
    }, [visible]);

    return (
        <BottomSheet
            scrimOptions={{
                onPress: dismissible ? close : undefined,
                animatedStyle: scrimStyle,
            }}
            sheetOptions={{
                gesture: panGesture,
                animatedStyle: sheetStyle,
                borderTopLeftRadius: props.borderTopLeftRadius,
                borderTopRightRadius: props.borderTopRightRadius,
                maxHeight: props.maxHeight,
                sheetColor: props.sheetColor,
                onLayout: setSheetHeight,
            }}
        >
            {props.children}
        </BottomSheet>
    );
};
