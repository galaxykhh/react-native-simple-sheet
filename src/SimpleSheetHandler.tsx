/** @tossdocs-ignore */
import React from 'react';
import {
    forwardRef,
    Ref,
    useCallback,
    useImperativeHandle,
    useState,
} from 'react';

export type SheetCreator = (props: {
    visible: boolean;
    close: (additionalAction?: () => void) => void;
    exit: () => void;
}) => JSX.Element;

type SimpleSheetHandlerProps = {
    sheet: SheetCreator;
    onExit: () => void;
};

export type SimpleSheetHandlerRef = {
    close: (additionalAction?: () => void) => void;
};

export const SimpleSheetHandler = forwardRef(
    (
        { sheet: Sheet, onExit }: SimpleSheetHandlerProps,
        ref: Ref<SimpleSheetHandlerRef>
    ) => {
        const [visible, setVisible] = useState(true);

        const handleClose = useCallback(() => {
            setVisible(false);
        }, []);

        useImperativeHandle(
            ref,
            () => {
                return { close: handleClose };
            },
            []
        );

        return (
            <Sheet
                visible={visible}
                close={(additionalAction) => {
                    handleClose();
                    typeof additionalAction === 'function' &&
                        additionalAction();
                }}
                exit={onExit}
            />
        );
    }
);
