import React, {
    type PropsWithChildren,
    useCallback,
    useState,
    forwardRef,
    useImperativeHandle,
} from 'react';
import { Modal, Platform } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { BottomSheet } from './BottomSheet';

export type SheetHandler = {
    show: () => void;
    hide: () => void;
};

export type SimpleSheetProps = PropsWithChildren<{
    backgroundColor?: string;
    scrimColor?: string;
    handleShown?: boolean;
    handleColor?: string;
}>;

const FAST_VELOCITY_POINT = 1000;

export const SimpleSheet = forwardRef<SheetHandler, SimpleSheetProps>(
    (props, ref) => {
        const [visible, setVisible] = useState<boolean>(false);

        const handleVisible = useCallback((value: boolean): void => {
            setVisible(value);
        }, []);

        const [sheetHeight, setSheetHeight] = useState<number>(0);

        const offsetY = useSharedValue<number>(0);

        const sheetStyle = useAnimatedStyle(
            () => ({
                transform: [{ translateY: offsetY.value }],
            }),
            []
        );

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
            offsetY.value = withTiming(sheetHeight, {}, () => {
                runOnJS(setVisible)(false);
            });
        }, [sheetHeight]);

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

        return (
            <Modal
                visible={visible}
                animationType="fade"
                transparent
                statusBarTranslucent
                onRequestClose={hide}
            >
                <BottomSheet
                    scrimOptions={{
                        onPress: hide,
                        backgroundColor: props.scrimColor,
                    }}
                    sheetOptions={{
                        gesture: panGesture,
                        animatedStyle: sheetStyle,
                        backgroundColor: props.backgroundColor,
                        handleShown: props.handleShown,
                        handleColor: props.handleColor,
                        onLayout: setSheetHeight,
                    }}
                >
                    {props.children}
                </BottomSheet>
            </Modal>
        );
    }
);
