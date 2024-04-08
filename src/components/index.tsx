import React, {
    type PropsWithChildren,
    useCallback,
    useState,
    forwardRef,
    useImperativeHandle,
    useEffect,
} from 'react';
import { Keyboard, Modal, NativeSyntheticEvent, Platform } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { BottomSheet } from './BottomSheet';
import { SheetStyleProps } from './Sheet';
import { ScrimStyleProps } from './Scrim';
import { KeyboardEvent } from 'react-native';

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
         * The `avoidKeyboard` attribute determines whether the bottom sheet will also move up when the keyboard is shown.
         * @default true
         */
        avoidKeyboard?: boolean;

        /**
         * The `keyboardAvoidingDuration` props determines how quickly the bottom sheet will rise when the `avoidKeyboard` attribute is set to true.
         * @default 400
         */
        keyboardAvoidingDuration?: number;

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
const KEYBOARD_AVOIDING_DURATION = 400;

export const SimpleSheet = forwardRef<
    SheetHandler,
    PropsWithChildren<SimpleSheetProps>
>(
    (
        {
            dismissible = true,
            avoidKeyboard = true,
            keyboardAvoidingDuration = KEYBOARD_AVOIDING_DURATION,
            onShow,
            onDismiss,
            ...props
        },
        ref
    ) => {
        const [visible, setVisible] = useState<boolean>(false);
        const [sheetHeight, setSheetHeight] = useState<number>(0);
        const offsetY = useSharedValue<number>(0);
        const keyboardHeight = useSharedValue<number>(0);
        const sheetStyle = useAnimatedStyle(
            () => ({
                transform: [
                    { translateY: offsetY.value + keyboardHeight.value },
                ],
            }),
            []
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
                sheetHeight - keyboardHeight.value,
                {},
                () => {
                    runOnJS(setVisible)(false);
                }
            );
        }, [sheetHeight, keyboardHeight.value]);

        const keyboardWillShow = useCallback(
            (e: KeyboardEvent) => {
                if (avoidKeyboard) {
                    keyboardHeight.value = withTiming(
                        -e.endCoordinates.height,
                        {
                            duration: keyboardAvoidingDuration,
                        }
                    );
                }
            },
            [avoidKeyboard]
        );

        const keyboardWillHide = useCallback(() => {
            if (avoidKeyboard) {
                keyboardHeight.value = withTiming(0);
            }
        }, [avoidKeyboard]);

        const panGesture = Gesture.Pan()
            .onChange((event) => {
                const delta = event.changeY + offsetY.value;
                offsetY.value = delta > 0 ? delta : 0;
            })
            .onEnd((event) => {
                const isFast = event.velocityY >= FAST_VELOCITY_POINT;
                const isOver = offsetY.value > sheetHeight * 0.5;
                const shouldClose = isFast || isOver;

                runOnJS(shouldClose ? hide : restore)();
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

        useEffect(() => {
            const keyboardWillShowListener = Keyboard.addListener(
                'keyboardWillShow',
                keyboardWillShow
            );
            const keyboardWillHideListener = Keyboard.addListener(
                'keyboardWillHide',
                keyboardWillHide
            );

            return () => {
                keyboardWillShowListener.remove();
                keyboardWillHideListener.remove();
            };
        }, []);

        return (
            <Modal
                visible={visible}
                animationType="fade"
                transparent
                statusBarTranslucent
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
