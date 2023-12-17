import React, { type PropsWithChildren } from 'react';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Sheet, type SheetProps } from './Sheet';
import { Scrim, type ScrimProps } from './Scrim';

type BottomSheetProps = {
    sheetOptions: SheetProps;
    scrimOptions: ScrimProps;
};

export const BottomSheet = gestureHandlerRootHOC(
    (props: PropsWithChildren<BottomSheetProps>) => {
        return (
            <>
                <Scrim {...props.scrimOptions} />
                <Sheet {...props.sheetOptions}>{props.children}</Sheet>
            </>
        );
    }
);
