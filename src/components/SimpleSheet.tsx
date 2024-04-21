import React, {
    type PropsWithChildren,
    useCallback,
    useState,
    forwardRef,
    useImperativeHandle,
} from 'react';
import { Modal, NativeSyntheticEvent, Platform } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import {
    runOnJS,
    useAnimatedKeyboard,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { BottomSheet } from './BottomSheet';
import { SheetStyleProps } from './Sheet';
import { ScrimStyleProps } from './Scrim';

export type SheetHandler = {
    show: () => void;
    hide: () => void;
};

export type SimpleSheetProps = SheetStyleProps &
    ScrimStyleProps & {
        /**
         * The `dismissible` props determines whether the sheet will be dismissed when touching outside of it.
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
         * @default false
         */
        avoidKeyboard?: boolean;

        /**
         * The `onShow` prop allows passing a function that will be called once the modal has been shown.
         */
        onShow?: ((event: NativeSyntheticEvent<any>) => void) | undefined;

        /**
         * The `onDismiss` prop allows passing a function that will be called once the modal has been dismissed.
         */
        onDismiss?: (() => void) | undefined;
    };

const FAST_VELOCITY_POINT = 1000;

export const SimpleSheet = forwardRef<
    SheetHandler,
    PropsWithChildren<SimpleSheetProps>
>(
    (
        {
            dismissible = true,
            gestureEnable = true,
            avoidKeyboard = false,
            onShow,
            onDismiss,
            ...props
        },
        ref
    ) => {
        const [visible, setVisible] = useState<boolean>(false);
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

        const handleVisible = useCallback((value: boolean): void => {
            setVisible(value);
        }, []);

        const restore = useCallback(() => {
            Platform.OS === 'ios'
                ? (offsetY.value = withSpring(0, { damping: 20 }))
                : (offsetY.value = withTiming(0));
        }, []);

        const show = () => {
            handleVisible(true);
            offsetY.value && restore();
        };

        const hide = useCallback(() => {
            offsetY.value = withTiming(
                sheetHeight + keyboard.height.value,
                {},
                () => {
                    runOnJS(setVisible)(false);
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

        useImperativeHandle(
            ref,
            () => {
                return {
                    show,
                    hide,
                };
            },
            [sheetHeight]
        );

        return (
            <Modal
                visible={visible}
                animationType="fade"
                transparent
                statusBarTranslucent={Platform.select({
                    ios: true,
                    android: !avoidKeyboard,
                })}
                onRequestClose={dismissible ? hide : undefined}
                onShow={onShow}
                onDismiss={onDismiss}
            >
                <BottomSheet
                    scrimOptions={{
                        onPress: dismissible ? hide : undefined,
                        scrimColor: props.scrimColor,
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
            </Modal>
        );
    }
);
