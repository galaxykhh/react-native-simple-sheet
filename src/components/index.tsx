import React, {
    type PropsWithChildren,
    useCallback,
    useState,
    forwardRef,
    useImperativeHandle,
    useEffect,
} from 'react';
import { Keyboard, Modal, Platform } from 'react-native';
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
        dismissible?: boolean;
        avoidKeyboard?: boolean;
        keyboardAvoidingDuration?: number;
    };

const FAST_VELOCITY_POINT = 1000;
const KEYBOARD_AVOIDING_DURATION = 400;

/**
 * @param sheetColor Color of bottom sheet. default value is `#FFFFFF`.
 * @param scrimColor Color of scrim (backdrop). default value is `#11111188`.
 * @param borderTopLeftRadius -
 * @param borderTopRightRadius -
 * @param maxHeight Max height of sheet. default value is Dimensions.get('window').height * 0.8.
 * @param dismissible Dismiss when scrim tapped.
 * @param avoidKeyboard When the keyboard comes up, the sheet will be raised to fit the height of the keyboard.
 * @param keyboardAvoidingDuration The default speed is 400.
 * */
export const SimpleSheet = forwardRef<
    SheetHandler,
    PropsWithChildren<SimpleSheetProps>
>((props, ref) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [sheetHeight, setSheetHeight] = useState<number>(0);
    const offsetY = useSharedValue<number>(0);
    const keyboardHeight = useSharedValue<number>(0);
    const sheetStyle = useAnimatedStyle(
        () => ({
            transform: [{ translateY: offsetY.value + keyboardHeight.value }],
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
            if (props.avoidKeyboard) {
                keyboardHeight.value = withTiming(-e.endCoordinates.height, {
                    duration:
                        props.keyboardAvoidingDuration ??
                        KEYBOARD_AVOIDING_DURATION,
                });
            }
        },
        [props.avoidKeyboard]
    );

    const keyboardWillHide = useCallback(() => {
        if (props.avoidKeyboard) {
            keyboardHeight.value = withTiming(0);
        }
    }, [props.avoidKeyboard]);

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

    const dismissible = props.dismissible ?? true;

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent
            statusBarTranslucent
            onRequestClose={dismissible ? hide : undefined}
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
});
